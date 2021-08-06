const path = require('path')

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
		truchet: path.resolve(__dirname, '../../truchet.ts'),
		'truchet-dom': path.resolve(__dirname, './truchet-dom.ts'),
		main: path.resolve(__dirname, './main.ts'),
		search: path.resolve(__dirname, './search.ts'),
		richPicture: path.resolve(__dirname, './richPicture.ts'),
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
			/*  {
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
				  loader: 'babel-loader',
				},
			  },*/
		],
	},
	plugins: [


	],
}
