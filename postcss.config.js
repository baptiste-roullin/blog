const meta = require('./src/_data/meta')

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss')({ config: './tailwind.config.js' }),
    require('autoprefixer'),
    ...(meta.env === "production" ? [require('cssnano')] : []),
    require('postcss-hash')({
      manifest: './src/_data/hashes_css.json',
    }),
  ]
}
