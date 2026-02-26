/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'arcana-primary': '#0B0F2A',
        'arcana-secondary': '#050814',
        'arcana-surface': '#111827',
        'arcana-accent': '#FACC15',
        'arcana-accent-hover': '#D4AF37',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      borderRadius: {
        'arcana': '12px',
      }
    },
  },
  plugins: [],
}