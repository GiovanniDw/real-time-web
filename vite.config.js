import { defineConfig, loadEnv, createLogger, searchForWorkspaceRoot } from 'vite';
import {fileURLToPath} from 'url';
import commonjs from '@rollup/plugin-commonjs';



export default defineConfig({
  appType: 'custom',
  base: "./",
  plugins: [commonjs()],
  optimizeDeps: {},
  publicDir: './public',
  build: {
    assetsDir: 'assets',
    outDir: 'docs',
    minify: false,
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: './public/index.html',
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
    devSourcemap: true
  },
  server: {
    port: 3000,
    origin: 'http://localhost:3000',
    proxy: {
      // Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
      '/socket.io': {
        target: 'http://localhost:3000',
        ws: false,
      },
    },
    hmr: true,
  },
  ssr: {
    target: "node"
  },
  hmr: {
    clientPort: 5173
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  }
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



// https://github.com/cssninjaStudio/unplugin-fonts FONTS