
//@todo : plus besoin de .eleventyignore en env de dev. https://www.11ty.dev/docs/ignores/#configuration-api

import { parseHTML } from 'linkedom'

import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'
import yaml from "js-yaml"
import embedEverything from "eleventy-plugin-embed-everything"
import { EleventyRenderPlugin } from "@11ty/eleventy"

import meta from './src/_data/meta.js'
import { findImg, findImgInDevEnv } from './src/transforms/media_processing.js'

import { collections } from './src/collections.js'
import md from './src/markdown.js'
import fsp from 'node:fs/promises'
import pairedShortcodes from './src/shortcodes/pairedShortcodes.js'
import shortcodes from './src/shortcodes/shortcodes.js'
import filters from './src/filters/filters.js'
import path from 'node:path'
import fileExists from './src/utils/fileExists.js'


export default async function (config) {
	config.setUseGitIgnore(false)

	config.ignores.add("/src/heroPages/portfolio/portfolioIntro.md")
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

	// doesn't work with {source: dest} copy pattern.
	config.setServerPassthroughCopyBehavior("passthrough")

	config.addPassthroughCopy('src/robots.txt')
	config.addPassthroughCopy('src/assets/css/fonts')

	//On copie tels quels les média avec chemins relatifs ou absolus dans /dist, qu'ils puissent être lus par du balisage non-transformé (sans srcset)
	config.addPassthroughCopy('src/assets/UI')

	const imagePath = `${process.cwd()}/${meta.outputDir}/${meta.assetsDir}/`
	if (!(await fileExists(imagePath))) {
		await fsp.mkdir(imagePath, { recursive: true })
	}

	if (meta.env === "production") {

		config.addPassthroughCopy('src/assets/docs/')
		config.addPassthroughCopy({ 'src/assets/images/*.svg': meta.assetsDir })
		config.addPassthroughCopy({ 'src/assets/images/*.mp4': meta.assetsDir })

		//config.addPassthroughCopy({ 'src/posts/**/* ': meta.assetsDir })
		//config.addPassthroughCopy('src/assets/images')

		config.addTransform('img_transform', findImg)
	}
	else {

		config.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': `/${meta.assetsDir}/` })
		config.addPassthroughCopy({ 'src/assets/images/*.{png,webp,gif,mp4,jpg,jpeg}': `/${meta.assetsDir}/` })
		config.addTransform('findImgInDevEnv', findImgInDevEnv)
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
	/*	config.addPlugin(embedEverything, {
			use: ['twitter', 'youtube'],
			twitter: {
				options: { align: 'center' },
				youtube: {
					options: {
						lite: true
					}
				}
			}
		})*/
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
		templateFormats: ['html', 'njk', 'md'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk'
	}
}
