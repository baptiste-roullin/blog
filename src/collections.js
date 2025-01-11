import meta from './_data/meta.js'
import truchetNode from './features/truchet/truchet_node.js'
import fileExists from './utils/fileExists.js'


/** @param {boolean | string} value
 * @returns {any}
 */
function getPublishedByField(collectionAPI, field, value) {

    return collectionAPI.getAllSorted().
        filter((item) => item.data[field] === value).
        // addPreprocessor n'est en fait pas plus dans mon contexte. https://github.com/11ty/eleventy/issues/188
        filter((post) => !post.data.draft)
}
export const collections = {

    publishedPosts: function (collectionAPI) {
        return getPublishedByField(collectionAPI, 'type', 'post')
    },

    tagList: function (collectionAPI) {
        let tagDictionary = {}

        getPublishedByField(collectionAPI, 'type', 'post')
            .forEach(function (item) {
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
        return getPublishedByField(collectionAPI, 'featured', true)
    },

    projectsList: async function (collectionAPI) {
        const projects = collectionAPI.items[0].data.projects

        const collatedProjects = await Promise.all(projects.map(async (project) => {
            if (!project.img) {

                //chemin absolu
                project.img = `${meta.outputDir}/${meta.assetsDir}/truchet-${project.name}.png`
                //TODO
                //const projectExists = await fileExists(process.cwd() + project.img)
                //if (!projectExists) {
                if (true) {
                    //  await truchetNode(400, 400, project.img).catch(console.error)
                }
            }
            return project
        }))
        return collatedProjects
    },

}
