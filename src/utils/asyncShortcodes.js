const njk = require('nunjucks')
const api = require('zotero-api-client');
const meta = require('../_data/meta.js');
//promise.all mais avec un paramètre pour limiter le nombre de requêtes parallèles
const pMap = require('p-map');



async function enrichArticle(articles, lib) {
	try {
		const mapper = async item => {
			item.data.parsedDate = item.meta.parsedDate
			if (item.meta.numChildren) {
				const attachments = await lib.items(item.key).children().get({ itemType: 'attachment' })
				const data = attachments.getData()

				data.forEach(attachment => {
					if (attachment.itemType === 'attachment' && new RegExp(/(.pdf$|.pdf?)/).test(attachment.url)) {
						item.data.attachmentURL = attachment.url
					}
				})
			}
			return item.data
		}
		const enriched = await pMap(articles.raw, mapper)
		/*		if (enriched.length > 0) {
					return enriched
				}
				else {
					return articles.raw.data
				}*/
		return enriched
	} catch (error) {
	}
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
						return await enrichArticle(articles, lib)
					}

					//promise.all mais avec un paramètre pour limiter le nombre de requêtes parallèles
					var remainingArticles = await pMap(offsetList, mapper, { concurrency: 20 })
					var items = remainingArticles.concat(...remainingArticles)
				}
				else {
					var items = await enrichArticle(articles, lib)
				}
			}
			else {
				var items = await enrichArticle(articles, lib)
			}
			if (!items) {
				console.log(articles)
			}
			else {
				console.log(items.length)
				//items.forEach(item => {
				//	if (!(item?.title)) {
				//		console.log(item?.title)
				//	}
				//});
				if (requestedTag) {
					items = items.filter(item =>
						item?.tags?.some(tag => tag.tag === requestedTag)
					)
				}
			}
		} catch (error) {
			console.log(error);
		}


		const env = njk.configure('src/_templates/components/', { autoescape: true, trimBlocks: true, lstripBlocks: true });
		env.addFilter('dateToFormat', require('./dateToFormat.js'))
		return await env.render('zotero.njk', { items: items });
	}
}