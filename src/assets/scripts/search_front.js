
export async function search(e) {


    e.preventDefault()
    const value = e.target[0].value
    const { results } = await pagefind.search(value)
    //const results = await pagefind.debouncedSearch(value)

    /*    const results = window
    .searchIndex
    .search(value, {
        bool: "OR",
        expand: true,
        fields: {
            title: { boost: 8 },
            description: { boost: 5 },
            tags: { boost: 5 },
            content: { boost: 2 },
        }
    })*/
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
            results.forEach(async (r) => {
                const doc = await r.data()

                let { url, meta, description } = doc

                const createComponent = await import('../../_templates/components/posts_list_item.njk')

                const el = createComponent({
                    postListItemStyle: { complete: 'complete' },
                    post: {
                        url,
                        data: {
                            collatedHeroImage: meta.collatedHeroImage,
                            title: meta.title,
                            description,
                            page: {
                                date: meta.date,
                                description,
                                url,
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

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("search-form")
        .addEventListener("submit", search)

    document.getElementById("search-form")
        .addEventListener("input", async function (e) {
            if (!window.pagefind) {

                const pagefind = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js")

                window.pagefind = pagefind
            }

        })

})
