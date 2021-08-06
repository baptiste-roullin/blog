const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const WebpackAssetsManifest = require('webpack-assets-manifest');
require('dotenv').config()

module.exports = {
  devServer: {
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: true,
      publicPath: false
    }
  },
  entry: {
    truchet: path.resolve(__dirname, 'src/truchet.js'),
    'truchet-dom': path.resolve(__dirname, 'src/assets/scripts/truchet-dom.js'),
    main: path.resolve(__dirname, 'src/assets/scripts/main.js'),
    search: path.resolve(__dirname, 'src/assets/scripts/search.ts'),
    richPicture: path.resolve(__dirname, 'src/assets/scripts/richPicture.js'),
  },


  output: {
    path: path.resolve(__dirname, 'dist/assets/scripts'),
    /*    détournement du publicpatch*/
    publicPath: path.resolve(__dirname, 'src'),
    filename: () => (process.env.NODE_ENV === "production" ? '[name].[contenthash].js' : '[name].js')
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: [
                'src/_templates/components',
                'src/_templates/utils'

              ], filters: {
                dateToFormat: path.resolve('src/utils/dateToFormat.js'),
                removeMD: path.resolve('src/utils/removeMD.js')

              }
            }
          }
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new WebpackAssetsManifest({
      output: '../../../src/_data/hashes_js.json'
    }),
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
