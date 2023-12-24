import { resolve } from 'path'
import { defineConfig } from 'vite'
import nunjucks from 'vite-plugin-nunjucks'
import date from './src/filters/date_formatting.js'
import removeMD from './src/filters/remove_MD.js'
import meta from './src/_data/meta.js'

import { glob } from 'glob'

export default defineConfig({
	plugins: [
		nunjucks({
			nunjucksEnvironment: {
				filters: {
					dateHumanFormat: date,
					removeMD: removeMD
				}
			}
		}),
	],
	server: {
		origin: 'http://127.0.0.1:8080',
	},
	build: {
		watch: (meta.env === "production" ? {} : null),
		minify: (meta.env === "production" ? true : false),
		manifest: true,
		rollupOptions: {
			output: {
				dir: "dist",
				assetFileNames: '[name]-[hash][extname]'

			},
			input:
				[
					...glob.sync('src/assets/scripts/*'),
					'src/features/truchet/truchet_core.js',
					'src/features/truchet/truchet_dom.js',
					'src/filters/date_formatting.js',]
			,
		},
	},
})