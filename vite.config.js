import { defineConfig, loadEnv, createLogger, searchForWorkspaceRoot } from 'vite';
import {fileURLToPath} from 'url';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';




export default defineConfig({
  appType: 'spa',
  base: "./",
  plugins: [],
  optimizeDeps: {exclude: ["fsevents"]},
  publicDir: '/public',
  css: {
    devSourcemap: true
  },
  server: {
    port: 3000,
    origin: 'http://127.0.0.1:3000',
    proxy: {
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'ws://localhost:5173',
        ws: true,
      },
    },
    hmr: true
  },
  preview: {
    port: 8080,
  },
  hmr: {
    clientPort: 5173
  },
  build: {
    outDir: 'docs',
    sourcemap: true,
    manifest: true,
    assetsDir: './public',
    ssrManifest: false,
    minify: false,
    input: "/index.html"
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
},({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
})

