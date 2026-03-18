export interface Tool {
  name: string;
  category: string;
  description: string;
  url?: string;
}

export const tools: Tool[] = [
  { name: 'Claude / Claude Code', category: 'AI', description: 'Primary AI assistant and coding tool' },
  { name: 'Astro', category: 'Development', description: 'Content-first web framework' },
  { name: 'Next.js', category: 'Development', description: 'Full-stack React framework' },
  { name: 'Tailwind CSS', category: 'Development', description: 'Utility-first CSS framework' },
  { name: 'Close CRM', category: 'CRM', description: 'Sales CRM for deal management and outbound' },
  { name: 'AppFolio', category: 'Property Management', description: 'Property management platform' },
  { name: 'GoHighLevel', category: 'Marketing', description: 'Marketing automation and funnels' },
  { name: 'Vercel', category: 'Hosting', description: 'Edge deployment platform' },
  { name: 'GitHub', category: 'Development', description: 'Version control and CI/CD' },
  { name: 'MCP Servers', category: 'AI', description: 'Model Context Protocol integrations' },
  { name: 'Google Analytics', category: 'Analytics', description: 'Web analytics and tracking' },
  { name: 'Docket', category: 'Operations', description: 'Dumpster rental management' },
];

export const toolCategories = [...new Set(tools.map(t => t.category))];
