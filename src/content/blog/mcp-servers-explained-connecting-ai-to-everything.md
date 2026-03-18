---
title: "MCP Servers Explained: Connecting AI to Everything"
description: "A practical guide to Model Context Protocol — what it is, why it matters, and how to set it up to connect Claude to your CRM, property management software, and analytics tools."
pubDate: 2026-03-15
tags: ["AI Tools", "Automation"]
readingTime: 7
---

MCP (Model Context Protocol) is the thing that turns Claude from a smart chatbot into an actual business tool. Here's the plain-English version of what it is and how to use it.

## What Is MCP?

MCP is a protocol that lets AI models like Claude connect to external tools and data sources. Instead of just answering questions from its training data, Claude can:

- Read and write to your CRM
- Query your database
- Pull analytics from Google Analytics
- Search your property management software
- Take actions in external systems

Think of it as giving Claude hands — the ability to interact with your actual business tools, not just talk about them.

## Why It Matters

Without MCP, using AI for business means copy-pasting data in and out of chat windows. That's fine for one-off tasks. It doesn't scale.

With MCP:
- Claude can pull your Close CRM data and generate a pipeline report automatically
- Claude can check AppFolio for maintenance requests and draft responses
- Claude can pull Google Analytics data and summarize what's working

The difference between AI as a writing tool and AI as an operational layer.

## How MCP Works

Each MCP server is a small program that exposes specific capabilities to Claude. You run the server locally (or host it), configure Claude to connect to it, and then Claude can use those tools in conversations.

Example: the Close CRM MCP server exposes tools like `search_leads`, `update_lead_status`, `send_sms`. When Claude has access to these, you can say "Find all leads in 'Offer Sent' status and draft a follow-up message for each" — and Claude actually does it.

## Setting Up Your First MCP Server

**Step 1: Install Claude Desktop** (or use Claude Code)

MCP servers connect to Claude via a config file. For Claude Desktop on Mac:

```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Step 2: Add a server config**

```json
{
  "mcpServers": {
    "close-crm": {
      "command": "node",
      "args": ["/path/to/close-mcp-server/index.js"],
      "env": {
        "CLOSE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

**Step 3: Restart Claude and test**

After restarting, Claude will have access to the tools exposed by your MCP server. You'll see a tools icon in the interface showing what's available.

## The Servers I Use

**Close CRM** — Lead management, pipeline queries, SMS workflows. The most impactful one for my real estate operations.

**AppFolio** — Property management queries, tenant communication, maintenance tracking. Game-changer for Metastone Properties.

**Google Analytics** — Real-time and historical site data without logging into the dashboard.

**Google Ads** — Campaign performance, spend tracking, keyword data.

**Filesystem** — Let Claude read and write local files. Essential for Claude Code workflows.

## Building a Custom MCP Server

If the tool you need doesn't have an MCP server, building one is simpler than it sounds. The MCP SDK handles the protocol — you just write the tool functions.

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "my-tool", version: "1.0.0" }, {
  capabilities: { tools: {} },
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [{
    name: "get_data",
    description: "Fetch data from my system",
    inputSchema: { type: "object", properties: { id: { type: "string" } } },
  }],
}));

// Handle the tool call
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get_data") {
    const data = await fetchFromMySystem(request.params.arguments.id);
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
});
```

That's the skeleton. Add your actual API calls and you have a working MCP server.

## The Practical Upshot

MCP is what makes AI operational rather than conversational. If you're using Claude as a smarter search engine, you're at 10% of what it can do.

Setting up even one MCP server — your CRM, your analytics, your database — changes how you use AI. Suddenly you're not asking Claude questions. You're giving Claude jobs.

If you want help setting up MCP connections for your business tools, that's one of the core services we do at Xovion Labs.
