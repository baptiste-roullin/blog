
// Documentation de l'API : https://www.zotero.org/support/dev/web_api/v3/basics
// Client : 				https://github.com/tnajdek/zotero-api-client
import pMap from 'p-map'
import markdownify from '../filters/markdownify.js'
import meta from '../_data/meta.js'
import dateFormatting from '../filters/dateFormatting.js'
import cache from '../utils/caching.js'
import api from 'zotero-api-client/src/main.js'

import fs from 'node:fs/promises'
import path from 'node:path'

import { dirname } from 'node:path'
import { fileURLToPath } from 'url'
import renderNunjucks from '../utils/renderNunjucks.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

//TODO : shadow DOM https://github.com/11ty/eleventy/issues/3402

/*
Comme promise.all, effectue des requête en parallèle et renvoie une promesse de tableau de résultats. Avec en plus des options, notamment une pour limiter le nombre de requêtes parallèles
@param input — Iterated over concurrently in the mapper function.
@param mapper — Function which is called for every item in input. Expected to return a Promise or value.
@returns — A Promise that is fulfilled when all promises in input and ones returned from mapper are fulfilled, or rejects if any of the promises reject. The fulfilled value is an Array of the fulfilled values returned from mapper in input order.
*/

/**
 * @param {string} collection
 * @param {...string} [requestedTags]
 * @returns {Promise<string | undefined>}
*/
export default async function zotero(collection, ...requestedTags) {
    //supports only one tag.

    if (!meta.zoteroAPIKey) {
        console.log(new Error("La clé d'API pour Zotero est manquante"))
        return
    }
    if (!meta.zoteroProfileID) {
        console.log(new Error("L'identifiant de profil Zotero est manquant."))
        return
    }

    if (!collection && requestedTags.length === 0) {
        console.log(new Error('merci de spécifier une collection ou un tag'))
        return
    }

    const lib = await api(meta.zoteroAPIKey).library('user', meta.zoteroProfileID)

    async function addDataToItems(items) {

        async function mapper(item) {
            try {
                item.data.parsedDate = item.meta.parsedDate
                if (item.data.creators) {
                    const author = item.data?.creators[0]
                    const firstName = (author?.firstName ? author?.firstName.slice(0, 1).toUpperCase() : "")
                    const lastName = author?.lastName
                    if (lastName) {
                        item.data.author = firstName + '. ' + lastName + " et al. ~"
                    }
                }
                if (item.meta.numChildren) {
                    const attachments =

                        await cache("attachments-" + item.key, "4w", 'json', async function () {
                            return await lib.items(item.key).children().get({ itemType: 'attachment' })
                        })
                    const data = await cache("attachments-data-" + item.key, "4w", 'json', () => attachments.getData())

                    data.forEach(attachment => {
                        if (attachment.itemType === 'attachment' && new RegExp(/(.pdf$|.pdf?)/).test(attachment.url)) {
                            item.data.attachmentURL = attachment.url
                        }
                    })
                }
                return item.data
            }
            catch (error) {

            }
        }
        return await pMap(items, mapper, { concurrency: 20 })
    }

    async function getOtherPages(totalCount, options) {
        // on construit une liste de tous les offsets pour envoyer un batch de requêtes
        // Par exemple s'il y a 1000 items, on va demander les items à partir du centième, puis du deux-centième, puis du trois-centième...
        // Les items de 0 à 100 ont déjà été obtenus plus haut.
        let offsetList = []
        let index = 0
        while (index < totalCount) {
            index = index + options.limit
            offsetList.push(index)
        }

        const mapper = async (offset) => {
            return await lib.collections(requestedCollection).items().top().get({ start: offset, ...options })
        }
        var otherPagesItems = await pMap(offsetList, mapper, { concurrency: 20 })

        // l'API renvoie un tableau d'objets. On extrait de chaque élement du tableau la clé "raw"
        // L'API a une méthode .getData() qui fournit directement un tableau des items. On ne peut pas l'utiliser et concaténer ces tableaux
        // Car la fonction addDataToItems() a besoin de certaines données présentes dans .raw.meta et pas via .getData()
        const concatenedOtherItems = otherPagesItems.reduce((accumulator, obj) => {
            return accumulator.concat(obj.raw)
        }, [])

        // ... et l'ajoute aux résultats du premier appel
        return firstPageItems.raw.concat(concatenedOtherItems)
    }


    // Appel d'un fichier de conf global qui appele ensuite les infos de connexion à l'API d'un fichier .env.

    const options = {
        locale: 'fr-FR',
        itemType: '-note',
        sort: 'date',
        limit: 5,
        tag: requestedTags || []
    }

    try {

        //On requête la liste complète des collections pour en extraire l'ID de la collection demandée.
        if (collection) {
            const collectionsCallback = async () => {
                try {
                    const res = await lib.collections().get()
                    return res.getData()
                }
                catch (error) {
                    throw error
                }
            }
            const colls = await cache("collections-" + collection, "4w", 'json', collectionsCallback)

            const collectionObject = colls.filter(coll => coll.name === collection)[0]
            if (!collectionObject) {
                throw Error('catégorie inconnue')
            }
            var requestedCollection = collectionObject.key


            // top() : pour avoir seulement les article et pas les documents enfants.
            // get() : pour indiquer qu'on veut une requête GET et concrètement récupérer les données
            var firstPageItems = await lib.collections(requestedCollection).items().top().get(options)
        }
        else {
            var firstPageItems = await lib.items().top().get(options)
        }

        if (firstPageItems.raw.length === 0) {
            console.log("Zotero : collection vide")
        }
        const totalCount = Number(firstPageItems.response.headers.get('total-results'))

        // Pagination
        // On teste s'il y a plus de résultats que le nombre max requété
        //  L'API renvoie aussi des nfos de pagination dans le header Links, qu'on n'utilise pas ici.
        let items = []

        if (totalCount) {
            if (totalCount > options.limit) {
                items = await cache(`allPages-${collection}-${requestedTags[0]}`, "4w", "json", getOtherPages.bind(null, totalCount, options))
            }
            else {
                items = firstPageItems.raw
            }
        }

        // Cette fonction récupère des données supplémentaires
        // - une date parsée par Zotero, qu'on espère plus propre que le champ d'origine
        // - un lien direct vers un PDF, tiré des pièces jointes.
        const completedItems = await addDataToItems(items)

        const html = await renderNunjucks("shortcodes/zotero_component.njk",
            { items: completedItems },
            [dateFormatting, markdownify]
        )

        return html
    }
    catch (error) {
        //403 : mauvaises infos de connexion
        // 500 : requête mal formée
        console.log(error)
    }

}

// Idée :	Format biblio APA https://www.npmjs.com/package/citation-js
