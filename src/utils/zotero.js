const njk = require('nunjucks')

// Documentation de l'API : https://www.zotero.org/support/dev/web_api/v3/basics
// Client : 				https://github.com/tnajdek/zotero-api-client
const api = require('zotero-api-client');


/*
Comme promise.all, effectue  mais avec un paramètre pour limiter le nombre de requêtes parallèles
@param input — Iterated over concurrently in the mapper function.
@param mapper — Function which is called for every item in input. Expected to return a Promise or value.
@returns — A Promise that is fulfilled when all promises in input and ones returned from mapper are fulfilled, or rejects if any of the promises reject. The fulfilled value is an Array of the fulfilled values returned from mapper in input order.
*/
const pMap = require('p-map');

async function addDataToArticles(articles, lib) {
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

module.exports = async function zotero(collection, requestedTag,) {

	// Appel d'un fichier de conf global qui appele ensuite les infos de connexion à l'API d'un fichier .env.
	const meta = require('../_data/meta.js');
	if (!meta.zoteroAPIKey) {
		console.log(new Error("La clé d'API pour Zotero est manquante"))
		return
	}
	if (!meta.zoteroProfileID) {
		console.log(new Error("L'identifiant de profil Zotero est manquant."))
		return
	}

	try {
		const options = {
			locale: 'fr-FR',
			itemType: '-note',
			sort: 'date',
			limit: 100
		}

		const lib = await api(meta.zoteroAPIKey).library('user', meta.zoteroProfileID)
		const colls = await lib.collections().get()

		if (collection) {

			//On requête la liste complète des collections pour en extraire l'ID de la collection demandée.
			const collectionObject = colls.getData().filter(coll => coll.name === collection)[0]
			if (!collectionObject) {
				throw Error('catégorie inconnue')
			}
			var requestedCollection = collectionObject.key

			// top() : pour avoir seulement les article et pas les documents enfants.
			// get() : "fonction d'éxectui"
			var articles = await lib.collections(requestedCollection).items().top().get(options)

			// Si il y a plus de résultats que le nombre max requété, l'API renvoie :
			//  - un header avec le nombre total
			//  - des infos de pagination dans le header Links, qu'on n'utilise pas ici.
			const totalCount = articles.response.headers.get('total-results')
			if (totalCount) {

				// on construit une liste de tous les offsets pour envoyer un batch de requêtes
				let offsetList = []
				let index = 0
				while (index < totalCount) {
					index = index + options.limit
					offsetList.push(index)
				}

				const mapper = async offset => {
					const articles = await lib.collections(requestedCollection).items().top().get(
						{ start: offset, ...options })
					return await addDataToArticles(articles, lib)
				}


				var remainingArticles = await pMap(offsetList, mapper, { concurrency: 20 })
				// on aplatit le tableau de tableaux retourné par pMap et on l'ajoute aux résultats du premier appel
				var items = remainingArticles.concat(...remainingArticles)
			}
		}
		else {
			console.log("merci de préciser une collection")
		}

		if (items) {
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
		// TODO : avertir plus précisément des erreur
		//403 : mauvaises infos de connexion
		// 500 : requête mal formée
	}

	// Ce templating étant à part d'Eleventy, on doit recréer un environnement Nunjucks
	// base du chemin utilisé ensuite par render()
	const env = njk.configure('src/_templates/components/',
		// options
		{ autoescape: true, trimBlocks: true, lstripBlocks: true });
	// Ajout d'un filtre utilisé par zotero.njk
	env.addFilter('dateToFormat', require('./dateToFormat.js'))
	return await env.render('zotero.njk', { items: items });
}