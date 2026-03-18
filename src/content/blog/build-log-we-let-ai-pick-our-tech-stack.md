---
title: "Build Log: We Let AI Pick Our Tech Stack. Here's What Happened."
description: "We didn't plan the architecture for this build. We just started prompting. Then we had to figure out how to fly the plane."
pubDate: 2026-03-18
tags: ["AI Tools", "Claude Code", "Web Development", "Build Log"]
author: Austin
readingTime: 7
---

We didn't plan the architecture for this build. We just started prompting. Then we had to figure out how to fly the plane.

## The Start

We didn't sit around debating React vs. Vue vs. WordPress. That conversation is a waste of time — the kind of thing dev agencies bill $300/hour to argue about in Notion docs nobody reads.

We opened the terminal, fed Claude Code our existing site — colors, logos, copy, the whole thing — and typed: *"Build a fast, clean website for a dumpster rental operation based on this."*

The AI had a baseline to work from. It wasn't starting from a blank slate guessing what we wanted. It already knew the brand. It already knew the tone. That context changes everything — the difference between an AI generating something generic and an AI building something that actually looks like yours.

The files it started generating were `.astro` files. We had never touched Astro in our lives.

That was fine. We kept going. Within 20 minutes we had a full component structure, routing, and a homepage that scored 98 on Lighthouse before we'd written a single line ourselves. The AI handed us infrastructure. Our job became keeping up with it.

This is what happened next.

## The Setup: Cursor + Claude Code

Two tools did the heavy lifting.

**Cursor** is the code editor — VS Code with AI wired directly in. Solid. Not magic.

**Claude Code** is where the real work happened. It runs in the terminal as an autonomous agent. You give it a task, it reads your entire file structure, writes files, edits components, installs dependencies, and reports back. You are not writing code. You are directing.

That psychological shift is the whole game.

Traditional development: stare at a blank file, write from scratch, Google every third function, repeat.

AI-assisted development: describe what you want, read the output, understand it, redirect.

The AI generated typed, clean, zero-JavaScript components from the jump. We didn't write them. But we read every line. That's the new discipline — reading AI code is the skill. If you can't read it, you can't direct it, and eventually something breaks and you have no idea where to look.

<div style="margin: 2rem 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
  <div style="background: #1e1e1e; padding: 10px 16px; display: flex; align-items: center; gap: 8px; border-bottom: 1px solid #333;">
    <span style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56; display: inline-block;"></span>
    <span style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e; display: inline-block;"></span>
    <span style="width: 12px; height: 12px; border-radius: 50%; background: #27c93f; display: inline-block;"></span>
    <span style="color: #888; font-size: 12px; margin-left: 8px;">claude — terminal</span>
  </div>
  <div style="background: #141414; padding: 24px 28px; min-height: 420px;">
    <div style="margin-bottom: 16px;">
      <span style="color: #27c93f;">~/dump-dynasty</span>
      <span style="color: #888;"> $ </span>
      <span style="color: #e8e8e8;">claude</span>
    </div>
    <div style="color: #888; margin-bottom: 20px; font-size: 12px;">Claude Code v1.2.4 — type your task</div>
    <div style="margin-bottom: 20px;">
      <span style="color: #7c6af7;">❯ </span>
      <span style="color: #e8e8e8;">Build a fast, clean website for a dumpster rental operation. Here's our existing site — use these exact colors, logo, and copy as your baseline. Framework should be optimized for local SEO and load speed.</span>
    </div>
    <div style="border-top: 1px solid #2a2a2a; margin-bottom: 20px;"></div>
    <div style="color: #888; margin-bottom: 16px; font-size: 12px;">● Analyzing existing site assets...</div>
    <div style="margin-bottom: 8px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Extracted brand tokens — </span><span style="color: #7c6af7;">#F5A623</span><span style="color: #888;">, </span><span style="color: #7c6af7;">#1A1A1A</span><span style="color: #888;">, </span><span style="color: #7c6af7;">Inter/700</span></div>
    <div style="margin-bottom: 8px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Scaffolding Astro 5.x project — zero JS by default</span></div>
    <div style="margin-bottom: 8px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Created </span><span style="color: #e8e8e8;">src/components/Hero.astro</span></div>
    <div style="margin-bottom: 8px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Created </span><span style="color: #e8e8e8;">src/components/ServiceCard.astro</span></div>
    <div style="margin-bottom: 8px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Created </span><span style="color: #e8e8e8;">src/pages/index.astro</span><span style="color: #888;"> — homepage with local SEO meta</span></div>
    <div style="margin-bottom: 8px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Created </span><span style="color: #e8e8e8;">src/pages/services.astro</span></div>
    <div style="margin-bottom: 8px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Configured Tailwind with brand color tokens</span></div>
    <div style="margin-bottom: 20px;"><span style="color: #27c93f;">✓ </span><span style="color: #888;">Installed dependencies</span></div>
    <div style="border-top: 1px solid #2a2a2a; margin-bottom: 20px;"></div>
    <div style="margin-bottom: 8px;"><span style="color: #888;">Running </span><span style="color: #e8e8e8;">npm run build</span><span style="color: #888;">...</span></div>
    <div style="margin-bottom: 8px; padding-left: 16px;"><span style="color: #888;">dist/ generated — </span><span style="color: #27c93f;">6 pages</span><span style="color: #888;">, </span><span style="color: #27c93f;">0kb JS</span><span style="color: #888;"> shipped to client</span></div>
    <div style="margin-top: 20px; padding: 14px 18px; background: #1e1e1e; border-radius: 8px; border: 1px solid #2a2a2a; display: flex; gap: 28px;">
      <div><div style="color: #27c93f; font-size: 20px; font-weight: 600;">98</div><div style="color: #666; font-size: 11px;">Performance</div></div>
      <div><div style="color: #27c93f; font-size: 20px; font-weight: 600;">100</div><div style="color: #666; font-size: 11px;">SEO</div></div>
      <div><div style="color: #27c93f; font-size: 20px; font-weight: 600;">100</div><div style="color: #666; font-size: 11px;">Best Practices</div></div>
      <div><div style="color: #ffbd2e; font-size: 20px; font-weight: 600;">94</div><div style="color: #666; font-size: 11px;">Accessibility</div></div>
    </div>
    <div style="margin-top: 20px; color: #444; font-size: 11px;">⏱ Completed in 18 minutes — we had never touched Astro before this session</div>
    <div style="margin-top: 20px;"><span style="color: #27c93f;">~/dump-dynasty</span><span style="color: #888;"> $ </span><span style="color: #e8e8e8; border-right: 2px solid #e8e8e8; animation: blink 1s step-end infinite; padding-right: 2px;"> </span></div>
  </div>
