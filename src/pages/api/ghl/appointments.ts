export const prerender = false;

import type { APIContext } from 'astro';

const GHL_BASE = 'https://services.leadconnectorhq.com';

export async function GET({ request, locals }: APIContext) {
  const env = (locals as any).runtime?.env ?? (import.meta as any).env ?? process.env;

  const apiKey = env.GHL_API_KEY;
  const locationId = env.GHL_LOCATION_ID;
  const proxySecret = env.GHL_PROXY_SECRET;

  const authHeader = request.headers.get('x-proxy-secret');
  if (!proxySecret || authHeader !== proxySecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const url = new URL(request.url);
  const now = Date.now();
  const startTime = url.searchParams.get('startTime') ?? String(now);
  const endTime = url.searchParams.get('endTime') ?? String(now + 7 * 24 * 60 * 60 * 1000);

  const params = new URLSearchParams({ locationId, startTime, endTime });

  const res = await fetch(`${GHL_BASE}/calendars/events?${params}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Version: '2021-07-28',
    },
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
