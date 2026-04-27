import path from 'node:path'

const config = {
  plugins: {
    [path.join(process.cwd(), 'postcss-ensure-from.cjs')]: {},
    '@tailwindcss/postcss': {},
  },
}

export default config
