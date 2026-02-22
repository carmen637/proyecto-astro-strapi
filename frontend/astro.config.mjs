import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'http://arcanalibros.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind(), sitemap()],
  build: {
    inlineStylesheets: 'auto'
  }
});