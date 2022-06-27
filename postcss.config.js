require('dotenv').config()

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss')({ config: './tailwind.config.js' }),
    require('autoprefixer'),
    ...process.env.NODE_ENV === "production" ? [require('cssnano')] : [],
    require('postcss-hash')({
      manifest: './src/_data/hashes_css.json',
    }),
  ]
};
