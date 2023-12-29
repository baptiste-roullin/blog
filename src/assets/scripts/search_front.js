//TODO : pré-compiler à la main postListItem.njk dans search_back.ts
// puis en front => https://mozilla.github.io/nunjucks/fr/api.html#utilisation-dans-un-navigateur



//const { nunjucks } = require('nunjucks/browser/nunjucks-slim')

//TODO : changer expiration js coté serveur
import dateHumanFormat from './date_formatting.js'
import removeMD from './remove_MD.js'

async function search(e) {
    e.preventDefault()
    try {
        console.log(window.nunjucks)

        const env = window.nunjucks.configure('', { autoescape: true, trimBlocks: true, lstripBlocks: true })
        console.log(env)
        env.addFilter("removeMD", removeMD)
        env.addFilter("dateHumanFormat", dateHumanFormat)
        var res = env.render('src/_templates/components/posts_list_item.njk', {})
    } catch (error) {
        console.log(error)
    }


    const pagefind = await import("/blog/pagefind/pagefind.js")
    const search = await pagefind.debouncedSearch("static", {/* options */ }, 300)
    const value = e.target[0].value
    const results = await pagefind.debouncedSearch(value)

    const noResultsEl = document.getElementById("noResultsFound")
    const container = document.querySelector('.post-wrapper')
    const postList = container.children[0]
    const searchList = container.children[1]

    if (!value) {
        console.log('champ vide')
        postList.style.display = 'flex'
        searchList.style.display = 'none'
    }
    else {
        postList.style.display = 'none'
        searchList.style.display = 'flex'
        while (searchList.hasChildNodes()) {
            searchList.removeChild(searchList.lastChild)
        }
        if (results.length > 0) {

            noResultsEl.style.display = "none"
            results.forEach((r) => {
                const doc = window.searchIndex.documentStore.getDoc(r.ref)

                let { url, title, description, date, fileSlug, collatedHeroImage } = doc

                const el = nunjucks.render('src/_templates/components/posts_list_item.njk', {
                    postListItemStyle: { complete: 'complete' },
                    post: {
                        url,
                        data: {
                            collatedHeroImage: collatedHeroImage,
                            title,
                            description,
                            page: {
                                date,
                                description,
                                fileSlug,
                            }
                        }
                    }
                })
                searchList.insertAdjacentHTML('beforeend', el)
            })
        } else {
            console.log('no results')
            noResultsEl.style.display = "block"
        }
    }

};


document.addEventListener('DOMContentLoaded', async function () {


    document.getElementById("search-form")
        .addEventListener("submit", search)

    document.getElementById("search-form")
        .addEventListener("input", async function (e) {


        })

})

