
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'url'
import fsp from 'node:fs/promises'
import { readdir } from 'node:fs/promises'

import YAML from "yaml"

import type UserConfig from '@11ty/eleventy/UserConfig'
import pluginRss from '@11ty/eleventy-plugin-rss'
import pluginNavigation from '@11ty/eleventy-navigation'
import { HtmlBasePlugin } from '@11ty/eleventy'
import { eleventyImageTransformPlugin } from '@11ty/eleventy-img'
import dirOutputPlugin from '@11ty/eleventy-plugin-directory-output'
import { RenderPlugin } from '@11ty/eleventy'

import meta from './src/_data/meta.ts'
import { collections } from './src/collections.ts'
import md from './src/markdown.ts'
import fileExists from './src/utils/fileExists.ts'

export default async function (config: UserConfig) {
	config.setUseGitIgnore(false)
	config.addExtension("11ty.ts", {
		key: "11ty.js",
	})
	config.setQuietMode(true)
	config.addPlugin(dirOutputPlugin)
	config.ignores?.add("./src/portfolio/portfolioIntro.md")

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
	config.addWatchTarget('./src/**/*.ts')

	config.setWatchJavaScriptDependencies(true)



	/**
 * Passthrough File Copy
*/

	// doesn't work with {source: dest} copy pattern.
	config.setServerPassthroughCopyBehavior("passthrough")

	config.addPassthroughCopy('src/robots.txt')
	config.addPassthroughCopy('src/assets/css/fonts')
	config.addPassthroughCopy('src/assets/css/prism.css')
	config.addPassthroughCopy('src/assets/UI')
	config.addPassthroughCopy('src/assets/docs')


	/*	const imagePath = `${process.cwd()}/${meta.outputDir}/${meta.assetsDir}/`
		if (!(await fileExists(imagePath))) {
			await fsp.mkdir(imagePath, { recursive: true })
		}*/

	const imagePath = `${process.cwd()}/${meta.outputDir}/${meta.assetsDir}/`
	if (!(await fileExists(imagePath))) {
		await fsp.mkdir(imagePath, { recursive: true })
	}
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
	config.addPlugin(RenderPlugin)
	config.addPlugin(HtmlBasePlugin)

	/**
	 * Filters
	 */
	let filterPath = './src/filters'
	let filtersFiles = await readdir(filterPath)


	await Promise.all(filtersFiles.map(async (file) => {
		const { default: func } = await import(`${filterPath}/${file}`)
		config.addFilter(func.name, func)
	}))


	/**
	 * Shortcodes
	 */
	let shortcodesPath = './src/shortcodes'
	const shortcodesFiles = await readdir(shortcodesPath)

	await Promise.all(shortcodesFiles.map(async (file) => {
		const { default: func } = await import(`${shortcodesPath}/${file}`)
		config.addShortcode(func.name, func)

	}))

	/**
	 * paired Shortcodes
	 */
	let pairedShortcodespath = './src/pairedShortcodes'
	const pairedShortcodesFiles = await readdir(pairedShortcodespath)

	await Promise.all(pairedShortcodesFiles.map(async (file) => {
		const { default: func } = await import(`${pairedShortcodespath}/${file}`)
		config.addPairedShortcode(func.name, func)
	}))



	/**
	 * Collections
	 * ============================
	*/

	// Drafts, see also _data/eleventyDataSchema.js
	config.addPreprocessor("drafts", "*", (data: Record<string, any>, content: Record<string, any>) => {
		if (data.draft) {
			data.title = `${data.title} (draft)`
		}
		// process.env.ELEVENTY_RUN_MODE
		if (data.draft && meta.env === "production") {
			return false
		}
	})

	Object.keys(collections).forEach((colName) => {
		const cols = collections[colName]

		config.addCollection(colName, cols)
	})


	/**
MARKDOWN
 * ============================
*/
	config.addDataExtension("yaml", (contents: string) => YAML.parse(contents))

	config.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_alias: 'description',
		//Si <!-- excerpt --> est présent, sa valeur remplit le tag description, pas page.description.
		excerpt_separator: "<!-- excerpt -->"
	})

	config.setLibrary('md', md)




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
