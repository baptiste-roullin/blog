const remove = require('remove-markdown');

const { DateTime, Settings } = require('luxon')
const slugify = require('./slugify.js');
const cleanCSS = require('clean-css')
const md = require('./markdown.js')
const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
Settings.defaultLocale = "fr";
var pd = require('pretty-data').pd;

module.exports = {
	/**
	 * Filters
	 * @link https://www.11ty.dev/docs/filters/
	 */

	frontMatterFilter: function (collection, field) {
		if (!field) return collection;

		return collection.filter(item => { return !item?.data?.[field] })
	},
	similarPosts: function (collection, path, categories) {

		const getSimilarCategories = function (categoriesA, categoriesB) {
			return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length;
		}

		return collection.filter((post) => {
			return getSimilarCategories(post.data.categories, categories) >= 1 && post.data.page.inputPath !== path;
		}).sort((a, b) => {
			return getSimilarCategories(b.data.categories, categories) - getSimilarCategories(a.data.categories, categories);
		});
	},



	slice: function (arr, a, b = 5) {
		return arr.slice(a, b);
	},
	searchIndex: (collection) => {
		// what fields we'd like our index to consist of
		var index = elasticlunr(function () {
			this.use(lunr.fr);
			this.addField("title", { boost: 8 })
			this.addField("description", { boost: 5 })
			this.addField("tags", { boost: 5 })
			this.addField("content", { boost: 2 })
			this.setRef("url");
		})

		// loop through each page and add it to the index
		collection.forEach((page) => {

			index.addDoc({
				url: page.url,
				title: page.data.title,
				description: page.data.description,
				tags: page.data.tags,
				//on accède au contenu en  markdown et on le transforme en texte brut.
				content: remove(page.template.frontMatter.content),
				date: page.data.date,
				hero: page.data.hero,
				fileSlug: page.fileSlug
			});

		});
		return index.toJSON();
	},

	// Add markdownify filter with Markdown-it configuration
	markdownify: (markdownString) => { md.render(markdownString) },

	removeMD: require('./removeMD.js'),

	dateToPermalink: function (date) {
		return DateTime.fromJSDate(date, {
			zone: 'utc',
		}).toFormat('yyyy/MM')
	},

	/**
	 * dateToFormat allows specifiying display format at point of use.
	 * Example in footer: {{ build.timestamp | dateToFormat('yyyy') }} uses .timestamp
	 *  from the _data/build.js export and formats it via dateToFormat.
	 * Another usage example used in layouts: {{ post.date | dateToFormat("LLL dd, yyyy") }}
	 * And finally, example used in /src/posts/posts.json to format the permalink
	 *  when working with old /yyyy/MM/dd/slug format from Wordpress exports
	 */
	dateToFormat: require('./dateToFormat.js'),

	/**
   // Universal slug filter strips unsafe chars from URLs
   */
	slugify: (string) => {
		return slugify(string)
	},


	minify: (data, format) => {
		switch (format) {
			case 'css':
				return pd.cssmin(data)
			case 'json':
				return pd.jsonmin(data)

			default:
				throw new Error("format non supporté")
		}

	}
}
