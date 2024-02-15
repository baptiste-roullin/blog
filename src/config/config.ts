//@todo : plus besoin de .eleventyignore en env de dev. https://www.11ty.dev/docs/ignores/#configuration-api

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const yaml = require("js-yaml")
const embedEverything = require("eleventy-plugin-embed-everything")
const { EleventyRenderPlugin } = require("@11ty/eleventy")

const meta = require('../_data/meta')
import img_transform from '../transforms/processing_media'
import { collections } from './collections'
import { md } from './markdown'

import { pairedShortcodes } from '../shortcodes/pairedShortcodes'
import { asyncShortcodes } from '../shortcodes/asyncShortcodes'
import { shortcodes } from '../shortcodes/shortcodes'
import { filters } from '../filters/filters'

import { Config, UserConfig } from '../../types/eleventy'


module.exports = function conf(config: Config): UserConfig {

	config.ignores.add("./src/heroPages/portfolio/portfolioIntro.md")
	config.ignores.add("./src/features/zotero/zotero_component.njk")


	if (meta.twitterThread) {
		config.ignores.add("./src/nav_entry_threader.njk")
	}
	else {
		config.ignores.add("./src/heroPages/threads/*")
	}


	/**
	* Custom Watch Targets
	* for when the Tailwind config or .css files change...
	* by default not watched by 11ty
	*/
	config.addWatchTarget('./src/assets/scripts/')
	config.addWatchTarget('./src/**/*.js')
	config.addWatchTarget('./tailwind.config.js')
	config.setWatchThrottleWaitTime(200)
	config.setWatchJavaScriptDependencies(true)



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

	if (meta.pictures) {
		config.addPassthroughCopy('src/assets/docs/')
		config.addPassthroughCopy({ 'src/heroPages/portfolio/*': meta.assetsDir })
		config.addPassthroughCopy({ 'src/assets/images/*.svg': meta.assetsDir })

		config.addTransform(
			'img_transform',
			img_transform
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
	config.addLayoutAlias('heroPage', 'layouts/heroPage.njk')

	/**
	 * Plugins
	 */
	config.addPlugin(pluginNavigation)
	config.addPlugin(embedEverything, {
		use: ['vimeo', 'youtube', 'twitter'], twitter: { options: { align: 'center' } }
	})
	config.addPlugin(pluginRss)
	config.addPlugin(EleventyRenderPlugin)


	/**
	 * Filters
	 */

	Object.keys(filters).forEach((filterName) => {
		config.addFilter(filterName, filters[filterName])
	})



	/**
	 * Shortcodes
	 */
	Object.keys(shortcodes).forEach((shortcodeName) => {
		config.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	/**
	 * Paired Shortcodes
	 */
	Object.keys(pairedShortcodes).forEach((shortcodeName) => {
		config.addPairedShortcode(shortcodeName, pairedShortcodes[shortcodeName]
		)
	})

	/**
	 * Add async shortcodes
	 */
	Object.keys(asyncShortcodes).forEach((shortcodeName) => {
		config.addNunjucksAsyncShortcode(shortcodeName, asyncShortcodes[shortcodeName])
	})


	/**
	MARKDOWN
	*/
	config.addDataExtension("yaml", contents => yaml.load(contents))

	config.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_alias: 'description',
		//Si <!-- excerpt --> est présent, sa valeur remplit le tag description, pas page.description.
		excerpt_separator: "<!-- excerpt -->"
	})

	config.setLibrary('md', md)



	/**
 * Collections
 * ============================

 */

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
		markdownTemplateEngine: 'njk'
	}
}
