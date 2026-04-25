// POST /api/ghl/create-contact
// Vapi tool → create a contact in GHL, return the contact ID
//
// Request body:
//   firstName    string  (required)
//   lastName     string
//   email        string
//   phone        string  E.164 format recommended
//   companyName  string
//   source       string  defaults to 'vapi-call'
//   tags         string[]
//   notes        string  stored as a contact note
//
// Response:
//   { contactId, contact }

import { Env, GHL_BASE, ghlHeaders, json, optionsResponse } from './_helpers';

interface RequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  source?: string;
  tags?: string[];
  notes?: string;
}

interface GhlContactResponse {
  contact?: { id: string; [key: string]: unknown };
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);
  if (!env.GHL_LOCATION_ID) return json({ error: 'GHL_LOCATION_ID not configured' }, 500);

  let body: RequestBody = {};
  try {
    body = await request.json();
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

  if (!contactId) {
    return json({ error: 'Contact created but no ID returned', raw: data }, 502);
  }

  // Attach call notes as a contact note if provided
  if (notes) {
    await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: ghlHeaders(env.GHL_API_KEY),
      body: JSON.stringify({ userId: contactId, body: notes }),
    }).catch(() => { /* non-fatal */ });
  }

  return json({ contactId, contact: data.contact });
}

export function onRequestOptions(): Response {
  return optionsResponse();
}
