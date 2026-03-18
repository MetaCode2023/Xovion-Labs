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
    title: 'AI Tool Integration & MCP Setups',
    shortTitle: 'AI Integration',
    tagline: 'Connect AI to the tools you already use. Make them talk to each other.',
    description: 'Set up and configure AI integrations using MCP (Model Context Protocol) servers and API connections. Connect Claude to your CRM, property management software, analytics platforms, and more — so AI can actually work with your data instead of guessing.',
    icon: 'plug',
    color: 'green',
    features: [
      'MCP server setup and configuration (Windows, Mac, WSL)',
      'Connect Claude to Close CRM, AppFolio, GoHighLevel, and more',
      'Google Analytics and Google Ads AI integration',
      'Custom automation workflows between AI and your existing tools',
      'Troubleshooting and debugging broken MCP connections',
    ],
    proofPoints: [
      'Running MCP integrations across Close CRM, AppFolio, Google Analytics, and Google Ads daily',
      'Built custom MCP setup and troubleshooting skills for Claude Code',
      'Connected AI to property management, CRM, and analytics in production environments',
    ],
    idealFor: [
      'Teams already using AI but not getting full value from their tools',
      'Businesses with data in multiple systems that don\'t talk to each other',
      'Anyone who wants Claude to actually understand their business data',
    ],
  },
  {
    id: 'ai-strategy',
    title: 'AI Strategy & Consulting',
    shortTitle: 'AI Strategy',
    tagline: 'Figure out where AI fits in your business — without burning money on hype.',
    description: 'Strategic guidance on where and how to implement AI in your business. Not theory from someone who read a blog post — practical advice from an operator running multiple businesses on AI-powered workflows every day. Focus on what actually moves the needle.',
    icon: 'compass',
    color: 'purple',
    features: [
      'AI readiness assessment for your business and workflows',
      'Tool selection guidance — which AI tools actually fit your needs',
      'Implementation roadmap with phased rollout plan',
      'Team training on AI-assisted workflows',
      'Ongoing advisory for AI strategy as tools evolve',
    ],
    proofPoints: [
      'Running three businesses (real estate, property management, dumpster rentals) on AI-powered workflows',
      'Evaluated and implemented dozens of AI tools across different business contexts',
      'Built and teaches practical AI workflows, not theoretical frameworks',
    ],
    idealFor: [
      'Business owners hearing about AI but unsure where to start',
      'Teams already experimenting with AI but not seeing ROI',
      'Operators who want practical guidance, not a consultant\'s slide deck',
    ],
  },
];
