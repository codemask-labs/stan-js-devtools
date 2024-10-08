// tsup.config.ts
import { readFile, writeFile } from 'fs/promises'

import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts', 'src/expo/index.ts'],
    outDir: 'build',
    dts: true,
    format: ['esm', 'cjs'],
    clean: true,
    sourcemap: false,
    onSuccess: async () => {
        const mjs = await readFile('build/index.js', 'utf8')
        const mjsLines = mjs.split('\n')
        const mjsInjected = ['"use client";\n']?.concat(mjsLines.at(0)!, 'import \'./index.css\';', mjsLines.slice(1)).join('\n')

        await writeFile('build/index.js', mjsInjected)

        const cjs = await readFile('build/index.cjs', 'utf8')
        const cjsLines = cjs.split('\n')
        const cjsInjected = ['"use client";\n']?.concat(cjsLines.at(0)!, 'require(\'./index.css\');', cjsLines.slice(1)).join('\n')

        await writeFile('build/index.cjs', cjsInjected)

        console.log('⚡️ Injected CSS into bundles ⚡️')
    },
})
