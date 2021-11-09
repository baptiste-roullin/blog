// @ts-nocheck

/*TODO trier et filtrer tag par nombre d'article */
/* TODO Fix certaines images */
const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
//@ts-ignore
import postlistitem from '../../../src/_templates/components/postlistitembig.njk'


//"use strict"


function renderResults(refs, value) {
	const noResultsEl = document.getElementById("noResultsFound");
	const container = document.querySelector('.post-wrapper');
	const postList = container.children[0]
	const searchList = container.children[1]

	if (!value) {
		console.log('champ vide')
		postList.style.display = 'flex'
		searchList.style.display = 'none';
	}
	else {
		postList.style.display = 'none';
		searchList.style.display = 'flex';
		searchList.classList.add("flex-col", "gap-8", "my-10", "post-list")
		while (searchList.hasChildNodes()) {
			searchList.removeChild(searchList.lastChild)
		}

		if (refs.length > 0) {

			noResultsEl.style.display = "none";
			refs.map((ref) => {

				const doc = window.searchIndex.documentStore.getDoc(ref)

				let { url, title, description, date, fileSlug, } = doc;

				if (doc.hero) {
					var { hero } = doc
				}
				const el = postlistitem({
					postListItemStyle: {
						complete: 'complete'
					},
					post: {
						url,
						data: {
							hero: {
								image: '/assets/generatedImages/' + hero?.image
							},
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
				searchList.insertAdjacentHTML('afterbegin', el);
			});
		} else {
			console.log('no results')
			noResultsEl.style.display = "block";
		}
	}
}


async function search(e) {
	e.preventDefault();
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
		});

	const refs = results.map(res => res.ref)
	renderResults(refs, value)

};


async function searchField(e) {

	e.preventDefault();
	var config = new elasticlunr.Configuration(
		JSON.stringify({
			bool: "OR",
			expand: false,
			fields: {
				tags: { boost: 5 },
			}
		}), ["tags"])
	const value = e.target.textContent

	const results = window
		.searchIndex
		.fieldSearch([value.toLowerCase()], "tags", config.config)

	renderResults(Object.keys(results), value)

};


document.getElementById("search-form")
	.addEventListener("submit", search);


window.addEventListener("load", async function () {
	if (!window.searchIndex) {
		const rawIndex = await fetch("/index.min.json")
		window.searchIndex = elasticlunr.Index.load(await rawIndex.json());
	}
});


[...document.querySelectorAll('.tagpills a')].forEach(async el => {

	el.addEventListener("click", function (e) {
		searchField(e)
	})


})