export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  whatItCovers: string[];
  whoItsFor: string[];
  deliverable: string;
  proofPoints: string[];
  cta: string;
}

export const services: Service[] = [
  {
    id: "website-builds",
    title: "Website Builds",
    tagline: "Real sites. Real fast.",
    description:
      "Full websites built with Claude Code — not dragged and dropped. Landing pages, business sites, and web apps that load fast, rank well, and actually convert.",
    icon: "⚡",
    whatItCovers: [
      "Custom site architecture using Astro, Next.js, or plain HTML",
      "Dark mode premium design with tailored branding",
      "SEO fundamentals baked in from the start",
      "Mobile-first, responsive layout",
      "Contact forms, booking embeds, analytics integration",
      "Deployed to Vercel or Cloudflare Pages — live same day",
    ],
    whoItsFor: [
      "Service businesses that need a professional web presence",
      "Real estate operators who want a site that converts",
      "Founders who need something real, not a template",
    ],
    deliverable:
      "A fully deployed, production-ready website with your content, your branding, and working CTAs — not a mockup.",
    proofPoints: [
      "Dump Dynasty — dumpster rental business site with SEO targeting",
      "Big Sioux Home Buyers — real estate wholesaling site",
      "Xovion Labs — this site, built with the exact same workflow",
    ],
    cta: "Get Your Site Built",
  },
  {
    id: "crm-automation",
    title: "CRM Builds & Automation",
    tagline: "Close CRM that actually closes.",
    description:
      "Pipeline design, automation workflows, smart views, and SMS infrastructure built for operators who need their CRM to do real work — not just store contacts.",
    icon: "🔄",
    whatItCovers: [
      "Close CRM pipeline architecture from scratch",
      "22+ status pipeline design for real estate workflows",
      "Smart views, bulk actions, and reporting dashboards",
      "Automated SMS and email sequences",
      "13,000+ weekly text infrastructure setup",
      "Weekly AI-generated intelligence reports",
    ],
    whoItsFor: [
      "Real estate wholesalers and investors",
      "Service businesses with high lead volume",
      "Operators who've outgrown basic CRM setups",
    ],
    deliverable:
      "A fully configured Close CRM setup with your pipeline, automations, and SMS campaigns running — not a tutorial on how to do it yourself.",
    proofPoints: [
      "22-status pipeline for Big Sioux Home Buyers",
      "13,000+ outbound texts per week via automated sequences",
      "Weekly deal intelligence reports generated with AI",
    ],
    cta: "Build My CRM",
  },
  {
    id: "ai-tool-integration",
    title: "AI Tool Integration",
    tagline: "Connect your tools. Multiply your output.",
    description:
      "MCP server setup, API connections, and multi-tool orchestration that connects AI to the systems you already use — so your whole stack gets smarter.",
    icon: "🔌",
    whatItCovers: [
      "MCP server configuration for Claude and other AI tools",
      "API connections between CRMs, property management, and analytics",
      "AppFolio + AI workflow setup for property managers",
      "GoHighLevel automation pipelines",
      "Google Analytics and Google Ads MCP configs",
      "Custom AI agents for recurring operational tasks",
    ],
    whoItsFor: [
      "Property managers running AppFolio or similar platforms",
      "Sales teams wanting AI in their CRM workflows",
      "Operators who've heard about MCP but don't know where to start",
    ],
    deliverable:
      "Working AI-to-tool connections with documentation — not a stack of API docs and a good luck.",
    proofPoints: [
      "AppFolio MCP integration for Metastone Properties",
      "Close CRM + Claude AI for deal analysis and outreach",
      "Google Analytics MCP for real-time site performance visibility",
    ],
    cta: "Connect My Stack",
  },
  {
    id: "ai-strategy",
    title: "AI Strategy & Consulting",
    tagline: "Skip the hype. Get the playbook.",
    description:
      "Help identifying where AI actually fits in your business, which tools to use, and how to implement without burning money on demos and subscriptions that don't move the needle.",
    icon: "🧠",
    whatItCovers: [
      "AI opportunity audit across your current operations",
      "Tool selection: what's worth it, what's not",
      "Implementation roadmap with real priorities",
      "Workflow design for AI-assisted operations",
      "Ongoing advisory as your stack evolves",
    ],
    whoItsFor: [
      "Business owners overwhelmed by AI tool options",
      "Operators who want AI but don't know where to start",
      "Teams that have tried AI tools and didn't see ROI",
    ],
    deliverable:
      "A specific, actionable plan for integrating AI into your business — based on what actually works across real estate, service businesses, and operations.",
    proofPoints: [
      "Running 3 businesses on AI-powered workflows daily",
      "Metastone Properties, Big Sioux Home Buyers, and Dump Dynasty — all AI-augmented",
      "Saved 20+ hours/week across operations using AI automation",
    ],
    cta: "Book a Strategy Call",
  },
];
