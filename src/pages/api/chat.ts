export const prerender = false;

import type { APIContext } from 'astro';
import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '@data/agentContext';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

function ghlHeaders(apiKey: string): Record<string, string> {
  return {
    Authorization: `Bearer ${apiKey}`,
    Version: GHL_VERSION,
    'Content-Type': 'application/json',
  };
}

const TOOLS: Anthropic.Tool[] = [
  {
    name: 'create_ghl_contact',
    description:
      "Create a new contact in GoHighLevel CRM. Call this as soon as you have the visitor's name plus at least one contact method (email or phone). Returns a contactId to use when booking.",
    input_schema: {
      type: 'object',
      properties: {
        firstName: { type: 'string', description: 'First name' },
        lastName: { type: 'string', description: 'Last name (if provided)' },
        email: { type: 'string', description: 'Email address (if provided)' },
        phone: { type: 'string', description: 'Phone number (if provided)' },
        companyName: { type: 'string', description: 'Business or company name' },
        notes: {
          type: 'string',
          description:
            'Qualification notes: business type, pain point, service interest, team size, etc.',
        },
      },
      required: ['firstName'],
    },
  },
  {
    name: 'get_available_slots',
    description:
      'Get available appointment slots on the Xovion Labs discovery call calendar for the next 7 days. Call this before offering the visitor specific times.',
    input_schema: {
      type: 'object',
      properties: {
        timezone: {
          type: 'string',
          description:
            "Visitor's timezone (e.g. 'America/Chicago'). Default to 'America/Chicago' if unknown.",
        },
      },
      required: [],
    },
  },
  {
    name: 'book_appointment',
    description:
      'Book a discovery call appointment. Only call this after the visitor has confirmed a specific time slot.',
    input_schema: {
      type: 'object',
      properties: {
        startTime: {
          type: 'string',
          description: 'ISO 8601 datetime for the appointment start',
        },
        contactId: {
          type: 'string',
          description: 'GHL contact ID returned from create_ghl_contact',
        },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        notes: {
          type: 'string',
          description: 'Brief note about what the call is about',
        },
      },
      required: ['startTime', 'firstName', 'email'],
    },
  },
];

type GHLEnv = {
  GHL_API_KEY: string;
  GHL_LOCATION_ID: string;
  GHL_CALENDAR_ID: string;
};

