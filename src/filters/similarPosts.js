export default function similarPosts(collection, path, categories) {

    const getSimilarCategories = function (categoriesA, categoriesB) {
        return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length
    }
    return collection.filter((post) => {
        return getSimilarCategories(post.data.categories, categories) >= 1 && post.data.page.inputPath !== path
    }).sort((a, b) => {
        return getSimilarCategories(b.data.categories, categories) - getSimilarCategories(a.data.categories, categories)
    })
}