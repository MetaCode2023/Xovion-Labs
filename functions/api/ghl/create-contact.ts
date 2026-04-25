// POST /api/ghl/create-contact
// Vapi tool → create a GHL contact, return contactId
//
// Body:  { firstName, lastName?, email?, phone?, companyName?, source?, tags?, notes? }
// Response: { contactId, contact }

interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

interface GhlContactResponse {
  contact?: { id: string; [key: string]: unknown };
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

interface ParsedRequest {
  body: Record<string, unknown>;
  toolCallId?: string;
}

// Vapi wraps tool arguments inside a webhook envelope and requires the toolCallId
// echoed back in the response. Unwraps both; falls back to raw body for direct tests.
async function extractBody(request: Request): Promise<ParsedRequest> {
  const raw = await request.json() as {
    message?: {
      type?: string;
      toolWithToolCallList?: Array<{
        toolCall?: { id?: string; function?: { arguments?: unknown } };
      }>;
    };
  };

  if (raw?.message?.type === 'tool-calls') {
    const toolCall = raw.message.toolWithToolCallList?.[0]?.toolCall;
    const toolCallId = toolCall?.id;
    const args = toolCall?.function?.arguments;
    const body = (typeof args === 'string' ? JSON.parse(args) : args) as Record<string, unknown> ?? {};
    return { body, toolCallId };
  }

  return { body: raw as Record<string, unknown> };
}

function vapiResponse(toolCallId: string | undefined, result: unknown): Response {
  if (toolCallId) {
    return new Response(JSON.stringify({ results: [{ toolCallId, result }] }), {
      headers: { 'Content-Type': 'application/json', ...cors() },
    });
  }
  return new Response(JSON.stringify(result), {
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
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
  let toolCallId: string | undefined;
  try {
    ({ body, toolCallId } = await extractBody(request) as { body: typeof body; toolCallId?: string });
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

  const ghlRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify(payload),
  });

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    return json({ error: `GHL API error ${ghlRes.status}`, detail }, 502);
  }

  const data = (await ghlRes.json()) as GhlContactResponse;
  const contactId = data.contact?.id;

  if (!contactId) return json({ error: 'Contact created but no ID returned', raw: data }, 502);

  if (notes) {
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: ghlHeaders(env.GHL_API_KEY),
      body: JSON.stringify({ userId: contactId, body: notes }),
    }).catch(() => { /* non-fatal */ });
  }

  return vapiResponse(toolCallId, { contactId, contact: data.contact });
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
