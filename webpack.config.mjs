import { resolve, dirname } from 'node:path'

import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
import CopyPlugin from "copy-webpack-plugin"
import WebpackAssetsManifest from 'webpack-assets-manifest'
import dotenv from 'dotenv'
dotenv.config()
import meta from './src/_data/meta.js'
//import * as webpack from 'webpack'

export default {

  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: {
    /*search_front: resolve(__dirname, 'src/assets/scripts/search_front.js'),*/
    contact: resolve(__dirname, 'src/assets/scripts/contact.js'),
    main: resolve(__dirname, 'src/assets/scripts/main.js'),
    picture_lightbox: resolve(__dirname, 'src/assets/scripts/picture_lightbox.js'),
    spin: resolve(__dirname, 'src/assets/scripts/spin.js'),
    nav: resolve(__dirname, 'src/assets/scripts/nav.js'),
    arrowPagination: resolve(__dirname, 'src/assets/scripts/arrow_pagination.js'),
    truchet: resolve(__dirname, 'src/features/truchet/truchet_core.ts'),
    truchet_dom: resolve(__dirname, 'src/features/truchet/truchet_dom.ts'),
    dateFormatting: resolve(__dirname, 'src/filters/date_formatting.ts'),
  },

  output: {
    path: resolve(__dirname, meta.outputDir + '/assets/scripts'),
    /*    détournement du publicpatch*/
    //publicPath: path.resolve(__dirname, 'src'),
    filename: () => (meta.env === "production" ? '[name].[contenthash].js' : '[name].js')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.front.json",
          transpileOnly: true
        }
      },
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
                dateHumanFormat: resolve('src/filters/date_formatting.ts'),
                removeMD: resolve('src/filters/remove_MD.ts')
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
