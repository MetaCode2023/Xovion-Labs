interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
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

// Vapi sends tool arguments nested inside a webhook envelope.
// This unwraps them so the rest of the handler stays the same for both
// direct POST tests and live Vapi tool-call requests.
async function extractBody(request: Request): Promise<Record<string, unknown>> {
  const raw = await request.json() as {
    message?: {
      type?: string;
      toolWithToolCallList?: Array<{
        toolCall?: { function?: { arguments?: unknown } };
      }>;
    };
  };

  if (raw?.message?.type === 'tool-calls') {
    const args = raw.message.toolWithToolCallList?.[0]?.toolCall?.function?.arguments;
    return (typeof args === 'string' ? JSON.parse(args) : args) as Record<string, unknown> ?? {};
  }

  return raw as Record<string, unknown>;
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;
  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);

  let body: { startDate?: string | number; endDate?: string | number; timezone?: string } = {};
  try {
    body = await extractBody(request) as typeof body;
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  // Auto-compute dates if not provided
  const timezone = body.timezone ?? 'America/Chicago';
  let startDate = body.startDate;
  let endDate = body.endDate;

  if (!startDate || !endDate) {
    const now = new Date();
    const later = new Date();
    later.setDate(now.getDate() + 7);
    startDate = now.toISOString().split('T')[0];
    endDate = later.toISOString().split('T')[0];
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

  // GHL returns top-level date keys: { "2026-04-27": { slots: [...] } }
  const data = await ghlRes.json() as Record<string, { slots: string[] }>;

  const slots: { date: string; time: string; startTime: string }[] = [];
  for (const [date, value] of Object.entries(data)) {
    if (!value?.slots) continue;
    for (const startTime of value.slots) {
      const time = new Date(startTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: timezone,
      });
      slots.push({ date, time, startTime });
    }
  }

  // Return max 6 slots so Vapi doesn't get overwhelmed
  return json({ slots: slots.slice(0, 6) });
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
