//@ts-ignore
import createComponent from '../../../src/_templates/components/posts_list_item.njk'

// @ts-nocheck
/*
import elasticlunr from "elasticlunr"
import * as stemmer from './lunr.stemmer.support.js'
stemmer(elasticlunr)
import { lunr } from './lunr.fr.js'
lunr(elasticlunr)


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
*/