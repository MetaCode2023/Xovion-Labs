// POST /api/ghl/check-calendar
// Vapi tool → fetch free slots from GHL calendar
//
// Body:  { startDate?, endDate?, timezone? }
//   startDate / endDate: ISO string or epoch ms (defaults to today + 7 days)
//   timezone: IANA string (default: America/Chicago)
//
// Response: { result: JSON.stringify({ slots: [{ date, time, startTime }] }) }

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

  let body: { startDate?: string | number; endDate?: string | number; timezone?: string } = {};
  let toolCallId: string | undefined;
  try {
    ({ body, toolCallId } = await extractBody(request) as { body: typeof body; toolCallId?: string });
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  // Auto-compute a 7-day window if Vapi doesn't send dates
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

  // GHL returns top-level date keys: { "2026-04-27": { slots: ["2026-04-27T10:00:00..."] } }
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

  // Cap at 6 slots so Vapi's AI doesn't get overwhelmed reading options
  return vapiResponse(toolCallId, { slots: slots.slice(0, 6) });
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
