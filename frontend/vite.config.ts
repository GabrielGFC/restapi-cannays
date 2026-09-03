import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import path from 'node:path';

export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        AutoImport({
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
            dts: 'src/auto-imports.d.ts',
            eslintrc: { enabled: true },
        }),
        Components({
            dirs: ['src/components'],
            dts: 'src/components.d.ts',
            extensions: ['vue'],
            deep: true,
        }),
    ],
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    server: {
        host: true,
        port: 5173,
        allowedHosts: ['.trycloudflare.com'],
        watch: {
            usePolling: true,
            ignored: ['**/node_modules/**', '**/auto-imports.d.ts', '**/components.d.ts'],
        },
        proxy: {
            '/api': {
                target: process.env.VITE_API_URL || 'http://backend:5000',
                changeOrigin: true,
            },
        },
    },
});
