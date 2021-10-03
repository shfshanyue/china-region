import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './index.ts',
  plugins: [
    typescript({
      module: "ESNEXT"
    }),
    json()
  ],
  output: [
    {
      file: 'dist/index.js',
      name: "cn",
      format: 'umd',
      sourcemap: true,
    },
    {
      file: `dist/index.mjs`,
      format: 'es',
      sourcemap: true,
    },
  ],
}