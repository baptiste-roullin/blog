//import { normalize } from 'path';
import { Config, UserConfig, Data, Page, Item, Collection } from '../../types/eleventy.js';

import normalizeTag from '../filters/normalize_tag'

const meta = require('../_data/meta')
import truchetNode from '../features/truchet/truchet_node'


const published = (post) => { return !post.data.draft }

function getbyField(collectionAPI, field, value: boolean | string) {
	return collectionAPI.getAllSorted().
		filter((item) => item.data[field] === value).
		filter(published)
}
export const collections = {

	publishedPosts: function (collectionAPI: Collection): Item[] {
		return getbyField(collectionAPI, 'contentType', 'post')
	},

	tagList: function (collectionAPI: Collection) {
		let tagDictionary: { string?: number } = {}

		getbyField(collectionAPI, 'contentType', 'post').forEach(function (item) {


			if ('tags' in item.data) {
				let tags: string[] = item.data.tags

				// Compteur du nombre d'articles associés à un tag
				for (let tag of tags) {
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
	},

	projectsList: async function (collectionAPI: Collection): Promise<any> {
		const projects = collectionAPI.items[0].data!.projects

		const collatedProjects = await Promise.all(projects.map(async (projet) => {

			if (!projet.img) {
				await truchetNode(projet.name, 400, 400).catch(console.error);
				//chemin absolu
				projet.img = `/${meta.assetsDir}/truchet-${projet.name}.png`
			}
			return projet
		}))
		return collatedProjects
	},

}