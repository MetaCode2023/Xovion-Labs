// POST /api/ghl/post-call
// Vapi end-of-call-report webhook → log call data to GHL
//
// Vapi sends this after every call ends. This handler:
//   1. Extracts caller info from structuredData or transcript analysis
//   2. Creates/upserts a GHL contact if phone number is available
//   3. Posts a call summary note to the contact record
//
// Vapi webhook payload shape (relevant fields):
//   message.type              "end-of-call-report"
//   message.call.id           Vapi call ID
//   message.customer.number   caller phone number
//   message.customer.name     caller name (if captured)
//   message.analysis.summary  AI-generated call summary
//   message.analysis.structuredData  custom data your Vapi assistant extracted
//   message.artifact.transcript  full call transcript
//   message.durationSeconds   call duration

import { Env, GHL_BASE, ghlHeaders, json, optionsResponse } from './_helpers';

// Shape of Vapi's end-of-call-report webhook
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

async function upsertContact(
  env: Env,
  phone: string,
  name: string,
  email?: string
): Promise<string | null> {
  // Try to find an existing contact by phone first
  const searchUrl = new URL(`${GHL_BASE}/contacts/search/duplicate`);
  searchUrl.searchParams.set('locationId', env.GHL_LOCATION_ID);
  searchUrl.searchParams.set('phone', phone);

  const searchRes = await fetch(searchUrl.toString(), {
    headers: ghlHeaders(env.GHL_API_KEY),
  });

  if (searchRes.ok) {
    const searchData = (await searchRes.json()) as GhlContactResponse;
    const existingId = searchData.contact?.id ?? searchData.contacts?.[0]?.id;
    if (existingId) return existingId;
  }

  // Create new contact
  const nameParts = name.trim().split(/\s+/);
  const firstName = nameParts[0] ?? 'Unknown';
  const lastName = nameParts.slice(1).join(' ');

  const payload: Record<string, unknown> = {
    locationId: env.GHL_LOCATION_ID,
    firstName,
    lastName,
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

async function addNote(env: Env, contactId: string, note: string): Promise<void> {
  await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({ userId: contactId, body: note }),
  });
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
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

  // Only handle end-of-call reports
  if (msg?.type !== 'end-of-call-report') {
    return json({ ok: true, skipped: true, reason: 'Not an end-of-call-report event' });
  }

  const callId = msg.call?.id ?? 'unknown';
  const phone = msg.customer?.number;
  const callerName = msg.customer?.name ?? 'Unknown Caller';
  const durationSec = msg.durationSeconds ?? 0;
  const summary = msg.analysis?.summary ?? '';
  const structuredData = msg.analysis?.structuredData ?? {};
  const transcript = msg.artifact?.transcript ?? '';
  const recordingUrl = msg.artifact?.recordingUrl ?? '';
  const successEval = msg.analysis?.successEvaluation ?? '';

  // Extract contact fields that Vapi may have captured via its own tool/structuredData
  const extractedEmail = (structuredData.email as string | undefined) ?? undefined;
  const extractedName = (structuredData.name as string | undefined) ?? callerName;

  // Build a formatted note
  const noteLines: string[] = [
    `📞 Vapi Call — ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}`,
    `Call ID: ${callId}`,
    `Duration: ${Math.round(durationSec / 60)} min ${durationSec % 60}s`,
    successEval ? `Outcome: ${successEval}` : '',
    '',
    summary ? `Summary:\n${summary}` : '',
    transcript ? `\nTranscript:\n${transcript.slice(0, 2000)}${transcript.length > 2000 ? '…' : ''}` : '',
    recordingUrl ? `\nRecording: ${recordingUrl}` : '',
  ].filter(Boolean);

  const note = noteLines.join('\n');

  if (!phone) {
    // No phone number — log the call but can't associate a contact
    return json({ ok: true, contactId: null, reason: 'No phone number in webhook payload' });
  }

  const contactId = await upsertContact(env, phone, extractedName, extractedEmail).catch(() => null);

  if (!contactId) {
    return json({ ok: false, error: 'Could not create or find GHL contact' }, 502);
  }

  await addNote(env, contactId, note).catch(() => { /* non-fatal */ });

  return json({ ok: true, contactId, callId, durationSeconds: durationSec });
}

export function onRequestOptions(): Response {
  return optionsResponse();
}
