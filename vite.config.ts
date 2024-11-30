import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
<<<<<<< HEAD
=======
import vueDevTools from 'vite-plugin-vue-devtools'
>>>>>>> f19012e78938dddb0823e8b02b54ff59ec9cb9aa

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
<<<<<<< HEAD
=======
    vueDevTools(),
>>>>>>> f19012e78938dddb0823e8b02b54ff59ec9cb9aa
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
<<<<<<< HEAD
    }
  }
=======
    },
  },
>>>>>>> f19012e78938dddb0823e8b02b54ff59ec9cb9aa
})
