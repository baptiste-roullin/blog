import * as postcss from 'postcss-import'
import * as tailwindcss from 'tailwindcss'
import * as nesting from 'tailwindcss/nesting'

tailwindcss({ config: './tailwind.config.js' })
import * as autoprefixer from 'autoprefixer'
import * as cssnano from 'cssnano'

import * as postcssHash from 'postcss-hash'


import meta from './src/_data/meta'



export default {
  plugins: [
    postcss,
    nesting,
    tailwindcss,
    autoprefixer,
    postcssHash,
    ...(meta.env === "production" ? [cssnano] : []),

  ]
}
