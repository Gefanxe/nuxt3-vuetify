// https://nuxt.com/docs/api/configuration/nuxt-config

// 引入 vuetify 和 transformAssetUrls
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  // 設置兼容性日期
  compatibilityDate: '2024-11-01',
  // 禁用開發工具
  devtools: { enabled: false },
  // 禁用服務端渲染
  ssr: false,
  build: {
    // 編譯時轉譯 vuetify
    transpile: ['vuetify']
  },
  modules: [
    // 配置 vuetify 插件
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error: vuetify plugin type mismatch
        config.plugins.push(vuetify({ autoImport: true }));
      });
    }
    // ...
  ],
  vite: {
    vue: {
      template: {
        // 配置模板資源轉換
        transformAssetUrls
      }
    }
  },
  typescript: {
    // 禁用 TypeScript 插樁
    shim: false
  },
  // 啟用源映射
  sourcemap: true,
  nitro: {
    prerender: {
      // 設置預渲染併發數(npm run build / npm run generate 變快)
      concurrency: 12
    }
  }
});
