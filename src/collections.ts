import { Item, Collection } from '../types/eleventy';


const published = (post) => { return !post.data.draft }

module.exports = {

	publishedPosts: function (collection: Collection): Item[] {

		const collec = collection.getFilteredByTag("post").filter(published)
		/*	collec.forEach(item => {
				if (item.fileSlug === undefined) {
					console.log(item.templateContent)
				}
			})*/
		return collec
	},

	tagList: function (collection: Collection): any {
		let tagDictionary: Map<string, number> = new Map()

		collection.getFilteredByTag("post").filter(published).forEach(function (item) {
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
						case 'projets':
						case 'features':
						case 'publishedposts':
						case 'listeprojets':
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
	},
	listeProjets: async function (collection: Collection): Promise<any> {
		var truchetNode = require('./features/truchet/truchet-node.js');

		// @ts-ignore
		const projets = collection.items[0].data.projets

		const collatedProjects = await Promise.all(projets.map(async (projet) => {
			if (!projet.img) {
				await truchetNode(projet.name, 400, 400).catch(console.error);
				projet.img = `truchet-${projet.name}.png`
			}
			return projet
		}))
		return collatedProjects
	},
}