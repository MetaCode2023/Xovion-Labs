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
  const limit = url.searchParams.get('limit') ?? '20';
  const query = url.searchParams.get('query') ?? '';

  const params = new URLSearchParams({ locationId, limit });
  if (query) params.set('query', query);

  const res = await fetch(`${GHL_BASE}/contacts/?${params}`, {
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
