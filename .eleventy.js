
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'

import yaml from "js-yaml"
import glob from "fast-glob"

import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'
import EleventyHtmlBasePlugin from "./node_modules/@11ty/eleventy/src/Plugins/HtmlBasePlugin.js"
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img"

import meta from './src/_data/meta.js'
import { collections } from './src/collections.js'
import zotero from './src/shortcodes/zoteroShortcode.js'
import { truchetItem, truchetList } from './src/truchet/truchet_shortcode.js'
import md from './src/markdown.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @param {import("@11ty/eleventy").UserConfig} config */
export default async function (config) {
	config.setUseGitIgnore(false)

	config.ignores?.add("./src/portfolio/portfolioIntro.md")
	config.ignores?.add("./src/shortcodes/zotero_component.njk")

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
	config.addPassthroughCopy('src/assets/UI')
	config.addPassthroughCopy('src/assets/docs')


	/*	const imagePath = `${process.cwd()}/${meta.outputDir}/${meta.assetsDir}/`
		if (!(await fileExists(imagePath))) {
			await fsp.mkdir(imagePath, { recursive: true })
		}*/

	const formats = (meta.env === "production"
		? ["webp", "jpg"]
		: ["webp"]
	)
	try {
		config.addPlugin(eleventyImageTransformPlugin, {
			extensions: "html",
			formats: ["webp"],
			sharpOptions: {
				animated: true,
			},
			failOnError: false,
			widths: [400, 800, 1200, 1920, "auto"],
			useCache: "true",
			htmlOptions: {
				imgAttributes: {
					loading: "lazy",
					decoding: "async",
					sizes: "(max-width: 60rem) 90vw, 60rem",
				}
			},
		})

	} catch (error) {
		console.log(error)

	}
	config.addPassthroughCopy('src/assets/docs/')
	config.addPassthroughCopy('src/assets/UI')
	if (meta.env === "production") {
		//config.addPassthroughCopy({ 'src/img/*.svg': meta.assetsDir })
		//config.addPassthroughCopy({ 'src/img/*.mp4': meta.assetsDir })
		//config.addPassthroughCopy("**/*.{png,webp,gif,mp4,jpg,jpeg}", {
		//		mode: "html-relative",
		//		paths: [], // additional fallback directories to look for source files
		//		failOnError: true, // throw an error when a path matches (via `match`) but not found on file system
		//		copyOptions: { dot: false }, // `recursive-copy` copy options
		//	})


		//config.addPassthroughCopy({ 'src/posts/**/* ': meta.assetsDir })
		//config.addPassthroughCopy('src/img')

		//	config.addTransform('findImg', findImg)
	}
	else {
		//config.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': `/${meta.assetsDir}/` })
		//	config.addPassthroughCopy('src/img/')
		//	config.addTransform('findImgInDevEnv', findImgInDevEnv)
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
	 * paired Shortcodes
	 */
	files = await glob.async(resolve(__dirname, 'src/pairedShortcodes/*.js'))

	await Promise.all(files.map(async (file) => {
		const pairedShortcodes = await import(file)
		for (const [name, filter] of Object.entries(pairedShortcodes)) {
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
