import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {splitVendorChunkPlugin} from 'vite';
import fs from 'fs';
import {VitePWA} from 'vite-plugin-pwa';

const definitionHash = fs.readFileSync('public/definitions/hash.json', 'utf8');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "VIA",
        short_name: "VIA",
        description: "Your keyboard's best friend",
        icons: [
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png"
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        start_url: "index.html",
        display: "standalone",
        theme_color: "#1f1e1e",
        background_color: "#1f1e1e"
      },
      includeAssets: ['definitions/**'],
      devOptions: {
        enabled: true,
      },
    }),
  ],
  define: {
    '__DEFINITION_HASH__': definitionHash,
  },
  assetsInclude: ['**/*.glb'],
  envDir: '.',
  server: {open: true},
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      assets: path.resolve(__dirname, './src/assets'),
    },
  },
  optimizeDeps: {
    include: ['@the-via/reader'],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [],
    },
  },
});
