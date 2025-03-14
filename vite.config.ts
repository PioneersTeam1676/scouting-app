import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import routify from '@roxi/routify/vite-plugin'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

const pwaManifest = {
  name: '1676 Scouting',
  short_name: 'Scouting',
  description: 'Team 1676 Scouting App',
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
  build: {
    // manifest: true,
  },
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
      includeAssets: ['favicon.svg', 'favicon.ico', 'favicon.png','robots.txt', 'assets/*'],
      manifest: pwaManifest,
      strategies: 'generateSW',
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      workbox: {
        runtimeCaching: [
          {
            urlPattern: (url) => url.url.origin === "https://cdn.jsdeliver.net",
            handler: 'CacheFirst',
            options: {
              cacheName: 'bootstrap-styles',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
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
