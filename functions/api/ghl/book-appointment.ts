// POST /api/ghl/book-appointment
// Vapi tool → create an appointment on the GHL calendar
//
// Request body:
//   contactId           string  (required) GHL contact ID
//   startTime           string  (required) ISO 8601 datetime  e.g. "2024-01-15T10:00:00"
//   endTime             string  ISO 8601 datetime (optional — defaults to startTime + 30 min)
//   timezone            string  IANA timezone (default: America/New_York)
//   title               string  appointment title
//   appointmentStatus   string  confirmed | new | cancelled (default: confirmed)
//   address             string  meeting location / video link
//
// Response:
//   { appointmentId, appointment }

import { Env, GHL_BASE, CALENDAR_ID, ghlHeaders, json, optionsResponse } from './_helpers';

interface RequestBody {
  contactId?: string;
  startTime?: string;
  endTime?: string;
  timezone?: string;
  title?: string;
  appointmentStatus?: string;
  address?: string;
}

interface GhlAppointmentResponse {
  id?: string;
  [key: string]: unknown;
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

  const {
    contactId,
    startTime,
    timezone = 'America/New_York',
    title = 'Xovion Labs Discovery Call',
    appointmentStatus = 'confirmed',
    address = '',
  } = body;

  if (!contactId) return json({ error: 'contactId is required' }, 400);
  if (!startTime) return json({ error: 'startTime is required' }, 400);

  // Default endTime to startTime + 30 minutes if not provided
  const start = new Date(startTime);
  const end = body.endTime ? new Date(body.endTime) : new Date(start.getTime() + 30 * 60 * 1000);

  if (isNaN(start.getTime())) return json({ error: 'Invalid startTime format' }, 400);

  const payload = {
    calendarId: CALENDAR_ID,
    locationId: env.GHL_LOCATION_ID,
    contactId,
    startTime: start.toISOString(),
    endTime: end.toISOString(),
    title,
    appointmentStatus,
    timezone,
    address,
    ignoreDateRange: false,
  };

  const ghlRes = await fetch(`${GHL_BASE}/calendars/events/appointments`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify(payload),
  });

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    return json({ error: `GHL API error ${ghlRes.status}`, detail }, 502);
  }

  const appointment = (await ghlRes.json()) as GhlAppointmentResponse;
  const appointmentId = appointment.id;

  return json({ appointmentId, appointment });
}

export function onRequestOptions(): Response {
  return optionsResponse();
}
