
const remove = require('remove-markdown');

const slugify = require('./slugify.js');
//const cleanCSS = require('clean-css')
const md = require('../markdown.js')

import ElasticLunr from "elasticlunr";


const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
const { DateTime, Settings } = require('luxon')
Settings.defaultLocale = "fr";


function search(collection) {

	function callback(this: ElasticLunr.Index<any>) {
		//@ts-ignore
		this.use(lunr.fr);
		this.addField("title")
		this.addField("description")
		this.addField("tags")
		this.addField("content")
		this.setRef("url");
	}

	// what fields we'd like our index to consist of
	var index: ElasticLunr.Index<any> = elasticlunr(callback)

	// loop through each page and add it to the index
	collection.forEach((page) => {
		let img = page.data.collatedHeroImage

		if (/\/truchet-/.test(img)) {
			var finalPath = page.data.collatedHeroImage as string
		}
		else {
			var finalPath = "/assets/generatedImages/" + img
		}
		index.addDoc({
			url: page.url,
			title: page.data.title,
			description: page.data.description,
			tags: page.data.tags,
			//on accède au contenu en markdown et on le transforme en texte brut.
			content: remove(page.template.frontMatter.content),
			date: page.data.date,
			collatedHeroImage: finalPath,
			fileSlug: page.fileSlug
		});
	});
	return JSON.stringify(index.toJSON());
}

module.exports = {
	/**
	 * Filters
	 * @link https://www.11ty.dev/docs/filters/
	 */

	published: function (collection) {
		//const pub = collections['publishedPosts']
		return collection.filter((post) => {
			if (post.draft) {
				if (post.draft === true) {
					return false
				}
			}
			return true
		}
		)
	},

	cleanHeaderAnchors: (content) => {
		if (content === undefined) {
			return '';
		}
		const regex = /<a class="header-anchor"((?!(<\/a>)).|\n)+<\/a>/gm;
		return content.replace(regex, '');
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

	shuffle: function (array) {

		const newArray = [...array]
		var currentIndex = newArray.length;
		var temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = newArray[currentIndex];
			newArray[currentIndex] = newArray[randomIndex];
			newArray[randomIndex] = temporaryValue;
		}

		return newArray;
	},

	searchIndex: search,

	markdownify: (markdownString) => md.renderInline(markdownString),

	removeMD: require('./removeMD.js'),

	dateToPermalink: function (date) {
		return DateTime.fromJSDate(date, {
			zone: 'utc',
		}).toFormat('yyyy/MM')
	},


	dateISOFormat: function (date) {
		return DateTime.fromJSDate(date).toISODate()
	},

	/**
	 * dateHumanFormat allows specifiying display format at point of use.
	 * Example in footer: {{ build.timestamp | dateHumanFormat('yyyy') }} uses .timestamp
	 *  from the _data/build.js export and formats it via dateHumanFormat.
	 * Another usage example used in layouts: {{ post.date | dateHumanFormat("LLL dd, yyyy") }}
	 * And finally, example used in /src/posts/posts.json to format the permalink
	 *  when working with old /yyyy/MM/dd/slug format from Wordpress exports
	 */
	dateHumanFormat: require('./dateFormatting.js'),

	/**
   // Universal slug filter strips unsafe chars from URLs
   */
	slugify: (string) => {
		return slugify(string)
	},

}
