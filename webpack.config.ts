const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const WebpackAssetsManifest = require('webpack-assets-manifest');
require('dotenv').config()
import meta from './src/_data/meta'
import * as webpack from 'webpack';

const config: webpack.Configuration = {

  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: {
    search_front: path.resolve(__dirname, 'src/assets/scripts/search_front.js'),
    contact: path.resolve(__dirname, 'src/assets/scripts/contact.js'),
    main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
    picture_lightbox: path.resolve(__dirname, 'src/assets/scripts/picture_lightbox.ts'),
    spin: path.resolve(__dirname, 'src/assets/scripts/spin.ts'),
    nav: path.resolve(__dirname, 'src/assets/scripts/nav.ts'),
    arrowPagination: path.resolve(__dirname, 'src/assets/scripts/arrow_pagination.ts'),
    truchet: path.resolve(__dirname, 'src/features/truchet/truchet_core.ts'),
    truchet_dom: path.resolve(__dirname, 'src/features/truchet/truchet_dom.ts'),
    dateFormatting: path.resolve(__dirname, 'src/filters/date_formatting.ts'),
  },

  output: {
    path: path.resolve(__dirname, meta.outputDir + '/assets/scripts'),
    /*    détournement du publicpatch*/
    //publicPath: path.resolve(__dirname, 'src'),
    filename: () => (process.env.NODE_ENV === "production" ? '[name].[contenthash].js' : '[name].js')
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
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
      customize(entry, original, manifest, asset) {

        // l'otpion fileExtRegex devrait servir à ça, mais pas réussi à la faire marcher.
        if (!(entry.key.endsWith('.js'))) {
          return false;
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
          to({ context, absoluteFilename }) {
            return `${context}/assets/imagesToProcess/[name][ext]`;
          },
        },
        /*       {
                 from: "pages/portfolio/*.{png,webp,gif,mp4,jpg,jpeg}",
                 context: "src",
                 to({ context, absoluteFilename }) {
                   return `${context}/assets/imagesToProcess/[name][ext]`;
                 },
               },*/
        {
          from: "assets/images/*",
          context: "src",
          to({ context, absoluteFilename }) {
            return `${context}/assets/imagesToProcess/[name][ext]`;
          },
        },
        {
          from: "assets/UI/*",
          context: "src",
          to({ context, absoluteFilename }) {
            return `${context}/assets/imagesToProcess/[name][ext]`;
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