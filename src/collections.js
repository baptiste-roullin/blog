//import normalizeTag from '../filters/normalize_tag'

import meta from './_data/meta.js'
import truchetNode from './features/truchet/truchet_node.js'


/** @returns {boolean} */
const published = (post) => { return !post.data.draft }

/** @param {boolean | string} value
 * @returns {any}
 */
function getbyField(collectionAPI, field, value) {

    return collectionAPI.getAllSorted().
        filter((item) => item.data[field] === value).
        filter(published)
}
export const collections = {

    publishedPosts: function (collectionAPI) {
        return getbyField(collectionAPI, 'type', 'post')
    },

    tagList: function (collectionAPI) {
        let tagDictionary = {}

        getbyField(collectionAPI, 'type', 'post').forEach(function (item) {


            if ('tags' in item.data) {
                let tags = item.data.tags

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

    featured: function (collectionAPI) {
        return getbyField(collectionAPI, 'featured', true)
    },

    projectsList: async function (collectionAPI) {
        const projects = collectionAPI.items[0].data.projects

        const collatedProjects = await Promise.all(projects.map(async (projet) => {
            if (meta.pictures) {
                if (!projet.img) {
                    await truchetNode(projet.name, 400, 400).catch(console.error)
                    //chemin absolu
                    projet.img = `/${meta.assetsDir}/truchet-${projet.name}.png`
                }
            }
            return projet
        }))
        return collatedProjects
    },

}
