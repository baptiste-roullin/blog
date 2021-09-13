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
  resolve: {
    extensions: ['.ts', '.js'],
  },
  entry: {
    truchet: path.resolve(__dirname, 'src/features/truchet/truchet-core.ts'),
    'truchet-dom': path.resolve(__dirname, 'src/features/truchet/truchet-dom.ts'),
    main: path.resolve(__dirname, 'src/assets/scripts/main.ts'),
    search: path.resolve(__dirname, 'src/assets/scripts/search.js'),
    richPicture: path.resolve(__dirname, 'src/assets/scripts/richPicture.js'),
    spin: path.resolve(__dirname, 'src/assets/scripts/spin.ts'),
    nav: path.resolve(__dirname, 'src/assets/scripts/nav.ts'),
    arrowWidth: path.resolve(__dirname, 'src/assets/scripts/arrowWidth.js'),

  },


  output: {
    path: path.resolve(__dirname, 'dist/assets/scripts'),
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
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: [
                'src/_templates/components',
                'src/_templates/utils'

              ], filters: {
                dateToFormat: path.resolve('src/filters/dateToFormat.js'),
                removeMD: path.resolve('src/filters/removeMD.js')

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
