

import createComponent from '../../_templates/components/posts_list_item.njk'

export async function search(e) {

    e.preventDefault()
    const value = e.target[0].value
    const { results } = await window.pagefind.search(value)

    const noResultsEl = document.getElementById("noResultsFound")
    const container = document.querySelector('#post-list-container')
    const staticPostList = container.children[0]
    const dynamicPostList = container.children[1]

    if (!value) {
        console.log('champ vide')
        staticPostList.style.display = 'flex'
        dynamicPostList.style.display = 'none'
    }
    else {
        staticPostList.style.display = 'none'
        dynamicPostList.style.display = 'flex'
        while (dynamicPostList.hasChildNodes()) {
            dynamicPostList.removeChild(dynamicPostList.lastChild)
        }
        if (results.length > 0) {

            noResultsEl.style.display = "none"
            results.forEach(async (r) => {
                const doc = await r.data()

                let { url, meta, description } = doc

                const el = createComponent({
                    staticPostListItemStyle: { complete: 'complete' },
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
                dynamicPostList.insertAdjacentHTML('beforeend', el)
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
                window.pagefind = await import(/* webpackIgnore: true */ "/pagefind/pagefind.js")
                window.pagefind.preload(e.target.value)
            }

        })

})
