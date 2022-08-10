import { normalize } from 'path';
import { Config, UserConfig, Data, Page, Item, Collection } from '../../types/eleventy.js';

import { meta } from '../_data/meta.js';
import truchetNode from '../features/truchet/truchet_node.js'


const published = (post) => { return !post.data.draft }

function getbyField(collectionAPI, field, value: boolean | string) {
	return collectionAPI.getAllSorted().
		filter((item) => item.data[field] === value).
		filter(published)
}
export const collections = {

	publishedPosts: function (collectionAPI): Item[] {
		return getbyField(collectionAPI, 'contentType', 'post')
	},

	tagList: function (collectionAPI) {
		let tagDictionary: { string?: number } = {}

		getbyField(collectionAPI, 'contentType', 'post').forEach(function (item) {

			function normalize(tag) {
				return tag.slice(0, 1).toUpperCase() + tag.slice(1)
			}

			if ('tags' in item.data) {
				let tags: string[] = item.data.tags

				// Compteur du nombre d'articles associés à un tag
				for (let tag of tags) {
					tag = normalize(tag)
					if (tag in tagDictionary) {
						const oldValue = tagDictionary[tag]
						tagDictionary[tag] = oldValue + 1
					}
					else {
						tagDictionary[tag] = 1
					}
				}
			}
		})
		const sortedtags = Object.entries(tagDictionary).sort((a, b) => b[1] - a[1])

		return Object.fromEntries(sortedtags)
	},

	featuredPosts: function (collectionAPI): Item[] {
		return getbyField(collectionAPI, 'featured', true)
			}
}