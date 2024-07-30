// tsup.config.ts

import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    dts: true,
    format: ['esm', 'cjs'],
    clean: true,
    sourcemap: false,
})