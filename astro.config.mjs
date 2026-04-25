import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://xovionlabs.com',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/blog/building-with-claude-code'),
      serialize(item) {
        // Give key pages higher priority
        if (item.url === 'https://xovionlabs.com/') {
          return { ...item, priority: 1.0, changefreq: 'weekly' };
        }
        if (item.url === 'https://xovionlabs.com/services') {
          return { ...item, priority: 0.9, changefreq: 'weekly' };
        }
        if (item.url === 'https://xovionlabs.com/contact') {
          return { ...item, priority: 0.9, changefreq: 'monthly' };
        }
        if (item.url === 'https://xovionlabs.com/about') {
          return { ...item, priority: 0.8, changefreq: 'monthly' };
        }
        if (item.url.startsWith('https://xovionlabs.com/blog')) {
          return { ...item, priority: 0.6, changefreq: 'monthly' };
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static',
  adapter: cloudflare(),
});
