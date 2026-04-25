// POST /api/ghl/post-call
// Vapi end-of-call-report webhook → enrich GHL contact with full call data
//
// Per call:
//   1. Look up (or create) GHL contact by caller phone number
//   2. Add a note with transcript, summary, duration, and outcome
//   3. Update custom fields: ai_call_transcript, ai_call_summary, call_outcome
//   4. Tag contact: missed-call (< 30s) or call-booked (booked/appointment in summary)
//   5. Create a callback task if summary mentions callback/reach out

interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
  GHL_ASSIGNED_USER_ID: string; // Austin's GHL user ID for task assignment
}

interface VapiPayload {
  message?: {
    type?: string;
    endedReason?: string;
    call?: { id?: string };
    customer?: { number?: string; name?: string };
    durationSeconds?: number;
    analysis?: {
      summary?: string;
      structuredData?: Record<string, unknown>;
      successEvaluation?: string;
    };
    artifact?: {
      transcript?: string;
      recordingUrl?: string;
    };
  };
}

interface GhlContact {
  id: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

interface GhlContactResponse {
  contact?: GhlContact;
  contacts?: GhlContact[];
}

const GHL_BASE = 'https://services.leadconnectorhq.com';

function ghlHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  };
}

function cors(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

// Returns ISO timestamp for the next business day at 9 AM CT (15:00 UTC)
function nextBusinessDay(): string {
  const now = new Date();
  const day = now.getUTCDay(); // 0=Sun, 1=Mon … 6=Sat
  let daysToAdd = 1;
  if (day === 5) daysToAdd = 3; // Friday → Monday
  if (day === 6) daysToAdd = 2; // Saturday → Monday
  const next = new Date(now);
  next.setUTCDate(now.getUTCDate() + daysToAdd);
  next.setUTCHours(15, 0, 0, 0); // 9 AM CT
  return next.toISOString();
}

// Find an existing GHL contact by phone number, or create one.
// Returns { id, name } of the contact.
async function upsertContact(
  env: Env,
  phone: string,
  callerName: string,
): Promise<{ id: string; name: string } | null> {
  const searchUrl = new URL(`${GHL_BASE}/contacts/search/duplicate`);
  searchUrl.searchParams.set('locationId', env.GHL_LOCATION_ID);
  searchUrl.searchParams.set('phone', phone);

  const searchRes = await fetch(searchUrl.toString(), { headers: ghlHeaders(env.GHL_API_KEY) });
  if (searchRes.ok) {
    const data = (await searchRes.json()) as GhlContactResponse;
    const found = data.contact ?? data.contacts?.[0];
    if (found?.id) {
      const name = [found.firstName, found.lastName].filter(Boolean).join(' ') || callerName;
      return { id: found.id, name };
    }
  }

  // No existing contact — create one
  const parts = callerName.trim().split(/\s+/);
  const createRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({
      locationId: env.GHL_LOCATION_ID,
      firstName: parts[0] ?? 'Unknown',
      lastName: parts.slice(1).join(' '),
      phone,
      source: 'vapi-call',
      tags: ['vapi-lead'],
    }),
  });

  if (!createRes.ok) return null;
  const createData = (await createRes.json()) as GhlContactResponse;
  const id = createData.contact?.id;
  if (!id) return null;
  const name =
    [createData.contact?.firstName, createData.contact?.lastName].filter(Boolean).join(' ') ||
    callerName;
  return { id, name };
}

// POST a note to the contact
async function addNote(env: Env, contactId: string, body: string): Promise<void> {
  await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({ userId: contactId, body }),
  }).catch(() => undefined);
}

// PUT custom fields onto the contact
async function updateCustomFields(
  env: Env,
  contactId: string,
  fields: Array<{ key: string; field_value: string }>,
): Promise<void> {
  await fetch(`${GHL_BASE}/contacts/${contactId}`, {
    method: 'PUT',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({ customFields: fields }),
  }).catch(() => undefined);
}

