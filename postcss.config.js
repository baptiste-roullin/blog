

import meta from './src/_data/meta.js'

export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: { config: './tailwind.config.js' },
    "autoprefixer": {},
    "postcss-hash": {
      manifest: "./src/_data/hashes_css.json",
      /*name: function ({ dir, name, hash, ext }) { return path.join(dir, name + '.' + hash + ext) }*/
    },
    "cssnano": (meta.env === "production" ? {} : false)
  }
}