</div>
<style>@keyframes blink { 0%, 100% { border-color: #e8e8e8; } 50% { border-color: transparent; } }</style>

## Figuring Out Astro on the Fly

So what is Astro? We didn't know. We found out by reverse-engineering what the AI built.

Astro has one core obsession: ship zero JavaScript by default. Every component renders to static HTML at build time. No bloated client-side bundles. No React hydration overhead. Just fast, clean HTML served from the edge.

The architecture is called Island Architecture. Your page is a static ocean. If you need something interactive — a contact form, a live quote calculator — you carve out a specific island that loads dynamically. Everything else stays static. Dead weight never ships.

The AI handed us a zero-JavaScript Ferrari. We had to open the hood to understand why it was scoring 100 on performance tests.

The aha moment: this isn't a React site pretending to be fast. It's a fundamentally different model. The AI picked the right tool for the job before we even knew what the job required. That's worth sitting with for a second — the AI made a better architectural decision than most developers would have made in a two-hour planning meeting.

## When the AI Broke Everything (And How We Survived It)

About 48 hours in, Claude Code hallucinated a routing fix.

It confidently refactored the entire pages directory to solve a problem that didn't exist. Broke every internal link on the site. 404s everywhere. The fix created more damage than the original issue ever would have.

We needed to roll back. That's when version control stopped being a best practice and became a mandatory business survival tool.

Git is a time machine. Every commit is a save state. When the AI wrecks your codebase — and it will, eventually — you reset and you're back. No manual undo, no panicked file recovery, no starting over.

The habit we built after that: commit before every major AI operation. One line, every time:

> *"Stable: homepage complete before routing refactor."*

That single discipline saved us multiple times. The AI operates in the working directory. Git operates on the truth. They are two separate layers and you need both. Skipping version control when building with AI is like doing electrical work without a breaker — fine until it isn't, and when it isn't, it's bad.

## Getting It Live: Cloudflare

Local build is done. Site scores 100. Now you have to get it onto the actual internet.

This is where a lot of operators stall out. Servers, hosting configs, SSH keys — the traditional path is a rabbit hole that has nothing to do with your actual business.

We skipped all of it.

**Cloudflare Pages.** Connect your GitHub repo, set the build command, push to main. That's it. Cloudflare detects the push, pulls the code, runs the build, and deploys the output across 300+ global edge locations automatically. Someone in Denver gets the site from a Denver server. Someone in Minneapolis gets it from Minneapolis. The whole thing scales globally for the price of a SaaS subscription.

The full pipeline: Claude Code writes → Cursor edits → Git tracks → GitHub stores → Cloudflare builds and deploys.

<div style="margin: 2rem 0;">
  <img src="/blog/ai_build_pipeline_graphic.svg" alt="The AI build pipeline from brand assets through Claude Code, Cursor, Git, GitHub, and Cloudflare to production" style="width: 100%; border-radius: 10px;" />
</div>

Five tools. Zero servers. Production-grade infrastructure for a dumpster rental company.

## What This Actually Teaches You

Here's the thing nobody talks about with AI-assisted development: it doesn't just build faster. It forces you to learn systems architecture at a speed that's impossible any other way.

When you build everything yourself, you understand every layer because you chose it. You picked the framework, configured the server, wrote the deployment script.

When AI builds it, you get handed a complete machine you didn't assemble. And if you're serious about operating it, you have to reverse-engineer your own infrastructure. That's not a downside. That's the fastest technical education available.

We didn't need a CS degree for this. We needed three things: a clear problem, the stubbornness to let AI build something we didn't fully understand yet, and the curiosity to dig in until we did.

<div style="margin: 2rem 0; display: grid; grid-template-columns: 1fr 1fr; gap: 2px; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;">
  <div style="background: #141414; padding: 28px 24px;">
    <div style="font-family: var(--font-mono); font-size: 11px; color: #555; margin-bottom: 12px; letter-spacing: 0.08em;">THE OLD WAY</div>
    <div style="font-size: 22px; font-weight: 500; color: #e8e8e8; margin-bottom: 4px;">Hire an Agency</div>
    <div style="font-size: 13px; color: #555; margin-bottom: 28px;">WordPress + WooThemes + plugins</div>
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #222;">
        <div><div style="color: #aaa; font-size: 13px;">Timeline</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">8–12 weeks</div></div>
        <div style="background: #2a1a1a; color: #e05a5a; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">slow</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #222;">
        <div><div style="color: #aaa; font-size: 13px;">Cost</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">$8,000 – $15,000</div></div>
        <div style="background: #2a1a1a; color: #e05a5a; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">expensive</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #222;">
        <div><div style="color: #aaa; font-size: 13px;">Ongoing cost</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">$200–$500/mo</div></div>
        <div style="background: #2a1a1a; color: #e05a5a; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">recurring</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #222;">
        <div><div style="color: #aaa; font-size: 13px;">Lighthouse score</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">40 – 65</div></div>
        <div style="background: #2a1a1a; color: #e05a5a; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">slow load</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #222;">
        <div><div style="color: #aaa; font-size: 13px;">Updates</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">File a ticket</div></div>
        <div style="background: #2a1a1a; color: #e05a5a; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">dependent</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div><div style="color: #aaa; font-size: 13px;">Ownership</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">You don't touch it</div></div>
        <div style="background: #2a1a1a; color: #e05a5a; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">zero control</div>
      </div>
    </div>
  </div>
  <div style="background: #0e1a12; padding: 28px 24px;">
    <div style="font-family: var(--font-mono); font-size: 11px; color: #27c93f; margin-bottom: 12px; letter-spacing: 0.08em; opacity: 0.7;">THE NEW WAY</div>
    <div style="font-size: 22px; font-weight: 500; color: #e8e8e8; margin-bottom: 4px;">Claude Code + 4 Tools</div>
    <div style="font-size: 13px; color: #3a6644; margin-bottom: 28px;">Astro · Cursor · GitHub · Cloudflare</div>
    <div style="display: flex; flex-direction: column; gap: 14px;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #1a2e1e;">
        <div><div style="color: #4a7a58; font-size: 13px;">Timeline</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">1 day</div></div>
        <div style="background: #122218; color: #27c93f; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">fast</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #1a2e1e;">
        <div><div style="color: #4a7a58; font-size: 13px;">Cost</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">~$50 in AI credits</div></div>
        <div style="background: #122218; color: #27c93f; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">cheap</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #1a2e1e;">
        <div><div style="color: #4a7a58; font-size: 13px;">Ongoing cost</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">~$20/mo hosting</div></div>
        <div style="background: #122218; color: #27c93f; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">minimal</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #1a2e1e;">
        <div><div style="color: #4a7a58; font-size: 13px;">Lighthouse score</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">98 – 100</div></div>
        <div style="background: #122218; color: #27c93f; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">instant load</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 14px; border-bottom: 1px solid #1a2e1e;">
        <div><div style="color: #4a7a58; font-size: 13px;">Updates</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">Type a prompt</div></div>
        <div style="background: #122218; color: #27c93f; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">immediate</div>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: flex-start;">
        <div><div style="color: #4a7a58; font-size: 13px;">Ownership</div><div style="color: #e8e8e8; font-size: 15px; font-weight: 500; margin-top: 2px;">You own every file</div></div>
        <div style="background: #122218; color: #27c93f; font-size: 11px; padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono);">full control</div>
      </div>
    </div>
  </div>
</div>
<div style="margin-top: 2px; background: #0a0a0a; border-radius: 0 0 12px 12px; padding: 14px 24px; display: flex; justify-content: center; align-items: center; gap: 8px; border: 1px solid #1e293b; border-top: none;">
  <span style="font-family: var(--font-mono); font-size: 12px; color: #444;">same result.</span>
  <span style="font-family: var(--font-mono); font-size: 12px; color: #27c93f;">99% less cost.</span>
  <span style="font-family: var(--font-mono); font-size: 12px; color: #444;">shipped in a day.</span>
</div>

**Prompt. Observe. Understand. Redirect.**

That's the operating system for building with AI. You don't need to write the code. You need to understand the machine well enough to tell it where to go.

And if you'd rather skip the learning curve and just have the machine built — that's what we do.
