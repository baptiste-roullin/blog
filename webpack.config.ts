const path = require('path')
const CopyPlugin = require("copy-webpack-plugin")
const WebpackAssetsManifest = require('webpack-assets-manifest')
require('dotenv').config()
const meta = require('./src/_data/meta.js')
import * as webpack from 'webpack'

const config: webpack.Configuration = {


  module: {
    rules: [



      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
/*       TODO :  https://github.com/Jax-p/vite-plugin-nunjucks
*/        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: [
                'src/_templates/components',
              ], filters: {
                dateHumanFormat: path.resolve('src/filters/date_formatting.ts'),
                removeMD: path.resolve('src/filters/remove_MD.ts')
              }
            }
          }
        ]
      },
    ],
  },
  plugins: [
    /* TODO : https://github.com/trendyminds/rollup-plugin-hashed-mapping?utm_source=pocket_mylist */
    new WebpackAssetsManifest({
      customize(entry) {

        // l'otpion fileExtRegex devrait servir à ça, mais pas réussi à la faire marcher.
        if (!(entry.key.endsWith('.js'))) {
          return false
        }
        return entry
      },
      output: '../../../src/_data/hashes_js.json'
    }),
    /* TODO https://www.npmjs.com/package/copyfiles */
    new CopyPlugin({
      patterns: [
        //On copie média avec chemins relatifs ou absolus dans un dossier unique intermédiaire, que les scripts puissent processer
        {
          from: "posts/**/*.{png,webp,gif,mp4,jpg,jpeg}",
          context: "src",
          to({ context }) {
            return `${context}/assets/imagesToProcess/[name][ext]`
          },
        },
        /*       {
                 from: "pages/portfolio/*.{png,webp,gif,mp4,jpg,jpeg}",
                 context: "src",
                 to({ context }) {
                   return `${context}/assets/imagesToProcess/[name][ext]`;
                 },
               },*/
        {
          from: "assets/images/*",
          context: "src",
          to({ context }) {
            return `${context}/assets/imagesToProcess/[name][ext]`
          },
        },
        {
          from: "assets/UI/*",
          context: "src",
          to({ context }) {
            return `${context}/assets/imagesToProcess/[name][ext]`
          },
        },
      ],
      options: {
        concurrency: 100,
      },
    })

  ],
}
export default config