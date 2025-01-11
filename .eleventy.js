
//TODO : plus besoin de .eleventyignore en env de dev. https://www.11ty.dev/docs/ignores/#configuration-api

import fsp from 'node:fs/promises'

import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'
import { EleventyHtmlBasePlugin } from "@11ty/eleventy"
import yaml from "js-yaml"
import glob from "fast-glob"

import meta from './src/_data/meta.js'
import { findImg, findImgInDevEnv } from './src/transforms/media_processing.js'
import { collections } from './src/collections.js'
import zotero from './src/features/zotero/zoteroShortcode.js'
import { truchetItem, truchetList } from './src/features/truchet/truchet_shortcode.js'
import md from './src/markdown.js'
import fileExists from './src/utils/fileExists.js'


import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))


/** @param {import("@11ty/eleventy").UserConfig} config */

export default async function (config) {
	config.setUseGitIgnore(false)

	config.ignores?.add("/src/heroPages/portfolio/portfolioIntro.md")
	config.ignores?.add("/src/features/zotero/zotero_component.njk")

	if (meta.env === "dev") {
		config.ignores?.add("./src/posts/201*")
		config.ignores?.add("./src/posts/2020*")
		config.ignores?.add("./src/posts/2021*")
		config.ignores?.add("./src/posts/2022*")
		config.ignores?.add("./src/posts/2023*")
	}


	/**
	* Custom Watch Targets
	* for when the Tailwind config or .css files change...
	* by default not watched by 11ty
	*/
	config.addWatchTarget('./src/assets/scripts/')
	config.addWatchTarget('./src/**/*.js')
	config.addWatchTarget('./tailwind.config.js')
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

		config.addTransform('findImg', findImg)
	}
	else {
		config.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': `/${meta.assetsDir}/` })
		config.addPassthroughCopy('src/assets/images/')
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
	config.addPlugin(await config.resolvePlugin("@11ty/eleventy/render-plugin"))
	config.addPlugin(EleventyHtmlBasePlugin)

	/**
	 * Filters
	 */

	let files = await glob.async(resolve(__dirname, 'src/filters/*.js'))

	await Promise.all(files.map(async (file) => {

		const { default: func } = await import(file)
		config.addFilter(func.name, func)
	}))


	/**
	 * Shortcodes
	 */


	files = await glob.async(resolve(__dirname, 'src/shortcodes/*.js'))

	await Promise.all(files.map(async (file) => {
		const shortcodes = await import(file)

		for (const [name, filter] of Object.entries(shortcodes)) {
			config.addShortcode(name, filter)
		}
		config.addShortcode("zotero", zotero)
		config.addShortcode("truchetItem", truchetItem)
		config.addShortcode("truchetList", truchetList)

	}))

	/**
	 * Paired Shortcodes
	 */


	files = await glob.async(resolve(__dirname, 'src/pairedShortcodes/*.js'))

	await Promise.all(files.map(async (file) => {
		const pairedShortcodes = await import(file)

		for (const [name, filter] of Object.entries(pairedShortcodes)) {
			console.log(name)

			config.addPairedShortcode(name, filter)
		}
	}))


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
