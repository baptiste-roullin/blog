//TODO : refaire marcher
//import * as cssnano from 'cssnano'

//import meta from './src/_data/meta.js'

//const nano = (meta.env === "production" ?  : ""),



export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: { config: './tailwind.config.js' },
    "autoprefixer": {},
    //TODO : refaire marcher
    //    "postcss-hash": {},
    "cssnano": {}
  }
}
