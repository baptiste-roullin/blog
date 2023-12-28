//TODO migrate to rollup
// TODO : use https://github.com/azerella/rollup-plugin-manifest-json
import vitePluginRequire from "vite-plugin-require"
import { glob } from 'glob'
import { defineConfig } from 'vite'
import meta from './src/_data/meta.js'

console.log(...glob.sync('src/assets/scripts/*'))
export default defineConfig({
	plugins: [
		vitePluginRequire(),
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