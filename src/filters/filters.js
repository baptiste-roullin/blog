import slugify from './slugify.js'
import md from '../markdown.js'
import dateFormatting from './dateFormatting.js'
import normalizeTag from './normalize_tag.js'

import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr"
import removeMD from './removeMD.js'
import markdownify from './markdownify.js'

export default {


    //TODO: ajouter contrôle pour tous les filtres, avec try catch throw
    // logger this.page ou this.ctx pour de meilleurs messages d'erreur
    /**
     * Filters
     * @link https://www.11ty.dev/docs/filters/
     */

    normalizeTag: normalizeTag,

    cleanHeaderAnchors: (content) => {
        if (content === undefined) {
            return ''
        }
        const regex = /<a class="header-anchor"((?!(<\/a>)).|\n)+<\/a>/gm
        return content.replace(regex, '')
    },

    similarPosts: function (collection, path, categories) {

        const getSimilarCategories = function (categoriesA, categoriesB) {
            return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length
        }
        return collection.filter((post) => {
            return getSimilarCategories(post.data.categories, categories) >= 1 && post.data.page.inputPath !== path
        }).sort((a, b) => {
            return getSimilarCategories(b.data.categories, categories) - getSimilarCategories(a.data.categories, categories)
        })
    },

    /**
     *
     * @param {array} arr
     * @param {number} a
     * @param {number} b
     * @returns {array}
     */
    slice: function (arr, a, b = 5) {

        return arr.slice(a, b)
    },

    /**
     *
     * @param {array} array
     * @returns {array}
     */
    shuffle: function (array) {

        try {
            if (!(Array.isArray(array))) {
                throw new Error("should be array")
            }

            const newArray = [...array]
            var currentIndex = newArray.length
            var temporaryValue, randomIndex

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex)
                currentIndex -= 1

                // And swap it with the current element.
                temporaryValue = newArray[currentIndex]
                newArray[currentIndex] = newArray[randomIndex]
                newArray[randomIndex] = temporaryValue
            }

            return newArray


        } catch (error) {
            console.log(error)
            console.log(this.inputPath)
        }
    },
    markdownify: markdownify,

    markdownifyBlock: function (value) {
        if (!value) {
            console.log("markdownifyBlock: empty string")
            return ''
        }
        return `<div class="prose-tcqb">${md.render(value)}</div>`
    },

    removeMD: removeMD,


    dateISOFormat: function (date) {
        if (!date) {
            console.log("date string is empty")
            return ""
        }
        return DateTime.fromJSDate(date).toISODate()
    },

    /**
     * dateFormatting allows specifiying display format at point of use.
     * Example in footer: {{ build.timestamp | dateFormatting('yyyy') }} uses .timestamp
     *  from the _data/build.js export and formats it via dateFormatting.
     * Another usage example used in layouts: {{ post.date | dateFormatting("LLL dd, yyyy") }}
     * And finally, example used in /src/posts/posts.json to format the permalink
     *  when working with old /yyyy/MM/dd/slug format from Wordpress exports
     */
    dateFormatting: dateFormatting,

    year: function year(date) {
        return DateTime.fromJSDate(date).year
    },

    /**
   // Universal slug filter strips unsafe chars from URLs
   */
    slugify: function (string) {

        const inputPath = this.page.inputPath
        return slugify(string, inputPath)
    },

}