// POST tags to the contact (GHL v2 tags endpoint is additive)
async function addTags(env: Env, contactId: string, tags: string[]): Promise<void> {
  if (tags.length === 0) return;
  await fetch(`${GHL_BASE}/contacts/${contactId}/tags`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({ tags }),
  }).catch(() => undefined);
}

// POST a callback task assigned to Austin
async function createCallbackTask(
  env: Env,
  contactId: string,
  contactName: string,
  summary: string,
): Promise<void> {
  await fetch(`${GHL_BASE}/contacts/${contactId}/tasks`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({
      title: `Call back ${contactName}`,
      body: summary,
      dueDate: nextBusinessDay(),
      assignedTo: env.GHL_ASSIGNED_USER_ID || undefined,
      completed: false,
    }),
  }).catch(() => undefined);
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);
  if (!env.GHL_LOCATION_ID) return json({ error: 'GHL_LOCATION_ID not configured' }, 500);

  let payload: VapiPayload = {};
  try {
    payload = (await request.json()) as VapiPayload;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const msg = payload.message;
  if (msg?.type !== 'end-of-call-report') {
    return json({ ok: true, skipped: true, reason: 'Not an end-of-call-report event' });
  }

  // ── Extract call data ───────────────────────────────────────────────
  const phone = msg.customer?.number;
  const callerName = msg.customer?.name ?? 'Unknown Caller';
  const durationSec = msg.durationSeconds ?? 0;
  const summary = msg.analysis?.summary ?? '';
  const transcript = msg.artifact?.transcript ?? '';
  const recordingUrl = msg.artifact?.recordingUrl ?? '';
  const endedReason = msg.endedReason ?? 'unknown';
  const successEval = msg.analysis?.successEvaluation ?? '';
  const callId = msg.call?.id ?? 'unknown';

  if (!phone) {
    return json({ ok: true, contactId: null, reason: 'No phone number in webhook payload' });
  }

  // ── 1. Look up / create contact ─────────────────────────────────────
  const contact = await upsertContact(env, phone, callerName).catch(() => null);
  if (!contact) {
    return json({ ok: false, error: 'Could not find or create GHL contact' }, 502);
  }
  const { id: contactId, name: contactName } = contact;

  // ── 2. Add note ─────────────────────────────────────────────────────
  const durationFmt = `${Math.floor(durationSec / 60)}m ${durationSec % 60}s`;
  const noteBody = [
    `📞 Vapi Call — ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}`,
    `Call ID: ${callId}`,
    `Duration: ${durationFmt}`,
    `Outcome: ${endedReason}`,
    successEval ? `Evaluation: ${successEval}` : '',
    summary ? `\n─── Summary ───\n${summary}` : '',
    transcript ? `\n─── Transcript ───\n${transcript}` : '',
    recordingUrl ? `\nRecording: ${recordingUrl}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  await addNote(env, contactId, noteBody);

  // ── 3. Update custom fields ─────────────────────────────────────────
  await updateCustomFields(env, contactId, [
    { key: 'ai_call_transcript', field_value: transcript },
    { key: 'ai_call_summary',    field_value: summary },
    { key: 'call_outcome',       field_value: endedReason },
  ]);

  // ── 4 & 5. Tag based on call outcome ───────────────────────────────
  const tagsToAdd: string[] = [];

  if (durationSec < 30) {
    tagsToAdd.push('missed-call');
  }

  const summaryLower = summary.toLowerCase();
  if (/booked|appointment/.test(summaryLower)) {
    tagsToAdd.push('call-booked');
  }

  if (tagsToAdd.length > 0) {
    await addTags(env, contactId, tagsToAdd);
  }

  // ── 6. Create callback task if follow-up needed ─────────────────────
  const needsCallback = /callback|call back|reach out/.test(summaryLower);
  if (needsCallback) {
    await createCallbackTask(env, contactId, contactName, summary);
  }

  return json({
    ok: true,
    contactId,
    callId,
    durationSeconds: durationSec,
    tagsAdded: tagsToAdd,
    taskCreated: needsCallback,
  });
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
