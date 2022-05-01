import { Item, Collection } from '../../types/eleventy';
const meta = require('../_data/meta.js')


const published = (post) => { return !post.data.draft }

function getbyField(collectionAPI, field, value: boolean | string) {
	return collectionAPI.getAll().
		filter((item) => item.data[field] === value).
		filter(published)
}
module.exports = {

	publishedPosts: function (collectionAPI): Item[] {
		return getbyField(collectionAPI, 'contentType', 'post')
	},

	tagList: function (collectionAPI): any {
		let tagDictionary: Map<string, number> = new Map()

		getbyField(collectionAPI, 'contentType', 'post').forEach(function (item) {
			//@ts-ignore
			if ('tags' in item.data) {
				let tags: string[] = item.data.tags

				// Compteur du nombre d'articles associés à un tag
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
		return new Map([...tagDictionary.entries()].sort((a, b) => b[1] - a[1]))
	},

	featuredPosts: function (collectionAPI): Item[] {
		return getbyField(collectionAPI, 'featured', true)
	},

	listeProjets: async function (collection: Collection): Promise<any> {
		var truchetNode = require('../features/truchet/truchet-node.js');

		// @ts-ignore
		const projets = collection.items[0].data.projets

		const collatedProjects = await Promise.all(projets.map(async (projet) => {

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