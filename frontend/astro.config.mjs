import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],

  build: {
    inlineStylesheets: 'auto'
  },

  adapter: node({
    mode: 'standalone'
  })
});