
//@todo : plus besoin de .eleventyignore en env de dev. https://www.11ty.dev/docs/ignores/#configuration-api


import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'
import yaml from "js-yaml"
import embedEverything from "eleventy-plugin-embed-everything"
import { EleventyRenderPlugin } from "@11ty/eleventy"

import meta from './src/_data/meta.js'
import findImg from './src/transforms/media_processing.js'

import { collections } from './src/collections.js'
import md from './src/markdown.js'

import pairedShortcodes from './src/shortcodes/pairedShortcodes.js'
import shortcodes from './src/shortcodes/shortcodes.js'
import filters from './src/filters/filters.js'


//import { Config, UserConfig } from './src/../types/eleventy'
//import("./src/../types/eleventy").Config()

export default async function conf(config) {
	config.setUseGitIgnore(false)

	config.ignores.add("/src/heroPages/portfolio/portfolioIntro.md")
	config.ignores.add("/src/features/zotero/zotero_component.njk")
	config.ignores.add("/src/features/zotero/zotero_component.njk")

	if (meta.env === "dev") {
		config.ignores.add("./src/posts/201*")
		config.ignores.add("./src/posts/2020*")
		config.ignores.add("./src/posts/2021*")
		config.ignores.add("./src/posts/2022*")
		config.ignores.add("./src/posts/2023*")
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
*/


	config.setServerPassthroughCopyBehavior("passthrough")

	config.addPassthroughCopy('src/robots.txt')
	config.addPassthroughCopy('src/assets/css/fonts')

	//On copie tels quels les média avec chemins relatifs ou absolus dans /dist, qu'ils puissent être lus par du balisage non-transformé (sans srcset)
	config.addPassthroughCopy('src/assets/UI')

	if (meta.pictures) {

		config.addPassthroughCopy('src/assets/docs/')
		config.addPassthroughCopy({ 'src/assets/images/*.svg': meta.assetsDir })
		config.addPassthroughCopy({ 'src/assets/images/*.mp4': meta.assetsDir })

		//config.addPassthroughCopy({ 'src/posts/**/* ': meta.assetsDir })
		//config.addPassthroughCopy('src/assets/images')

		config.addTransform(
			'img_transform',
			findImg
		)
	}
	//else {
	//	config.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': `./${meta.outputDir}/${meta.assetsDir}/` })
	//	config.addPassthroughCopy({ 'src/assets/images/*.{png,webp,gif,mp4,jpg,jpeg}': `./${meta.outputDir}/${meta.assetsDir}/` })
	//}

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
	//TODO : test si les shortcodes async continuent à marcher
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
