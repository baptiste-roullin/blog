import meta from './_data/meta.ts'
import truchetNode from './truchet/truchet_node.ts'

/** @param {boolean | string} value
 * @returns {any}
 */
function getByField(collectionAPI, field, value) {

    return collectionAPI.getAllSorted().
        filter((item) => item.data[field] === value)
    //.filter((post) => !post.data.draft)
}
export const collections: Record<string, Function> = {

    blogPosts: function (collectionAPI) {
        return getByField(collectionAPI, 'type', 'post')
    },

    tagList: function (collectionAPI) {
        let tagDictionary = {}

        getByField(collectionAPI, 'type', 'post')
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
        const sortedtags = Object
            .entries(tagDictionary)
            .sort(
                (a: [string, number], b: [string, number]) => b[1] - a[1]
            )

        return Object.fromEntries(sortedtags)
    },

    featured: function (collectionAPI) {
        return getByField(collectionAPI, 'featured', true)
    },

    projectsList: async function (collectionAPI) {
        const projects = collectionAPI.items[0].data.projects

        const collatedProjects = await Promise.all(projects.map(async (project) => {
            if (!project.img) {
                const path = `${meta.assetsDir}/truchet-${project.name}.png`
                if (true) {
                    await truchetNode(400, 400, "src/" + path).catch(console.error)
                }
                project.img = "/" + path

            }
            return project
        }))
        return collatedProjects
    },

}
