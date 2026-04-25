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
  const pipelineId = url.searchParams.get('pipelineId') ?? '';
  const stageId = url.searchParams.get('stageId') ?? '';

  const params = new URLSearchParams({ locationId, limit });
  if (pipelineId) params.set('pipelineId', pipelineId);
  if (stageId) params.set('stageId', stageId);

  const [oppsRes, pipelinesRes] = await Promise.all([
    fetch(`${GHL_BASE}/opportunities/search?${params}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: '2021-07-28',
      },
    }),
    fetch(`${GHL_BASE}/opportunities/pipelines?locationId=${locationId}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Version: '2021-07-28',
      },
    }),
  ]);

  const [opps, pipelines] = await Promise.all([oppsRes.json(), pipelinesRes.json()]);

  return new Response(JSON.stringify({ opportunities: opps, pipelines }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
