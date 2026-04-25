// Shared utilities for GHL middleware endpoints — not a CF route (underscore prefix)

export interface Env {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

export const GHL_BASE = 'https://services.leadconnectorhq.com';
export const CALENDAR_ID = 'KFQrCuKbluXkcVKEgOXH';

export function ghlHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  };
}

export function corsHeaders(): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

export function optionsResponse(): Response {
  return new Response(null, { headers: corsHeaders() });
}

export function toEpochMs(value: string | number): number {
  if (typeof value === 'number') return value;
  const n = Number(value);
  return Number.isFinite(n) ? n : new Date(value).getTime();
}
