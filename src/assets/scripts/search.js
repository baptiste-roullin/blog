// @ts-nocheck

const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
//@ts-ignore
import postlistitem from '../../../src/_templates/components/postlistitem.njk'


//"use strict"

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
		if (results.length > 0) {

			noResultsEl.style.display = "none";
			results.map((r) => {
				const doc = window.searchIndex.documentStore.getDoc(r.ref)

				let { url, title, description, date, fileSlug, collatedImage } = doc;

				const el = postlistitem({
					postListItemStyle: { complete: 'complete' },
					post: {
						url,
						data: {
							collatedImage: collatedImage,
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

};

document.getElementById("search-form")
	.addEventListener("submit", search);

document.getElementById("search-form")
	.addEventListener("input", async function () {
		if (!window.searchIndex) {
			const rawIndex = await fetch("/index.min.json")
			window.searchIndex = elasticlunr.Index.load(await rawIndex.json());
		}
	});
