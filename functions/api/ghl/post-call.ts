// POST /api/ghl/post-call
// Vapi end-of-call-report webhook → log call data to GHL contact
//
// Returns 200 immediately so Vapi doesn't time out; GHL work runs via waitUntil.
// Handler:
//   1. Parses caller phone/name from message.customer
//   2. Upserts a GHL contact (create if not found by phone)
//   3. Posts a formatted call summary note to the contact

interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

interface VapiPayload {
  message?: {
    type?: string;
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

interface GhlContactResponse {
  contact?: { id: string };
  contacts?: { id: string }[];
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

async function upsertContact(env: Env, phone: string, name: string, email?: string): Promise<string | null> {
  const searchUrl = new URL(`${GHL_BASE}/contacts/search/duplicate`);
  searchUrl.searchParams.set('locationId', env.GHL_LOCATION_ID);
  searchUrl.searchParams.set('phone', phone);

  const searchRes = await fetch(searchUrl.toString(), { headers: ghlHeaders(env.GHL_API_KEY) });
  if (searchRes.ok) {
    const searchData = (await searchRes.json()) as GhlContactResponse;
    const existingId = searchData.contact?.id ?? searchData.contacts?.[0]?.id;
    if (existingId) return existingId;
  }

  const nameParts = name.trim().split(/\s+/);
  const payload: Record<string, unknown> = {
    locationId: env.GHL_LOCATION_ID,
    firstName: nameParts[0] ?? 'Unknown',
    lastName: nameParts.slice(1).join(' '),
    phone,
    source: 'vapi-call',
    tags: ['vapi-lead'],
  };
  if (email) payload.email = email;

  const createRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify(payload),
  });

  if (!createRes.ok) return null;
  const createData = (await createRes.json()) as GhlContactResponse;
  return createData.contact?.id ?? null;
}

async function processCallData(env: Env, payload: VapiPayload): Promise<void> {
  const msg = payload.message;
  if (!msg) return;

  const callId = msg.call?.id ?? 'unknown';
  const phone = msg.customer?.number;
  const callerName = msg.customer?.name ?? 'Unknown Caller';
  const durationSec = msg.durationSeconds ?? 0;
  const summary = msg.analysis?.summary ?? '';
  const structuredData = msg.analysis?.structuredData ?? {};
  const transcript = msg.artifact?.transcript ?? '';
  const recordingUrl = msg.artifact?.recordingUrl ?? '';
  const successEval = msg.analysis?.successEvaluation ?? '';

  const extractedEmail = (structuredData.email as string | undefined) ?? undefined;
  const extractedName = (structuredData.name as string | undefined) ?? callerName;

  const noteLines = [
    `📞 Vapi Call — ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`,
    `Call ID: ${callId}`,
    `Duration: ${Math.floor(durationSec / 60)}m ${durationSec % 60}s`,
    successEval ? `Outcome: ${successEval}` : '',
    summary ? `\nSummary:\n${summary}` : '',
    transcript ? `\nTranscript:\n${transcript.slice(0, 2000)}${transcript.length > 2000 ? '…' : ''}` : '',
    recordingUrl ? `\nRecording: ${recordingUrl}` : '',
  ].filter(Boolean).join('\n');

  if (!phone) return;

  const contactId = await upsertContact(env, phone, extractedName, extractedEmail).catch(() => null);
  if (!contactId) return;

  await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({ userId: contactId, body: noteLines }),
  }).catch(() => { /* non-fatal */ });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
  waitUntil: (promise: Promise<unknown>) => void;
}): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);
  if (!env.GHL_LOCATION_ID) return json({ error: 'GHL_LOCATION_ID not configured' }, 500);

  let payload: VapiPayload = {};
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const msg = payload.message;
  if (msg?.type !== 'end-of-call-report') {
    return json({ result: 'Call data logged successfully' });
  }

  // Respond immediately so Vapi doesn't time out; process GHL writes in background
  context.waitUntil(processCallData(env, payload));

  return json({ result: 'Call data logged successfully' });
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
