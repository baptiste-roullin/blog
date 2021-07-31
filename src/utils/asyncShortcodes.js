const njk = require('nunjucks')
const api = require('zotero-api-client');
const meta = require('../_data/meta.js');
const parse = require('parse-link-header');

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
			const limit = 50;
			const lib = await api(meta.zoteroAPIKey).library('user', meta.zoteroProfileID)
			const colls = await lib.collections().get()

			if (collection) {

				const collectionObject = colls.getData().filter(coll => coll.name === collection)[0]
				var requestedCollection = collectionObject.key
				var articles = await lib.collections(requestedCollection).items().get({ limit: limit })

				/*
				const totalCount = parse(articles.response.headers.get('total-results'))

				if (totalCount) {
				let offsetList = []
				while (index < total-results)  {
					index = start + limit
					offsetList.push(index)
				}
						const mapper = async offset => {
							await lib.collections(requestedCollection).items().get({ limit: limit, start: offset })
						}
						const remainingArticles = await pMap(offsetList, mapper, { concurrency: 20 })
						articles.push(...remainingArticles)
						// POSSIBLE DE CONCAT À CE NIVEAU, AVANT GETDATA() ?
					}*/

			}
			else {
				var articles = await lib.items().get({ limit: 27 })

			}
			var itemsFilteredByTag = articles.getData().filter(item =>
				item.tags.some(tag => tag.tag === requestedTag)
			)

		} catch (error) {
			console.log(error);
		}
		njk.configure('src/_templates/components/', { autoescape: true, trimBlocks: true, lstripBlocks: true });

		return njk.render('zotero.njk', { items: itemsFilteredByTag });
	}
}