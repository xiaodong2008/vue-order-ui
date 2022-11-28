import vue from '@vitejs/plugin-vue'
import {viteRequire} from 'vite-require'

export default {
  "plugins": [
    vue(),
    viteRequire({ fileRegex: /(.js|.ts|.vue)$/ })
  ],
  "base": "./",
  "build": {
    "outDir": "./fastjs_build_temp/"
  },
  "css": {
    "preprocessorOptions": {
      "less": {
        "javascriptEnabled": true
      }
    }
  }
}