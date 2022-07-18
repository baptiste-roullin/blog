const slugify = require('./slugify.js');
const md = require('../config/markdown.ts')
import { search } from '../features/search_index/search_back';
const { DateTime, Settings } = require('luxon')
Settings.defaultLocale = "fr";



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

	markdownifyBlock: (value) => {
		if (!value) {
			console.log("attention, string vide")
			return ''
		}
		return `<div class="prose-tcqb">${md.render(value)}</div>`
	},


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
