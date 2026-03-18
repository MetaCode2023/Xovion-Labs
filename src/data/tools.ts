export interface Tool {
  name: string;
  category: string;
  description: string;
  icon: string;
}

export const tools: Tool[] = [
  { name: "Claude", category: "AI", description: "Primary AI — code, content, strategy", icon: "🤖" },
  { name: "Claude Code", category: "AI", description: "AI-assisted development in the terminal", icon: "💻" },
  { name: "Close CRM", category: "CRM", description: "Pipeline management and SMS outreach", icon: "📊" },
  { name: "AppFolio", category: "Property Mgmt", description: "Property and tenant management", icon: "🏠" },
  { name: "GoHighLevel", category: "Automation", description: "Marketing automation and chatbots", icon: "⚡" },
  { name: "Astro", category: "Web Dev", description: "Framework for fast, content-first websites", icon: "🚀" },
  { name: "Tailwind CSS", category: "Web Dev", description: "Utility-first styling", icon: "🎨" },
  { name: "Vercel", category: "Hosting", description: "Edge deployment and instant deploys", icon: "▲" },
  { name: "Google Analytics", category: "Analytics", description: "Site performance and traffic data", icon: "📈" },
  { name: "Google Ads", category: "Marketing", description: "Paid search campaigns", icon: "🎯" },
  { name: "Resend", category: "Email", description: "Transactional email without the complexity", icon: "📧" },
  { name: "Cal.com", category: "Scheduling", description: "Booking and calendar management", icon: "📅" },
];
