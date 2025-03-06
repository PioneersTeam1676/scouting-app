import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import routify from '@roxi/routify/vite-plugin'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const pwaManifest = {
  name: 'Ionic Svelte',
  short_name: 'A really cool app',
  description: 'Coolness in Vite Svelte and Ionic',
  theme_color: '#000000',
  icons: [
    {
      src: '/assets/img/great-success.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/assets/img/great-success.png',
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: '/assets/img/great-success.png',
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    }
  ]
}


/* 
  experimenting with webcomponents in svelte 
  great guide: 
    https://www.thisdot.co/blog/web-components-with-svelte
    https://dev.to/tnzk/svelte-for-web-components-development-pitfalls-and-workarounds-as-of-july-2021-3lii
*/
const svelteWebcomponentConfig = {
  include: ['./src/lib/*.svelte'],
  compilerOptions: {
    customElement: true,
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // @ts-ignore
    { config: () => ({ ssr: { noExternal: true } }) },

    routify({
      // @ts-ignore
      ssr: {
        spank: {
          sitemap: '.routify/sitemap.default.txt',
        },
      },
    }),
    VitePWA({
      manifest: pwaManifest,
      includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png', 'assets/*'],
      injectRegister: 'auto'
    }),

    svelte(),
  ],
  publicDir: "src/static",
  resolve: {
    alias: {
      $lib: resolve('./src/lib'),
      $components: resolve('./src/components'),
      $services: resolve('./src/services'),
      $routes: resolve('./src/routes'),
      $static: resolve('./src/static'),
      $ionic: resolve('./src/lib/ionic')
    }
  }
})
