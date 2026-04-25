// POST /api/ghl/book-appointment
// Vapi tool → create a confirmed appointment on the GHL calendar
//
// Body:  { contactId, startTime, endTime?, timezone?, title?, appointmentStatus?, address? }
//   startTime: ISO 8601  e.g. "2024-01-15T10:00:00"
//   endTime: defaults to startTime + 30 min
// Response: { appointmentId, appointment }

interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

interface GhlAppointmentResponse {
  id?: string;
  [key: string]: unknown;
}

const GHL_BASE = 'https://services.leadconnectorhq.com';
const CALENDAR_ID = 'KFQrCuKbluXkcVKEgOXH';

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

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);
  if (!env.GHL_LOCATION_ID) return json({ error: 'GHL_LOCATION_ID not configured' }, 500);

  let body: {
    contactId?: string;
    startTime?: string;
    endTime?: string;
    timezone?: string;
    title?: string;
    appointmentStatus?: string;
    address?: string;
  } = {};
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

  const start = new Date(startTime);
  if (isNaN(start.getTime())) return json({ error: 'Invalid startTime format' }, 400);

  const end = body.endTime ? new Date(body.endTime) : new Date(start.getTime() + 30 * 60 * 1000);

  const ghlRes = await fetch(`${GHL_BASE}/calendars/events/appointments`, {
    method: 'POST',
    headers: ghlHeaders(env.GHL_API_KEY),
    body: JSON.stringify({
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
    }),
  });

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    return json({ error: `GHL API error ${ghlRes.status}`, detail }, 502);
  }

  const appointment = (await ghlRes.json()) as GhlAppointmentResponse;
  return json({ appointmentId: appointment.id, appointment });
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
