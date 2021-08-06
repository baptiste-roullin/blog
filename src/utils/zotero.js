const njk = require('nunjucks')

// Documentation de l'API : https://www.zotero.org/support/dev/web_api/v3/basics
// Client : 				https://github.com/tnajdek/zotero-api-client
const api = require('zotero-api-client');

/*
Comme promise.all, effectue des requête en parallèle et renvoie une promesse de tableau de résultats. Avec en plus des options, notamment une pour limiter le nombre de requêtes parallèles
@param input — Iterated over concurrently in the mapper function.
@param mapper — Function which is called for every item in input. Expected to return a Promise or value.
@returns — A Promise that is fulfilled when all promises in input and ones returned from mapper are fulfilled, or rejects if any of the promises reject. The fulfilled value is an Array of the fulfilled values returned from mapper in input order.
*/
const pMap = require('p-map');

module.exports = async function zotero(collection, requestedTag,) {

	async function addDataToItems(items) {

		async function mapper(item) {
			try {
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
			} catch (error) {

			}
		}
		return await pMap(items, mapper, { concurrency: 20 })

	}

	// Appel d'un fichier de conf global qui appele ensuite les infos de connexion à l'API d'un fichier .env.
	const meta = require('../_data/meta.js');
	const options = { locale: 'fr-FR', itemType: '-note', sort: 'date', limit: 30 }
	const lib = api(meta.zoteroAPIKey).library('user', meta.zoteroProfileID)


	try {

		if (!meta.zoteroAPIKey) {
			console.log(new Error("La clé d'API pour Zotero est manquante"))
			return
		}
		if (!meta.zoteroProfileID) {
			console.log(new Error("L'identifiant de profil Zotero est manquant."))
			return
		}

		if (!collection && !requestedTag) {
			return
		}

		//On requête la liste complète des collections pour en extraire l'ID de la collection demandée.
		if (collection) {
			const colls = await lib.collections().get()
			const collectionObject = colls.getData().filter(coll => coll.name === collection)[0]
			if (!collectionObject) {
				throw Error('catégorie inconnue')
			}
			var requestedCollection = collectionObject.key
		}

		// top() : pour avoir seulement les article et pas les documents enfants.
		// get() : pour indiquer qu'on veut une requête GET et concrètement récupérer les données
		firstPageItems = await lib.collections(requestedCollection || undefined).items().top().get(options)
		const totalCount = firstPageItems.response.headers.get('total-results')

		// Pagination
		// On teste s'il y a plus de résultats que le nombre max requété
		//  L'API renvoie aussi des nfos de pagination dans le header Links, qu'on n'utilise pas ici.
		if (totalCount) {
			if (totalCount > options.limit) {

				// on construit une liste de tous les offsets pour envoyer un batch de requêtes
				// Par exemple s'il y a 1000 items, on va demander les items à partir du centième, puis du deux-centième, puis du trois-centième...
				// Les items de 0 à 100 ont déjà été obtenus plus haut.
				let offsetList = []
				let index = 0
				while (index < totalCount) {
					index = index + options.limit
					offsetList.push(index)
				}

				const mapper = async offset => {
					return await lib.collections(requestedCollection).items().top().get(
						{ start: offset, ...options })
				}

				var otherPagesItems = await pMap(offsetList, mapper, { concurrency: 20 })

				// l'API renvoie un tableau d'objets. On extrait de chaque élement du tableau la clé "raw"
				// L'API a une méthode .getData() qui fournit directement un tableau des items. On ne peut pas l'utiliser et concaténer ces tableaux
				// Car la fonction addDataToItems() a besoin de certaines données présentes dans .raw.meta et pas via .getData()
				const concatenedOtherItems = otherPagesItems.reduce((accumulator, obj) => {
					return accumulator.concat(obj.raw)
				}, [])
				// ... et l'ajoute aux résultats du premier appel
				var items = firstPageItems.raw.concat(concatenedOtherItems)
			}
		}
		if (!items) {
			console.log(firstPageItems)
		}

		if (requestedTag) {
			items = items.filter(item =>
				item?.data.tags?.some(tag => tag.tag === requestedTag)
			)
		}

		// Cette fonction récupère des données supplémentaires
		// - une date parsée par Zotero, qu'on espère plus propre que le champ d'origine
		// - un lien direct vers un PDF, tiré des pièces jointes.
		const completedItems = await addDataToItems(items)


		// Ce templating étant à part d'Eleventy, on doit recréer un environnement Nunjucks
		// base du chemin utilisé ensuite par render()
		const env = njk.configure('src/_templates/components/',
			// options
			{ autoescape: true, trimBlocks: true, lstripBlocks: true });
		// Ajout d'un filtre utilisé par zotero.njk
		env.addFilter('dateToFormat', require('./dateToFormat.js'))
		return await env.render('zotero.njk', { items: completedItems });

	} catch (error) {
		// TODO : avertir plus précisément des erreur
		//403 : mauvaises infos de connexion
		// 500 : requête mal formée
		console.log(error);
	}



}