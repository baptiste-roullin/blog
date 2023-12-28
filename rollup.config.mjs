import ts from "rollup-plugin-ts"; import { glob } from 'glob'
import outputManifestRawImport from "rollup-plugin-output-manifest"


import meta from './src/_data/meta.js'
/**
 * @type {import('rollup').RollupOptions}
 */
export default {

	output: {
		dir: "dist/assets",
		assetFileNames: '[name]-[hash][extname]',
		format: "esm"

	},
	input:
		[
			...glob.sync('src/assets/scripts/*'),
			'src/features/truchet/truchet_core.js',
			'src/features/truchet/truchet_dom.js',
			'src/filters/date_formatting.js',]
	,
	plugins: [ts({
		browserslist: false,
		tsconfig: {
			"module": "ESNext",
			"moduleResolution": "bundler",
			"allowSyntheticDefaultImports": true, /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
			"esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
		}
	}
	),
	//@ts-ignore
	outputManifestRawImport.default(
		{ publicPath: "/assets/" }
	),
	]

}