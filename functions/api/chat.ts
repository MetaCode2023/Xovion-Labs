// No SDK dependency — raw fetch calls to Anthropic API for full CF Workers compatibility

interface Env {
  ANTHROPIC_API_KEY: string;
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface TextBlock { type: 'text'; text: string }
interface ToolUseBlock { type: 'tool_use'; id: string; name: string; input: Record<string, unknown> }
interface ToolResultBlock { type: 'tool_result'; tool_use_id: string; content: string }
type ContentBlock = TextBlock | ToolUseBlock;
interface Message { role: 'user' | 'assistant'; content: ContentBlock[] | ToolResultBlock[] | string }
interface AnthropicResponse { stop_reason: string; content: ContentBlock[] }

const BOOKING_LINK = 'https://api.leadconnectorhq.com/widget/bookings/ai-leverage-exploration-';

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are a conversational AI agent for Xovion Labs — an AI systems company that builds websites, automates CRMs, wires AI into business software, and advises operators on where AI creates real leverage.

Your job: have a real conversation with visitors, understand their business situation, and figure out if Xovion Labs can help them. Be warm, direct, and practical.

## Services

### AI-Powered Website Builds
Full websites built with Claude Code, custom-wired into CRM/CMS. Leads flow directly into operations. Deployed on Cloudflare Pages. Sub-second load times, 90+ Lighthouse scores.
Best for: Small businesses needing a real website (not a Wix template), operators who want custom work without agency pricing, businesses whose website is a disconnected brochure.

### CRM Architecture & Automation
Custom pipeline stages, smart views, and intent-driven automation that tell your team who to call today and surface deals slipping through the cracks. Also wires lead sources directly into the CRM.
Best for: Operators with leads falling through the cracks, sales teams wasting time digging through messy pipelines, businesses that need their system to drive action.

### AI Orchestration & Custom Integrations
Secure AI bridges (APIs and MCPs) that let Claude reach into your existing software — GoHighLevel, Close CRM, AppFolio, or custom stacks — to pull live reports, update records, and trigger automations without manual copy-paste.
Best for: Operators copying data between ChatGPT and their CRM, businesses with fragmented data across multiple platforms, anyone who wants their AI to read real-time business metrics.

### Operator Advisory & Blueprinting
BS-free operational teardown to find exactly where AI creates leverage in your specific business, with a custom step-by-step blueprint based on what's actually been stress-tested in real companies.
Best for: Operators tired of paying for AI tools their team doesn't use, founders bleeding cash on manual tasks who need an actionable plan today.

## Conversation Rules
- Keep messages to 2–4 sentences. This is a chat widget, not email.
- Ask only one question per message.
- Never say "CRM" to non-technical people — say "your system" or "your pipeline".
- When you have a name + any contact method (email or phone), call create_ghl_contact immediately.
- When fit is clear and the user wants to book a call, share this booking link so they can pick a time directly: ${BOOKING_LINK}
- Do not try to list slots or book on their behalf — the link handles everything.`;

// ── Tools definition (Anthropic API format) ───────────────────────────────────
const TOOLS = [
  {
    name: 'create_ghl_contact',
    description: "Create a contact in GoHighLevel. Call as soon as you have the visitor's name + any contact method (email or phone).",
    input_schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        companyName: { type: 'string' },
        notes: { type: 'string', description: 'Business type, pain point, service interest, team size' },
      },
      required: ['firstName'],
    },
  },
];

const TOOL_STATUS: Record<string, string> = {
  create_ghl_contact: 'Saving your info...',
};

// ── Anthropic API call (raw fetch, no SDK) ────────────────────────────────────
async function callAnthropic(
  apiKey: string,
  messages: Message[]
): Promise<AnthropicResponse> {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
      tools: TOOLS,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${err}`);
  }

  return res.json() as Promise<AnthropicResponse>;
}

// ── GHL API helpers ───────────────────────────────────────────────────────────
const GHL_BASE = 'https://services.leadconnectorhq.com';

function ghlHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: '2021-07-28',
    'Content-Type': 'application/json',
  };
}

async function runTool(name: string, input: Record<string, unknown>, env: Env): Promise<string> {
  try {
    if (name === 'create_ghl_contact') {
      const body: Record<string, unknown> = {
        locationId: env.GHL_LOCATION_ID,
        firstName: input.firstName,
        lastName: input.lastName ?? '',
        email: input.email,
        phone: input.phone,
        companyName: input.companyName,
        source: 'chat-widget',
        tags: ['chat-lead'],
      };
      if (input.notes) body.customFields = [{ key: 'chat_notes', field_value: input.notes }];

      const res = await fetch(`${GHL_BASE}/contacts/`, {
        method: 'POST',
        headers: ghlHeaders(env.GHL_API_KEY),
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { contact?: { id: string } };
      return JSON.stringify(
        data.contact?.id ? { success: true, contactId: data.contact.id } : { success: false, status: res.status }
      );
    }

    return JSON.stringify({ error: `Unknown tool: ${name}` });
  } catch (err) {
    return JSON.stringify({ error: String(err) });
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { request, env } = context;

  const sse = (data: object) => `data: ${JSON.stringify(data)}\n\n`;

  if (!env.ANTHROPIC_API_KEY) {
    return new Response(sse({ type: 'error', text: 'Server not configured.' }) + sse({ type: 'done' }), {
      headers: { 'Content-Type': 'text/event-stream', 'Access-Control-Allow-Origin': '*' },
    });
  }

  let body: { messages: Message[] };
  try {
    body = await request.json();
  } catch {
    return new Response(sse({ type: 'error', text: 'Invalid request.' }) + sse({ type: 'done' }), {
      headers: { 'Content-Type': 'text/event-stream', 'Access-Control-Allow-Origin': '*' },
    });
  }

  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
  const writer = writable.getWriter();

  const send = async (data: object) => {
    await writer.write(encoder.encode(sse(data)));
  };

  (async () => {
    try {
      const messages: Message[] = [...body.messages];

      for (let i = 0; i < 6; i++) {
        const response = await callAnthropic(env.ANTHROPIC_API_KEY, messages);

        if (response.stop_reason === 'tool_use') {
          const toolBlocks = response.content.filter(
            (b): b is ToolUseBlock => b.type === 'tool_use'
          );

          for (const t of toolBlocks) {
            await send({ type: 'status', text: TOOL_STATUS[t.name] ?? 'Working...' });
          }

          const results: ToolResultBlock[] = await Promise.all(
            toolBlocks.map(async (t) => ({
              type: 'tool_result' as const,
              tool_use_id: t.id,
              content: await runTool(t.name, t.input, env),
            }))
          );

          messages.push({ role: 'assistant', content: response.content });
          messages.push({ role: 'user', content: results });
          continue;
        }

        const text = response.content
          .filter((b): b is TextBlock => b.type === 'text')
          .map((b) => b.text)
          .join('');

        await send({ type: 'text', text });
        break;
      }
    } catch (err) {
      console.error('Chat error:', err);
      await send({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      await send({ type: 'done' });
      await writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export function onRequestOptions(): Response {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

// Health check — visit /api/chat in browser to confirm function is deployed
export function onRequestGet(): Response {
  return new Response(JSON.stringify({ ok: true, service: 'xovion-chat' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
