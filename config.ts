import { Config, Item, UserConfig, Collection } from './types/eleventy';

const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const yaml = require("js-yaml");
const imagesResponsiver = require("eleventy-plugin-images-responsiver");
require('dotenv').config()
const embedEverything = require("eleventy-plugin-embed-everything");


module.exports = function (config: Config): UserConfig {

	/**
	 * Opts in to a full deep merge when combining the Data Cascade.
	 * Per the link below, "This will likely become the default in an upcoming major version."
	 * So I'm going to implement it now.
	 * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
	 */
	config.setDataDeepMerge(true)

	/**
 * Custom Watch Targets
 * for when the Tailwind config or .css files change...
 * by default not watched by 11ty
 * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
 */
	config.addWatchTarget('./src/assets/css/')
	config.addWatchTarget('./src/assets/scripts/')
	config.addWatchTarget('./src/*.js')
	config.addWatchTarget('./tailwind.config.js')
	config.setWatchThrottleWaitTime(200);

	config.setWatchJavaScriptDependencies(true);



	/**
 * Passthrough File Copy
 * @link https://www.11ty.dev/docs/copy/

cf. webpack.configs.js pour le JS
cf. postcss.config.js pour le CSS

*/


	//On copie tels quels les média avec chemins relatifs ou absolus dans /dist, qu'ils puissent être lus par du balisage non-transformé (sans srcset ou gif -> vidéo)

	config.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': 'assets/generatedImages' })
	config.addPassthroughCopy({ 'src/assets/images/*.{png,webp,gif,mp4,jpg,jpeg}': 'assets/generatedImages' })

	config.addPassthroughCopy('src/assets/docs/')

	config.addPassthroughCopy('src/posts/**/*.gif')
	config.addPassthroughCopy('src/*.ico')
	config.addPassthroughCopy('src/robots.txt')
	config.addPassthroughCopy('src/assets/css/fonts')
	config.addPassthroughCopy('src/assets/UI')

	config.setUseGitIgnore(false)


	/**
	 * Plugins
	 * @link https://www.11ty.dev/docs/plugins/
	 */

	config.addPlugin(pluginNavigation)
	config.addPlugin(syntaxHighlight)
	config.addPlugin(embedEverything, {
		use: ['vimeo', 'youtube', 'twitter'], twitter: { options: { align: 'center' } }
	});

	if (process.env.NODE_ENV === "production") {
		config.addPlugin(imagesResponsiver, require('./src/transforms/images-responsiver-config.ts'))
		config.addPlugin(require('./src/transforms/gif-converter.ts'))
	}
	config.addPlugin(pluginRss)


	/**
	 * Filters
	 * @link https://www.11ty.io/docs/filters/
	 */
	const filters = require('./src/filters/filters.ts')

	Object.keys(filters).forEach((filterName) => {
		config.addFilter(filterName, filters[filterName])
	})

	/*	const asyncFilters = require('./src/filters/asyncFilters.ts')
		Object.keys(asyncFilters).forEach((filterName) => {
			config.addNunjucksAsyncFilter(filterName, filters[filterName])
		})
	*/


	/**
	 * Transforms
	 * @link https://www.11ty.io/docs/config/#transforms
	 */
	// l'activer pète tout.
	/*const transforms = require('./src/transforms/transforms.js')

	Object.keys(transforms).forEach((transformName) => {
		config.addTransform(transformName, transforms[transformName])
	})
*/

	/**
	 * Shortcodes
	 * @link https://www.11ty.io/docs/shortcodes/
	 */
	const shortcodes = require('./src/shortcodes/shortcodes.js')

	Object.keys(shortcodes).forEach((shortcodeName) => {
		config.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	/**
	 * Paired Shortcodes
	 * @link https://www.11ty.dev/docs/languages/nunjucks/#paired-shortcode
	 */
	const pairedshortcodes = require('./src/shortcodes/pairedShortcodes.js')
	Object.keys(pairedshortcodes).forEach((shortcodeName) => {
		config.addPairedShortcode(shortcodeName, pairedshortcodes[shortcodeName]
		)
	})

	/**
	 * Add async shortcodes
	 *
	 * @link https://www.11ty.dev/docs/languages/nunjucks/#asynchronous-shortcodes
	 */

	const asyncShortcodes = require('./src/shortcodes/asyncShortcodes.js')
	Object.keys(asyncShortcodes).forEach((shortcodeName) => {
		config.addNunjucksAsyncShortcode(shortcodeName, asyncShortcodes[shortcodeName])
	})


	/**
	 * Add layout aliases
	 * @link https://www.11ty.dev/docs/layouts/#layout-aliasing
	 */
	config.addLayoutAlias('base', 'layouts/base.njk')
	config.addLayoutAlias('page', 'layouts/page.njk')
	config.addLayoutAlias('post', 'layouts/post.njk')
	config.addLayoutAlias('post-canvas', 'layouts/post-canvas.njk')


	//config.addLayoutAlias('home', 'layouts/home.njk')

	/**
	MARKDOWN
	*/
	config.addDataExtension("yaml", contents => yaml.safeLoad(contents));

	config.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_alias: 'description',
		excerpt_separator: "<!-- excerpt -->"
	});

	const md = require('./src/markdown.js')
	config.setLibrary('md', require('./src/markdown.js'));



	/**
 * Collections
 * ============================

 */

	const publishedPosts = (post) => { return !post.data.draft }


	config.addCollection("publishedPosts", function (collection: Collection): Item[] {


		const collec = collection.getFilteredByTag("post").filter(publishedPosts)
		/*	collec.forEach(item => {
				if (item.fileSlug === undefined) {
					console.log(item.templateContent)
				}
			})*/
		return collec
	});

	config.addCollection('tagList', function (collection: Collection): any {
		let tagDictionary: Map<string, number> = new Map()

		collection.getFilteredByTag("post").filter(publishedPosts).forEach(function (item) {
			//@ts-ignore
			if ('tags' in item.data) {
				//@ts-ignore
				let tags: string[] = item.data.tags

				tags = tags.filter(function (item) {
					switch (item) {
						// this list should match the `filter` list in tags.njk
						case 'authors':
						case 'pages':
						case 'post':
						case 'travaux':
						case 'features':
						case 'publishedposts':
							return false
					}
					return true
				})

				for (const tag of tags) {
					if (tagDictionary.has(tag)) {
						const oldValue = tagDictionary.get(tag)!
						tagDictionary.set(tag, oldValue + 1)
					}
					else {
						tagDictionary.set(tag, 1)
					}
				}
			}
		})

		return new Map([...tagDictionary.entries()].filter(el => el[1] > 1).sort((a, b) => b[1] - a[1]))
	})

	/*	config.addCollection("catList", function (collectionApi) {
			return collectionApi.getFilteredByTag("travaux");
		});*/


	//const { compress } = require('eleventy-plugin-compress');
	//config.addPlugin(compress);



	return {
		dir: {
			input: 'src',
			output: 'dist',
			includes: '_templates',
			data: '_data',
		},
		passthroughFileCopy: true,
		templateFormats: ['html', 'njk', 'md'],
		htmlTemplateEngine: 'njk',
		markdownTemplateEngine: 'njk',
	}
}
