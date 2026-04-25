export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  color: 'blue' | 'cyan' | 'green' | 'purple';
  features: string[];
  proofPoints: string[];
  idealFor: string[];
}

export const services: Service[] = [
  {
    id: 'website-builds',
    title: 'AI-Powered Website Builds',
    shortTitle: 'Website Builds',
    tagline: 'Production sites built with AI, by someone who learned the craft first.',
    description: 'Full websites designed and developed using Claude Code — from landing pages to multi-page business sites. We don\'t just build static brochures; we custom-wire your site directly into your CRM or CMS so leads flow instantly into your operations. Built on modern frameworks, deployed fast, and optimized from day one.',
    icon: 'code',
    color: 'blue',
    features: [
      'Full-stack site builds using Claude Code + manual refinement',
      'Astro, Next.js, or custom HTML/CSS/JS depending on your needs',
      'Custom API wiring: Connect forms directly to Close CRM, GoHighLevel, AppFolio, or whatever management system you use.',
      'Headless CMS integration so your team can update content without touching code.',
      'Deployed to Vercel or Cloudflare Pages with CI/CD from GitHub',
    ],
    proofPoints: [
      'Built dumpdynastyrentals.com and bigsiouxhomebuyers.com from scratch with Claude Code',
      'This site (xovionlabs.com) is itself a proof of concept',
      'Sub-second load times, 90+ Lighthouse scores across the board',
    ],
    idealFor: [
      'Small businesses that need a real website, not a Wix template',
      'Operators who want something custom without the agency price tag',
      'Businesses whose current website is a disconnected digital brochure that doesn\'t actively talk to their sales pipeline.',
    ],
  },
  {
    id: 'crm-automation',
    title: 'CRM Architecture & Automation',
    shortTitle: 'CRM & Automation',
    tagline: 'Turning your CRM from a messy digital Rolodex into an active revenue engine.',
    description: 'Most businesses use their CRM as a dumping ground for contacts. We engineer custom architectures—granular pipeline stages, smart views, and AI-driven automation—that tell your team exactly who to call today and automatically surface the deals slipping through the cracks.',
    icon: 'workflow',
    color: 'cyan',
    features: [
      'Precision Pipeline Design: Granular stages so leads never sit in a generic \'Follow Up\' bucket.',
      'Smart View Triage: Dashboards that show your team exactly what needs attention today.',
      'Intent-Driven Automation: Workflows that automatically nurture cold leads and route hot responses instantly.',
      'AI Intelligence Briefs: Automated weekly reports summarizing pipeline health, stalled deals, and revenue projections.',
      'Full-Stack Integration: Wiring your website and lead sources directly into the CRM.',
    ],
    proofPoints: [
      'Built a 22-stage acquisition pipeline that categorizes lead intent with zero manual data entry.',
      'Engineered a custom AI dashboard that reads the CRM database and flags neglected deals every Monday morning.',
      'Replaced manual follow-ups with automated, intent-based sequences for real estate and service businesses.',
    ],
    idealFor: [
      'Operators tired of seeing expensive leads fall through the cracks.',
      'Sales teams wasting hours digging through messy pipelines to figure out who to call.',
      'Businesses that need their CRM to actively drive action, not just store data.',
    ],
  },
  {
    id: 'ai-integration',
    title: 'AI Orchestration & Custom Integrations',
    shortTitle: 'AI Integration',
    tagline: 'Stop copying and pasting. Give your AI hands to work inside your actual software.',
    description: 'Using AI as a smart search engine is playing at 10% capacity. We build secure bridges (via APIs and MCPs) that allow Claude to reach directly into your existing software. Instead of copying data back and forth, your AI can pull live reports, update CRM records, and analyze your core operational metrics autonomously.',
    icon: 'plug',
    color: 'green',
    features: [
      'Secure AI Bridges: Hardwire Claude directly into Close CRM, AppFolio, GoHighLevel, or your custom tech stack.',
      'Automated Data Analysis: Connect Google Analytics and Ads directly to your AI for instant performance breakdowns.',
      'Cross-Platform Workflows: Make siloed software platforms finally talk to each other.',
      'Custom AI Actions: Train the model to not just read your data, but actually draft responses, update statuses, and trigger automations.',
    ],
    proofPoints: [
      'Wired Claude directly into AppFolio and Close CRM to manage active real estate and property management operations daily.',
      'Replaced manual data entry by engineering AI to query live databases and generate instant intelligence reports.',
      'Successfully orchestrated multi-tool environments so AI can cross-reference CRM leads with active marketing spend.',
    ],
    idealFor: [
      'Operators tired of manually copying and pasting data between ChatGPT and their CRM.',
      'Businesses with fragmented data living in three different software platforms.',
      'Anyone who wants their AI to stop guessing and start reading their actual, real-time business metrics.',
    ],
  },
  {
    id: 'ai-strategy',
    title: 'Operator Advisory & Blueprinting',
    shortTitle: 'AI Strategy',
    tagline: 'Stop buying hyped-up software. Figure out where AI actually creates leverage.',
    description: 'I don\'t do slide decks, and I don\'t sell theoretical frameworks. We sit down, open the hood of your business, and look at exactly where your operations are bleeding time or cash. Then, I give you the exact, BS-free blueprint on which AI tools will actually fix it—based on what I am actively running in my own companies.',
    icon: 'compass',
    color: 'purple',
    features: [
      'Operational Tear-down: We identify the exact bottlenecks where manual data entry and bad software are slowing you down.',
      'The BS-Free Tool Stack: I tell you which AI tools actually work in the real world, and which ones are just expensive hype.',
      'Custom System Blueprinting: Step-by-step architecture for what you need to build to get immediate ROI.',
      'Workflow Engineering: Practical playbooks on how to actually get your team to adopt the AI without breaking your current systems.',
    ],
    proofPoints: [
      'Actively running three real-world businesses (Metastone Properties, Big Sioux Home Buyers, Dump Dynasty) on AI workflows daily.',
      'Saved thousands in useless monthly software subscriptions by engineering custom AI solutions instead.',
      'I only recommend infrastructure that I have personally stress-tested with my own money and operations.',
    ],
    idealFor: [
      'Operators tired of paying for AI tools that their team doesn\'t actually use.',
      'Business owners who know AI is the future but refuse to hire a theoretical \'consultant.\'',
      'Founders bleeding cash on manual tasks who need a gritty, actionable plan today.',
    ],
  },
  {
    id: 'ai-receptionist',
    title: 'AI Phone Receptionist',
    shortTitle: 'AI Receptionist',
    tagline: 'Every call answered. Every lead captured. Every job booked. Runs while you work.',
    description: 'A real AI receptionist — not a phone tree, not a voicemail upgrade — that picks up every inbound call, qualifies the caller, checks your live calendar, and books the appointment before the call ends. Wired directly into your CRM and follow-up system. Running 24/7. We built and stress-tested this on our own dumpster rental company before offering it to anyone else.',
    icon: 'phone',
    color: 'cyan',
    features: [
      'Answers in under 2 seconds, 24/7 — nights, weekends, lunch breaks included',
      'Creates a contact record in your CRM mid-call with name, number, and call intent',
      'Checks your live calendar and books real appointments — not "we\'ll confirm via email"',
      'Sends a confirmation text to the caller before the call ends',
      'Handles objections, qualifies leads, and explains your services in plain language',
    ],
    proofPoints: [
      'Built and running live on Dump Dynasty (our own dumpster rental company) — not a demo environment',
      'Running live on Xovion Labs right now — call +1 (605) 201-1655 to experience it yourself',
    ],
    idealFor: [
      'Service businesses and home services trades where a missed call is a missed job',
      'Real estate and property management operations handling after-hours inbound',
      'Any appointment-based business where staff spend hours a day on scheduling and follow-up',
    ],
  },
];
