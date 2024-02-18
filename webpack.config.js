import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import WebpackAssetsManifest from 'webpack-assets-manifest'
import dotenv from 'dotenv'
dotenv.config()

import meta from './src/_data/meta.js'

export default {

	entry: {
		search_front: resolve(__dirname, 'src/assets/scripts/search_front.js'),
		contact: resolve(__dirname, 'src/assets/scripts/contact.js'),
		main: resolve(__dirname, 'src/assets/scripts/main.js'),
		picture_lightbox: resolve(__dirname, 'src/assets/scripts/picture_lightbox.js'),
		spin: resolve(__dirname, 'src/assets/scripts/spin.js'),
		nav: resolve(__dirname, 'src/assets/scripts/nav.js'),
		arrowPagination: resolve(__dirname, 'src/assets/scripts/arrow_pagination.js'),
		truchet: resolve(__dirname, 'src/features/truchet/truchet_core.js'),
		truchet_dom: resolve(__dirname, 'src/features/truchet/truchet_dom.js'),
		dateFormatting: resolve(__dirname, 'src/filters/date_formatting.js'),
	},

	output: {
		path: resolve(__dirname, meta.outputDir + '/assets/scripts'),

		filename: () => (meta.env === "production" ? '[name].[contenthash].js' : '[name].js')
	},
	module: {
		rules: [
			{
				test: /\.njk$/,
				use: [
					{
						loader: 'simple-nunjucks-loader',
						options: {
							searchPaths: [
								'src/_templates/components',
							], filters: {
								// Don't put file extensions.
								dateHumanFormat: resolve('src/filters/date_formatting'),
								removeMD: resolve('src/filters/remove_MD'),
								markdownify: resolve('src/filters/markdownify')

							}
						}
					}
				]
			},
		],
	},
	plugins: [
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
	],
}
