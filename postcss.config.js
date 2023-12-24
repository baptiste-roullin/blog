/*import * as autoprefixer from 'autoprefixer'
import * as cssnano from 'cssnano'

import * as postcssHash from 'postcss-hash'
*/

//import meta from './src/_data/meta.js'


//const nano = (meta.env === "production" ?  : ""),



export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: { config: './tailwind.config.js' },
    "autoprefixer": {},
    //    "postcss-hash": {},
    "cssnano": {}
  }
}
