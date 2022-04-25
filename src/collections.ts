import { Item, Collection } from '../types/eleventy';
const meta = require('./_data/meta.js')


const published = (post) => { return !post.data.draft }

function getPublishedPosts(collectionAPI) {
	return collectionAPI.getAll().
		filter((item) => item.data.contentType === 'post').
		filter(published)
}
module.exports = {

	publishedPosts: function (collectionAPI): Item[] {

		const collec = getPublishedPosts(collectionAPI)
		//console.log(collec.map(item => item.data.title))

		return collec
	},

	tagList: function (collectionAPI): any {
		let tagDictionary: Map<string, number> = new Map()

		getPublishedPosts(collectionAPI).forEach(function (item) {
			//@ts-ignore
			if ('tags' in item.data) {
				//@ts-ignore
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

		return new Map([...tagDictionary.entries()].filter(el => el[1] > 1).sort((a, b) => b[1] - a[1]))
	},
	listeProjets: async function (collection: Collection): Promise<any> {
		var truchetNode = require('./features/truchet/truchet-node.js');

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