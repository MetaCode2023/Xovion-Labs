// POST /api/ghl/check-calendar
// Vapi tool → fetch free slots from GHL calendar
//
// Request body:
//   startDate  string | number  ISO date string or epoch ms
//   endDate    string | number  ISO date string or epoch ms
//   timezone   string           IANA timezone (default: America/New_York)
//
// Response:
//   { slots: [{ date, time, startTime }] }

import { Env, GHL_BASE, CALENDAR_ID, ghlHeaders, json, optionsResponse, toEpochMs } from './_helpers';

interface GhlFreeSlotsResponse {
  _dates_?: Record<string, { slots: string[] }>;
}

interface RequestBody {
  startDate?: string | number;
  endDate?: string | number;
  timezone?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);

  let body: RequestBody = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { startDate, endDate, timezone = 'America/New_York' } = body;

  if (!startDate || !endDate) {
    return json({ error: 'startDate and endDate are required' }, 400);
  }

  const url = new URL(`${GHL_BASE}/calendars/${CALENDAR_ID}/free-slots`);
  url.searchParams.set('startDate', String(toEpochMs(startDate)));
  url.searchParams.set('endDate', String(toEpochMs(endDate)));
  url.searchParams.set('timezone', timezone);

  const ghlRes = await fetch(url.toString(), {
    method: 'GET',
    headers: ghlHeaders(env.GHL_API_KEY),
  });

  if (!ghlRes.ok) {
    const detail = await ghlRes.text();
    return json({ error: `GHL API error ${ghlRes.status}`, detail }, 502);
  }

  const data = (await ghlRes.json()) as GhlFreeSlotsResponse;

  // Flatten the _dates_ map into a simple slots array for Vapi consumption
  const slots: { date: string; time: string; startTime: string }[] = [];
  if (data._dates_) {
    for (const [date, { slots: times }] of Object.entries(data._dates_)) {
      for (const time of times) {
        slots.push({ date, time, startTime: `${date}T${time}` });
      }
    }
  }

  return json({ slots });
}

export function onRequestOptions(): Response {
  return optionsResponse();
}
