//TODO : pré-compiler à la main postListItem.njk dans search_back.ts
// puis en front => https://mozilla.github.io/nunjucks/fr/api.html#utilisation-dans-un-navigateur
// @ts-nocheck
async function m(n) {
    n.preventDefault()
    const o = n.target[0].value, { results: t }
        = await pagefind.debouncedSearch(o), l = document.getElementById("noResultsFound"), a = document.querySelector(".post-wrapper"), s = a.children[0], e = a.children[1]
    if (!o) console.log("champ vide"), s.style.display = "flex", e.style.display = "none"
    else {
        for (s.style.display = "none", e.style.display = "flex";
            e.hasChildNodes();
        )e.removeChild(e.lastChild)
        t.length > 0 ? (l.style.display = "none", t.forEach(i => {
            let { url: u, meta: d, description: f, date: c, fileSlug: y, collatedHeroImage: g }
                = i.data()
            console.log(i.data())
            const r = createComponent({
                postListItemStyle: { complete: "complete" }
                , post: {
                    data: {
                        collatedHeroImage: d.image, title: d.title, page: { date: c }
                    }
                }
            }
            )
            e.insertAdjacentHTML("beforeend", r)
        }
        )) : (console.log("no results"), l.style.display = "block")
    }
}
document.addEventListener("DOMContentLoaded", async function () {
    async function n() {
        const t = new URL("/blog/pagefind/pagefind.js", import.meta.url).href
        return await p(() => import(t), __vite__mapDeps([]))
    }
    (await n()).init(), document.getElementById("search-form").addEventListener("submit", m), document.getElementById("search-form").addEventListener("input", async function (t) { }
    )
}
)


//"use strict"

async function search(e) {
    e.preventDefault()
    const value = e.target[0].value

    const results = window
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
        })
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

                const el = createComponent({
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


document.addEventListener('DOMContentLoaded', function () {

    document.getElementById("search-form")
        .addEventListener("submit", search)

    document.getElementById("search-form")
        .addEventListener("input", async function (e) {
            if (!window.searchIndex) {
                const rawIndex = await fetch("/index.min.json")
                window.searchIndex = elasticlunr.Index.load(await rawIndex.json())
            }

        })

})

