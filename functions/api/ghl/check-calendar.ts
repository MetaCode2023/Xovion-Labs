// POST /api/ghl/check-calendar
// Vapi tool → fetch free slots from GHL calendar
//
// Body:  { startDate, endDate, timezone? }
//   startDate / endDate: ISO string or epoch ms
//   timezone: IANA string (default: America/New_York)
//
// Response: { slots: [{ date, time, startTime }] }

interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

interface GhlFreeSlotsResponse {
  _dates_?: Record<string, { slots: string[] }>;
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

function toEpochMs(value: string | number): number {
  if (typeof value === 'number') return value;
  const n = Number(value);
  return Number.isFinite(n) ? n : new Date(value).getTime();
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);

  let body: { startDate?: string | number; endDate?: string | number; timezone?: string } = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { startDate, endDate, timezone = 'America/New_York' } = body;
  if (!startDate || !endDate) return json({ error: 'startDate and endDate are required' }, 400);

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

  const raw = await ghlRes.text();
  
  // DEBUG: return raw GHL response so we can see the actual structure
  return new Response(raw, {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...cors() },
  });
