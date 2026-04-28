import { describe, it, expect, vi, beforeEach } from 'vitest';
import { onRequestPost, onRequestOptions } from './create-contact';

const ENV = {
  GHL_API_KEY: 'test-key',
  GHL_LOCATION_ID: 'test-location',
};

function makeRequest(body: unknown, method = 'POST'): Request {
  return new Request('https://example.com/api/ghl/create-contact', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

function makeContext(body: unknown, env = ENV) {
  return { request: makeRequest(body), env };
}

beforeEach(() => {
  vi.restoreAllMocks();
});

describe('onRequestOptions', () => {
  it('returns CORS headers', () => {
    const res = onRequestOptions();
    expect(res.status).toBe(200);
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*');
  });
});

describe('onRequestPost — env validation', () => {
  it('returns 500 when GHL_API_KEY is missing', async () => {
    const res = await onRequestPost({
      request: makeRequest({ firstName: 'Test' }),
      env: { GHL_API_KEY: '', GHL_LOCATION_ID: 'loc' },
    });
    const data = await res.json() as { error: string };
    expect(res.status).toBe(500);
    expect(data.error).toMatch(/GHL_API_KEY/);
  });

  it('returns 500 when GHL_LOCATION_ID is missing', async () => {
    const res = await onRequestPost({
      request: makeRequest({ firstName: 'Test' }),
      env: { GHL_API_KEY: 'key', GHL_LOCATION_ID: '' },
    });
    const data = await res.json() as { error: string };
    expect(res.status).toBe(500);
    expect(data.error).toMatch(/GHL_LOCATION_ID/);
  });
});

describe('onRequestPost — input validation', () => {
  it('returns 400 when firstName is missing', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('{}', { status: 200 }));
    const res = await onRequestPost(makeContext({ lastName: 'Doe' }));
    const data = await res.json() as { error: string };
    expect(res.status).toBe(400);
    expect(data.error).toMatch(/firstName/);
  });

  it('returns 400 on invalid JSON body', async () => {
    const request = new Request('https://example.com/api/ghl/create-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not-json',
    });
    const res = await onRequestPost({ request, env: ENV });
    const data = await res.json() as { error: string };
    expect(res.status).toBe(400);
    expect(data.error).toMatch(/Invalid JSON/);
  });
});

describe('onRequestPost — contact creation', () => {
  it('creates a contact and returns the contact ID', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ contact: { id: 'abc123' } }), { status: 200 })
    );

    const res = await onRequestPost(makeContext({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      phone: '+15551234567',
    }));

    const data = await res.json() as { result: string };
    expect(res.status).toBe(200);
    expect(data.result).toContain('abc123');
    expect(data.result).toContain('created');
  });

  it('includes vapi-lead tag in the request payload', async () => {
    let capturedBody: Record<string, unknown> = {};
    vi.spyOn(global, 'fetch').mockImplementation(async (_url, opts) => {
      capturedBody = JSON.parse((opts?.body as string) ?? '{}');
      return new Response(JSON.stringify({ contact: { id: 'xyz' } }), { status: 200 });
    });

    await onRequestPost(makeContext({ firstName: 'Sam' }));

    expect((capturedBody.tags as string[])).toContain('vapi-lead');
  });

  it('handles GHL API error and returns 502', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response('Bad Gateway', { status: 502 })
    );

    const res = await onRequestPost(makeContext({ firstName: 'Jane' }));
    const data = await res.json() as { error: string };
    expect(res.status).toBe(502);
    expect(data.error).toMatch(/GHL API error/);
  });
});

describe('onRequestPost — Vapi tool-calls envelope', () => {
  it('extracts arguments from Vapi tool-calls envelope and wraps result', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('/search')) {
        // No existing contact for this callId
        return new Response(JSON.stringify({ contacts: [] }), { status: 200 });
      }
      return new Response(JSON.stringify({ contact: { id: 'vapi-id-1' } }), { status: 200 });
    });

    const vapiBody = {
      message: {
        type: 'tool-calls',
        call: { id: 'call-99' },
        toolCallList: [{
          id: 'tc-1',
          function: {
            arguments: JSON.stringify({ firstName: 'Vapi', lastName: 'Caller', phone: '+15559999999' }),
          },
        }],
      },
    };

    const res = await onRequestPost(makeContext(vapiBody));
    const data = await res.json() as { results: Array<{ toolCallId: string; result: string }> };
    expect(res.status).toBe(200);
    expect(data.results[0].toolCallId).toBe('tc-1');
    expect(data.results[0].result).toContain('vapi-id-1');
  });
});

describe('onRequestPost — upsert path', () => {
  it('updates an existing contact when callId matches', async () => {
    const existingId = 'existing-contact-id';
    let putCalled = false;

    vi.spyOn(global, 'fetch').mockImplementation(async (url) => {
      const urlStr = String(url);
      if (urlStr.includes('/contacts/search')) {
        return new Response(JSON.stringify({ contacts: [{ id: existingId }] }), { status: 200 });
      }
      if (urlStr.includes(`/contacts/${existingId}`)) {
        putCalled = true;
        return new Response(JSON.stringify({ contact: { id: existingId } }), { status: 200 });
      }
      return new Response(JSON.stringify({ contact: { id: 'new-id' } }), { status: 200 });
    });

    const vapiBody = {
      message: {
        type: 'tool-calls',
        call: { id: 'call-dupe' },
        toolCallList: [{
          id: 'tc-2',
          function: { arguments: JSON.stringify({ firstName: 'Repeat', phone: '+15550000001' }) },
        }],
      },
    };

    const res = await onRequestPost(makeContext(vapiBody));
    const data = await res.json() as { results: Array<{ result: string }> };
    expect(putCalled).toBe(true);
    expect(data.results[0].result).toContain('updated');
    expect(data.results[0].result).toContain(existingId);
  });
});
