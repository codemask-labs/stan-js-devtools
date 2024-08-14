import react from '@vitejs/plugin-react'
import fs from 'fs/promises'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        {
            name: 'postbuild-commands',
            transformIndexHtml: html => {
                return html.replace(`type="module" crossorigin`, 'defer').replace('crossorigin ', '')
            },
            closeBundle: async () => {
                try {
                    await fs.copyFile('../build/index.css', '../dist/index.css')
                } catch {
                    console.log('Could not copy CSS file')
                }
            },
        },
    ],
    base: '/_expo/plugins/stan-js-devtools',
    build: {
        minify: false,
        outDir: '../dist',
    },
})
