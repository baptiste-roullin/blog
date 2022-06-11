import { Config, UserConfig, } from '../../types/eleventy';

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const yaml = require("js-yaml");
require('dotenv').config()
const embedEverything = require("eleventy-plugin-embed-everything");
const { EleventyRenderPlugin } = require("@11ty/eleventy");

const meta = require('../_data/meta.js');
import picturesProcessing from '../transforms/pictures_processing'


module.exports = function (config: Config): UserConfig {
	/**
 * Custom Watch Targets
 * for when the Tailwind config or .css files change...
 * by default not watched by 11ty
 */
	config.addWatchTarget('./src/assets/css/')
	config.addWatchTarget('./src/assets/scripts/')
	config.addWatchTarget('./src/*.js')
	config.addWatchTarget('./tailwind.config.js')
	config.setWatchThrottleWaitTime(200);

	config.setWatchJavaScriptDependencies(true);



	/**
 * Passthrough File Copy

cf. webpack.configs.js pour le JS
cf. postcss.config.js pour le CSS

*/

	//On copie tels quels les média avec chemins relatifs ou absolus dans /dist, qu'ils puissent être lus par du balisage non-transformé (sans srcset ou gif -> vidéo)


	config.addPassthroughCopy('src/robots.txt')
	config.addPassthroughCopy('src/assets/css/fonts')
	config.addPassthroughCopy('src/assets/UI')

	config.setUseGitIgnore(false)

	if (process.env.NODE_ENV === "production") {
		config.addPassthroughCopy('src/assets/docs/')

		config.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': meta.assetsDir })
		config.addPassthroughCopy('src/assets/images')

		config.addTransform(
			'picturesProcessing',
			(content, outputPath) => {
				if (outputPath && outputPath.endsWith('.html')) {
					return picturesProcessing(content);
				}
				return content;
			}
		)
	}
	else {
		//config.addPassthroughCopy('src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}')
		//config.addPassthroughCopy('src/assets/images/*.{png,webp,gif,mp4,jpg,jpeg}')
	}



	/**
	 * Add layout aliases
	 */
	config.addLayoutAlias('base', 'layouts/base.njk')
	config.addLayoutAlias('page', 'layouts/page.njk')
	config.addLayoutAlias('post', 'layouts/post.njk')


	/**
	 * Plugins
	 */
	config.addPlugin(pluginNavigation)
	config.addPlugin(embedEverything, {
		use: ['vimeo', 'youtube', 'twitter'], twitter: { options: { align: 'center' } }
	});
	config.addPlugin(pluginRss)
	config.addPlugin(EleventyRenderPlugin);


	/**
	 * Filters
	 */
	const filters = require('../filters/filters.ts')

	Object.keys(filters).forEach((filterName) => {
		config.addFilter(filterName, filters[filterName])
	})



	/**
	 * Shortcodes
	 */
	const shortcodes = require('../shortcodes/shortcodes.js')

	Object.keys(shortcodes).forEach((shortcodeName) => {
		config.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	/**
	 * Paired Shortcodes
	 */
	const pairedshortcodes = require('../shortcodes/pairedShortcodes.js')
	Object.keys(pairedshortcodes).forEach((shortcodeName) => {
		config.addPairedShortcode(shortcodeName, pairedshortcodes[shortcodeName]
		)
	})

	/**
	 * Add async shortcodes
	 *
	 */
	const asyncShortcodes = require('../shortcodes/asyncShortcodes.js')
	Object.keys(asyncShortcodes).forEach((shortcodeName) => {
		config.addNunjucksAsyncShortcode(shortcodeName, asyncShortcodes[shortcodeName])
	})


	/**
	MARKDOWN
	*/
	config.addDataExtension("yaml", contents => yaml.load(contents));

	config.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_alias: 'description',
		//Si <!-- excerpt --> est présent, sa valeur remplit le tag description, pas page.description.
		excerpt_separator: "<!-- excerpt -->"
	});

	config.setLibrary('md', require('./markdown.js'));



	/**
 * Collections
 * ============================

 */
	const collections = require('./collections.ts')

	Object.keys(collections).forEach((colName) => {
		config.addCollection(colName, collections[colName])
	})


	return {
		dir: {
			input: 'src',
			output: meta.outputDir,
			includes: '_templates',
			data: '_data',
		},
		passthroughFileCopy: true,
		templateFormats: ['html', 'njk', 'md'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	}
}
