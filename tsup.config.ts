// tsup.config.ts
import { readFile, writeFile } from 'fs/promises'

import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts', 'src/rn/index.ts'],
    dts: true,
    format: ['esm', 'cjs'],
    clean: true,
    sourcemap: false,
    onSuccess: async () => {
        const mjs = await readFile('dist/index.js', 'utf8')
        const mjsLines = mjs.split('\n')
        const mjsInjected = [mjsLines.at(0)]?.concat('import \'./index.css\';', mjsLines.slice(1)).join('\n')

        await writeFile('dist/index.js', mjsInjected)

        const cjs = await readFile('dist/index.cjs', 'utf8')
        const cjsLines = cjs.split('\n')
        const cjsInjected = [cjsLines.at(0)]?.concat('require(\'./index.css\');', cjsLines.slice(1)).join('\n')

        await writeFile('dist/index.cjs', cjsInjected)

        console.log('⚡️ Injected CSS into bundles ⚡️')
    },
})
