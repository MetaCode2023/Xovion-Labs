// POST /api/ghl/check-calendar
// Vapi API Request tool → fetch free slots from GHL calendar
//
// Body:  { startDate?, endDate?, timezone? }
//   startDate / endDate: ISO string or epoch ms (defaults to today + 7 days)
//   timezone: IANA string (default: America/Chicago)
//
// Response: { result: "Available slots: Mon Apr 27 at 10:00 AM, ..." }

interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
  GHL_CALENDAR_ID: string;
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

function toEpochMs(value: string | number): number {
  if (typeof value === 'number') return value;
  const n = Number(value);
  return Number.isFinite(n) ? n : new Date(value).getTime();
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  if (!env.GHL_API_KEY) return json({ error: 'GHL_API_KEY not configured' }, 500);
  if (!env.GHL_CALENDAR_ID) return json({ error: 'GHL_CALENDAR_ID not configured' }, 500);

  let body: { startDate?: string | number; endDate?: string | number; timezone?: string } = {};
  let toolCallId: string | undefined;
  
  try {
    const raw = await request.json() as {
      message?: {
        type?: string;
        toolCallList?: Array<{ id?: string; function?: { arguments?: unknown } }>;
        toolWithToolCallList?: Array<{
          toolCall?: { id?: string; function?: { arguments?: unknown } };
        }>;
      };
    } & typeof body;

    if (raw?.message?.type === 'tool-calls') {
      // Safely check both Vapi payload structures
      const toolCall = raw.message.toolCallList?.[0] || raw.message.toolWithToolCallList?.[0]?.toolCall;
      toolCallId = toolCall?.id;
      const args = toolCall?.function?.arguments;
      body = (typeof args === 'string' ? JSON.parse(args) : args) as typeof body ?? {};
    } else {
      body = raw as typeof body;
    }
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

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

  const url = new URL(`${GHL_BASE}/calendars/${env.GHL_CALENDAR_ID}/free-slots`);
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

  const labels: string[] = [];
  outer: for (const [, value] of Object.entries(data)) {
    if (!value?.slots) continue;
    for (const startTime of value.slots) {
      labels.push(
        new Date(startTime).toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          timeZone: timezone,
        })
      );
      if (labels.length >= 6) break outer;
    }
  }

  if (labels.length === 0) {
    return vapiResult('No available slots found in the next 7 days.', toolCallId);
  }

  return vapiResult(`Available slots: ${labels.join(', ')}`, toolCallId);
}

export function onRequestOptions(): Response {
  return new Response(null, { headers: cors() });
}
