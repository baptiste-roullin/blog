const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const yaml = require("js-yaml");

//const svgsprite = require('./src/utils/svgsprite')
//const pageAssetsPlugin = require('eleventy-plugin-page-assets');
const imagesResponsiver = require("eleventy-plugin-images-responsiver");
require('dotenv').config()
const embedEverything = require("eleventy-plugin-embed-everything");

const meta = require('./src/_data/meta.js');
const njk = require('nunjucks')
const api = require('zotero-api-client');



module.exports = function (eleventyConfig) {

	/**
	 * Opts in to a full deep merge when combining the Data Cascade.
	 * Per the link below, "This will likely become the default in an upcoming major version."
	 * So I'm going to implement it now.
	 * @link https://www.11ty.dev/docs/data-deep-merge/#data-deep-merge
	 */
	eleventyConfig.setDataDeepMerge(true)

	/**
 * Custom Watch Targets
 * for when the Tailwind config or .css files change...
 * by default not watched by 11ty
 * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
 */
	eleventyConfig.addWatchTarget('./src/assets/css/')
	eleventyConfig.addWatchTarget('./src/assets/scripts/')
	eleventyConfig.addWatchTarget('./src/*.js')
	eleventyConfig.addWatchTarget('./tailwind.config.js')
	eleventyConfig.setWatchThrottleWaitTime(200);

	eleventyConfig.setWatchJavaScriptDependencies(true);





	/**
 * Passthrough File Copy
 * @link https://www.11ty.dev/docs/copy/

cf. webpack.configs.js pour le JS
cf. postcss.config.js pour le CSS

*/

	//eleventyConfig.addPassthroughCopy({ 'src/assets/images/*.gif': 'assets/images' });
	//On copie tels quels les média avec chemins relatifs ou absolus dans /dist, qu'ils puissent être lus par du balisage non-transformé (sans srcset ou gif -> vidéo)

	eleventyConfig.addPassthroughCopy({ 'src/posts/**/*.{png,webp,gif,mp4,jpg,jpeg}': 'assets/generatedImages' })
	eleventyConfig.addPassthroughCopy({ 'src/assets/images/*.{png,webp,gif,mp4,jpg,jpeg}': 'assets/generatedImages' })


	eleventyConfig.addPassthroughCopy('src/assets/docs/')


	eleventyConfig.addPassthroughCopy('src/posts/**/*.gif')
	eleventyConfig.addPassthroughCopy('src/*.ico')
	eleventyConfig.addPassthroughCopy('src/robots.txt')
	eleventyConfig.addPassthroughCopy('src/assets/css/fonts')
	eleventyConfig.addPassthroughCopy('src/assets/UI')

	eleventyConfig.setUseGitIgnore(false)


	/**
	 * Plugins
	 * @link https://www.11ty.dev/docs/plugins/
	 */

	eleventyConfig.addPlugin(pluginRss)
	eleventyConfig.addPlugin(pluginNavigation)
	eleventyConfig.addPlugin(syntaxHighlight)
	//eleventyConfig.addPlugin(pageAssetsPlugin, { mode: "parse", postsMatching: "src/posts/*/*.md", });
	eleventyConfig.addPlugin(embedEverything, {
		use: ['vimeo', 'youtube', 'twitter'], twitter: { options: { align: 'center' } }
	});

	if (process.env.NODE_ENV === "production") {
		eleventyConfig.addPlugin(imagesResponsiver, require('./src/utils/images-responsiver-config.js'))
		eleventyConfig.addPlugin(require('./src/utils/gif-converter.js'))

	}


	/**
	 * Filters
	 * @link https://www.11ty.io/docs/filters/
	 */
	const filters = require('./src/utils/filters.js')

	Object.keys(filters).forEach((filterName) => {
		eleventyConfig.addFilter(filterName, filters[filterName])
	})


	/**
	 * Transforms
	 * @link https://www.11ty.io/docs/config/#transforms
	 */
	/*const transforms = require('./src/utils/transforms.js')

	Object.keys(transforms).forEach((transformName) => {
		eleventyConfig.addTransform(transformName, transforms[transformName])
	})
*/

	/**
	 * Shortcodes
	 * @link https://www.11ty.io/docs/shortcodes/
	 */
	const shortcodes = require('./src/utils/shortcodes.js')

	Object.keys(shortcodes).forEach((shortcodeName) => {
		eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
	})

	/**
	 * Paired Shortcodes
	 * @link https://www.11ty.dev/docs/languages/nunjucks/#paired-shortcode
	 */
	const pairedshortcodes = require('./src/utils/paired-shortcodes.js')
	Object.keys(pairedshortcodes).forEach((shortcodeName) => {
		eleventyConfig.addPairedShortcode(
			shortcodeName,
			pairedshortcodes[shortcodeName]
		)
	})

	/**
	 * Add async shortcodes
	 *
	 * @link https://www.11ty.dev/docs/languages/nunjucks/#asynchronous-shortcodes
	 */
	eleventyConfig.addNunjucksAsyncShortcode('zotero', async function (type, id) {
		if (type === 'tag') {
			const response = await api().library('user', meta.zoteroProfileID).tags(id).items().get();
		}
		else {
			//	const response = await api().library('user', meta.zoteroProfileID).collection(id).items().get();

		}
		//	const items = await response.getData();
		//njk.configure('src/_templates/components/', { autoescape: true, trimBlocks: true, lstripBlocks: true });

		//return njk.render('zotero.njk', { items: items });
	})

	eleventyConfig.addNunjucksAsyncShortcode('observable', async function (id) {
		return `<div id="observablehq-tileDebase-${id}"></div>

				<script type="module">
				import {Runtime, Inspector} from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
				import define from "https://api.observablehq.com/@saint-loup/test.js?v=3";
				new Runtime().module(define, name => {
				if (name === "tileDebase") return new Inspector(document.querySelector('#observablehq-tileDebase-${id}'));
				});
				</script>
				`
	})
	/**
	 * Add layout aliases
	 * @link https://www.11ty.dev/docs/layouts/#layout-aliasing
	 */
	eleventyConfig.addLayoutAlias('base', 'layouts/base.njk')
	eleventyConfig.addLayoutAlias('page', 'layouts/page.njk')
	eleventyConfig.addLayoutAlias('post', 'layouts/post.njk')
	eleventyConfig.addLayoutAlias('post-canvas', 'layouts/post-canvas.njk')


	//eleventyConfig.addLayoutAlias('home', 'layouts/home.njk')




	/**
	MARKDOWN
	*/
	eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_alias: 'description',
		excerpt_separator: "<!-- excerpt -->"
	});

	const md = require('./src/utils/markdown.js')
	eleventyConfig.setLibrary('md', md);





	/**
 * Collections
 * ============================

 */


	const publishedPosts = (post) => { return !post.data.draft }


	eleventyConfig.addCollection("publishedPosts", function (collection) {

		//const collec = collection.getFilteredByGlob("./src/posts/**/*.md").filter(publishedPosts);

		const collec = collection.getFilteredByTag("post").filter(publishedPosts)
		/*	collec.forEach(item => {
				if (item.fileSlug === undefined) {
					console.log(item.templateContent)
				}
			})*/
		return collec
	});


	eleventyConfig.addCollection('tagList', (collection) => {
		let tagSet = new Set()
		collection.getFilteredByTag("post").filter(publishedPosts).forEach(function (item) {
			if ('tags' in item.data) {
				let tags = item.data.tags

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
					tagSet.add(tag)
				}
			}
		})

		return [...tagSet]
	})

	/*	eleventyConfig.addCollection("catList", function (collectionApi) {
			return collectionApi.getFilteredByTag("travaux");
		});*/


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
