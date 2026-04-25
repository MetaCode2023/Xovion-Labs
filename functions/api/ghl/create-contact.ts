// POST /api/ghl/create-contact
// Vapi API Request tool → upsert a GHL contact, return contactId
//
// Body:  { firstName, lastName?, email?, phone?, companyName?, source?, tags?, notes? }
// Response: { result: "Contact created/updated. Contact ID: {id}" }
//
// Upsert logic: Vapi fires two CreateContact calls per session (name first,
// phone second). We use message.call.id stored in the GHL custom field
// `vapi_call_id` to detect duplicates — update if found, create if not.

interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

interface GhlContactResponse {
  contact?: { id: string; [key: string]: unknown };
}

interface GhlSearchResponse {
  contacts?: { id: string; [key: string]: unknown }[];
  total?: number;
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

// Handles both Vapi tool types:
// - Server URL custom tools: wraps in { results: [{ toolCallId, result }] }
// - API Request tools: returns { result }
function vapiResult(message: string, toolCallId?: string): Response {
  const body = toolCallId
    ? { results: [{ toolCallId, result: message }] }
    : { result: message };
  return new Response(JSON.stringify(body), {
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
}

interface ParsedRequest {
  body: Record<string, unknown>;
  toolCallId?: string;
  callId?: string;
}

// Handles both Vapi envelope formats. Extracts toolCallId for server-URL tools
// and call.id (stored as vapi_call_id in GHL) for upsert deduplication.
async function extractBody(request: Request): Promise<ParsedRequest> {
  const raw = await request.json() as {
    message?: {
      type?: string;
      call?: { id?: string };
      toolWithToolCallList?: Array<{
        toolCall?: { id?: string; function?: { arguments?: unknown } };
      }>;
    };
  };

  if (raw?.message?.type === 'tool-calls') {
    const toolCall = raw.message.toolWithToolCallList?.[0]?.toolCall;
    const toolCallId = toolCall?.id;
    const callId = raw.message.call?.id;
    const args = toolCall?.function?.arguments;
    const body = (typeof args === 'string' ? JSON.parse(args) : args) as Record<string, unknown> ?? {};
    return { body, toolCallId, callId };
  }

  // API Request tool: arguments are in the top-level body
  return { body: raw as Record<string, unknown> };
}

// Search GHL contacts by the stored vapi_call_id custom field value.
async function findContactByCallId(env: Env, callId: string): Promise<string | null> {
  const res = await fetch(`${GHL_BASE}/contacts/search`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({
      locationId: env.GHL_LOCATION_ID,
      filters: [
        { field: 'customField.vapi_call_id', operator: 'EQ', value: callId },
      ],
      page: 1,
      limit: 1,
    }),
  });

  if (!res.ok) return null;
  const data = (await res.json()) as GhlSearchResponse;
  return data.contacts?.[0]?.id ?? null;
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);
  if (!env.GHL_LOCATION_ID) return json({ error: 'GHL_LOCATION_ID not configured' }, 500);

  let body: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    companyName?: string;
    source?: string;
    tags?: string[];
    notes?: string;
  } = {};
  let callId: string | undefined;
  let toolCallId: string | undefined;
  try {
    ({ body, callId, toolCallId } = await extractBody(request) as { body: typeof body; callId?: string; toolCallId?: string });
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { firstName, lastName, email, phone, companyName, source = 'vapi-call', tags = [], notes } = body;
  if (!firstName) return json({ error: 'firstName is required' }, 400);

  const payload: Record<string, unknown> = {
    locationId: env.GHL_LOCATION_ID,
    firstName,
    lastName: lastName ?? '',
    source,
    tags: ['vapi-lead', ...tags],
  };
  if (email) payload.email = email;
  if (phone) payload.phone = phone;
  if (companyName) payload.companyName = companyName;

  // Upsert: if we have a call.id, check whether a contact already exists for
  // this Vapi session before creating a new one.
  let existingContactId: string | null = null;
  if (callId) {
    existingContactId = await findContactByCallId(env, callId).catch(() => null);
  }

  let ghlRes: Response;
  let upserted: 'created' | 'updated';

  if (existingContactId) {
    const updatePayload: Record<string, unknown> = { firstName, lastName: lastName ?? '' };
    if (email) updatePayload.email = email;
    if (phone) updatePayload.phone = phone;
    if (companyName) updatePayload.companyName = companyName;

    ghlRes = await fetch(`${GHL_BASE}/contacts/${existingContactId}`, {
      method: 'PUT',
      headers: ghlHeaders(env.GHL_API_KEY),
      body: JSON.stringify(updatePayload),
    });
    upserted = 'updated';
  } else {
    if (callId) {
      payload.customFields = [{ key: 'vapi_call_id', field_value: callId }];
    }

    ghlRes = await fetch(`${GHL_BASE}/contacts/`, {
      method: 'POST',
      headers: ghlHeaders(env.GHL_API_KEY),
      body: JSON.stringify(payload),
    });
    upserted = 'created';
  }

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    return json({ error: `GHL API error ${ghlRes.status}`, detail }, 502);
  }

  const data = (await ghlRes.json()) as GhlContactResponse;
  const contactId = data.contact?.id ?? existingContactId;

  if (!contactId) return json({ error: 'Contact upserted but no ID returned', raw: data }, 502);

  if (notes) {
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: ghlHeaders(env.GHL_API_KEY),
      body: JSON.stringify({ userId: contactId, body: notes }),
    }).catch(() => { /* non-fatal */ });
  }

  const verb = upserted === 'created' ? 'created' : 'updated';
  return vapiResult(`Contact ${verb}. Contact ID: ${contactId}`, toolCallId);
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
