const njk = require('nunjucks')
const api = require('zotero-api-client');
const meta = require('../_data/meta.js');
//const parse = require('parse-link-header');
//promise.all mais avec un paramètre pour limiter le nombre de requêtes parallèles
const pMap = require('p-map');

function normalizeDate(articles) {
	return articles.raw.map(item => {
		item.data.parsedDate = item.meta.parsedDate
		return item.data
	});
}

module.exports = {
	zotero: async function (collection, requestedTag,) {

		if (!meta.zoteroAPIKey) {
			console.log(new Error("La clé d'API pour Zotero est manquante"))
			return
		}
		if (!meta.zoteroProfileID) {
			console.log(new Error("L'identifiant de profil Zotero est manquant."))
			return
		}
		try {

			const options = { locale: 'fr-FR', itemType: '-note', sort: 'date', limit: 30 }
			const lib = await api(meta.zoteroAPIKey).library('user', meta.zoteroProfileID)
			const colls = await lib.collections().get()

			if (collection) {
				const collectionObject = colls.getData().filter(coll => coll.name === collection)[0]

				if (!collectionObject) {
					throw Error('catégorie inconnue')
				}

				var requestedCollection = collectionObject.key

				var articles = await lib.collections(requestedCollection).items().top().get(options)

				const totalCount = articles.response.headers.get('total-results')
				if (totalCount) {
					let offsetList = []
					let index = 0
					while (index < totalCount) {
						index = index + options.limit
						offsetList.push(index)
					}

					const mapper = async offset => {
						const articles = await lib.collections(requestedCollection).items().top().get(
							{ start: offset, ...options })
						return normalizeDate(articles)
					}

					//promise.all mais avec un paramètre pour limiter le nombre de requêtes parallèles
					var remainingArticles = await pMap(offsetList, mapper, { concurrency: 20 })
					var items = normalizeDate(articles).concat(...remainingArticles)
				}
				else {
					var items = normalizeDate(articles)
				}
			}
			else {
				var articles = await lib.items().get(options)

			}
			console.log(items.length)
			items.forEach(item => {
				if (!(item.title)) {
					console.log(item)
				}
			});
			if (requestedTag) {
				items = items.filter(item =>
					item.tags.some(tag => tag.tag === requestedTag)
				)
			}
		} catch (error) {
			console.log(error);
		}
		const env = njk.configure('src/_templates/components/', { autoescape: true, trimBlocks: true, lstripBlocks: true });
		env.addFilter('dateToFormat', require('./dateToFormat.js'))

		return await env.render('zotero.njk', { items: items });
	}
}