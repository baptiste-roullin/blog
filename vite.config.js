//TODO migrate to rollup
// TODO : use https://github.com/azerella/rollup-plugin-manifest-json

import { glob } from 'glob'
import { defineConfig } from 'vite'
import nunjucks from 'vite-plugin-nunjucks'
import date from './src/filters/date_formatting.js'
import removeMD from './src/filters/remove_MD.js'
import meta from './src/_data/meta.js'

export default defineConfig({
	plugins: [
		nunjucks({
			variables: { 'src/_templates/components/posts_list_item.njk': {} },
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
	root: ".",
	build: {
		emptyOutDir: false,
		watch: (meta.env === "production" ? {} : null),
		minify: (meta.env === "production" ? true : false),
		manifest: true,
		outDir: "outDir",
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