async function executeToolCall(
  toolName: string,
  toolInput: Record<string, unknown>,
  env: GHLEnv
): Promise<string> {
  try {
    if (toolName === 'create_ghl_contact') {
      const body: Record<string, unknown> = {
        locationId: env.GHL_LOCATION_ID,
        firstName: toolInput.firstName,
        lastName: toolInput.lastName ?? '',
        email: toolInput.email,
        phone: toolInput.phone,
        companyName: toolInput.companyName,
        source: 'chat-widget',
        tags: ['chat-lead'],
      };
      if (toolInput.notes) {
        body.customFields = [{ key: 'chat_notes', field_value: toolInput.notes }];
      }
      const res = await fetch(`${GHL_BASE}/contacts/`, {
        method: 'POST',
        headers: ghlHeaders(env.GHL_API_KEY),
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { contact?: { id: string } };
      if (data.contact?.id) {
        return JSON.stringify({ success: true, contactId: data.contact.id });
      }
      return JSON.stringify({ success: false, raw: data });
    }

    if (toolName === 'get_available_slots') {
      const timezone = (toolInput.timezone as string) ?? 'America/Chicago';
      const start = new Date();
      const end = new Date();
      end.setDate(end.getDate() + 7);
      const params = new URLSearchParams({
        startDate: start.toISOString().split('T')[0],
        endDate: end.toISOString().split('T')[0],
        timezone,
      });
      const res = await fetch(
        `${GHL_BASE}/calendars/${env.GHL_CALENDAR_ID}/free-slots?${params}`,
        { headers: ghlHeaders(env.GHL_API_KEY) }
      );
      const data = (await res.json()) as Record<string, { slots?: string[] }>;
      const slots: string[] = [];
      for (const day of Object.values(data)) {
        if (day.slots) slots.push(...day.slots);
        if (slots.length >= 8) break;
      }
      return JSON.stringify({ availableSlots: slots.slice(0, 8) });
    }

    if (toolName === 'book_appointment') {
      const startMs = new Date(toolInput.startTime as string).getTime();
      const body = {
        calendarId: env.GHL_CALENDAR_ID,
        locationId: env.GHL_LOCATION_ID,
        contactId: toolInput.contactId,
        startTime: toolInput.startTime,
        endTime: new Date(startMs + 30 * 60 * 1000).toISOString(),
        title: `Discovery Call – ${toolInput.firstName}`,
        appointmentStatus: 'confirmed',
        toNotify: true,
        notes: toolInput.notes ?? '',
      };
      const res = await fetch(`${GHL_BASE}/calendars/events/appointments`, {
        method: 'POST',
        headers: ghlHeaders(env.GHL_API_KEY),
        body: JSON.stringify(body),
      });
      const data = (await res.json()) as { id?: string };
      if (data.id) {
        return JSON.stringify({ success: true, appointmentId: data.id });
      }
      return JSON.stringify({ success: false, raw: data });
    }

    return JSON.stringify({ error: `Unknown tool: ${toolName}` });
  } catch (err) {
    return JSON.stringify({ error: String(err) });
  }
}

export async function POST(context: APIContext): Promise<Response> {
  // Env works in both local dev (import.meta.env) and CF Pages (runtime.env)
  const runtime = (context.locals as Record<string, unknown>)?.runtime as
    | { env?: Record<string, string> }
    | undefined;
  const getEnv = (key: string) =>
    runtime?.env?.[key] ?? (import.meta.env as Record<string, string>)[key] ?? '';

  const ANTHROPIC_API_KEY = getEnv('ANTHROPIC_API_KEY');
  const ghlEnv: GHLEnv = {
    GHL_API_KEY: getEnv('GHL_API_KEY'),
    GHL_LOCATION_ID: getEnv('GHL_LOCATION_ID'),
    GHL_CALENDAR_ID: getEnv('GHL_CALENDAR_ID'),
  };

  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'Server not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { messages: Anthropic.MessageParam[] };
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();

  const TOOL_STATUS: Record<string, string> = {
    create_ghl_contact: 'Saving your info...',
    get_available_slots: 'Checking calendar availability...',
    book_appointment: 'Booking your appointment...',
  };

  const readableStream = new ReadableStream({
    async start(controller) {
      const send = (data: object) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const messages: Anthropic.MessageParam[] = [...body.messages];
        let iterations = 0;
        const MAX_ITERATIONS = 6;

        while (iterations < MAX_ITERATIONS) {
          iterations++;

          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages,
            tools: TOOLS,
          });

          if (response.stop_reason === 'tool_use') {
            const toolUseBlocks = response.content.filter(
              (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use'
            );

            // Send status for each tool call
            for (const toolUse of toolUseBlocks) {
              send({
                type: 'status',
                text: TOOL_STATUS[toolUse.name] ?? 'Working...',
              });
            }

            // Execute all tools (in parallel if multiple)
            const toolResults: Anthropic.ToolResultBlockParam[] = await Promise.all(
              toolUseBlocks.map(async (toolUse) => ({
                type: 'tool_result' as const,
                tool_use_id: toolUse.id,
                content: await executeToolCall(
                  toolUse.name,
                  toolUse.input as Record<string, unknown>,
                  ghlEnv
                ),
              }))
            );

            // Continue the loop with results
            messages.push({ role: 'assistant', content: response.content });
            messages.push({ role: 'user', content: toolResults });
            continue;
          }

          // Final text response
          const finalText = response.content
            .filter((b): b is Anthropic.TextBlock => b.type === 'text')
            .map((b) => b.text)
            .join('');

          send({ type: 'text', text: finalText });
          send({ type: 'done' });
          controller.close();
          return;
        }

        // Safety fallback
        send({ type: 'text', text: "I'm having trouble right now — please try again in a moment." });
        send({ type: 'done' });
        controller.close();
      } catch (err) {
        console.error('Chat API error:', err);
        send({ type: 'error', text: 'Something went wrong. Please try again.' });
        controller.close();
      }
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
