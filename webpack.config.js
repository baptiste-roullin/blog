import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

import WebpackAssetsManifest from 'webpack-assets-manifest'

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
		truchet: resolve(__dirname, 'src/truchet/truchet_core.js'),
		truchet_dom: resolve(__dirname, 'src/truchet/truchet_dom.js'),
		dateFormatting: resolve(__dirname, 'src/filters/dateFormatting.js'),
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
								dateFormatting: resolve(__dirname, 'src/filters/dateFormatting'),
								removeMD: resolve(__dirname, 'src/filters/removeMD'),
								markdownify: resolve(__dirname, 'src/filters/markdownify')

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
