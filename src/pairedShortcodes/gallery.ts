import md from '../markdown.ts'
import { parseHTML } from 'linkedom'
import setAttributes from '../utils/setAttributes.ts'
import Image from "@11ty/eleventy-img"
import pathUtils from "node:path"
export default async function gallery(data) {


	/*
   on veut obtenir :
	div.picture-gallery
		figure
			 a
			   img
			   caption (optional)
	*/

	let html = md.render(data)
	if (html.match('^<ul>')) {
		console.log('Beware: gallery shortcode must be a flat succession of img without paragraph breaks')
	}

	const { document } = parseHTML(html)

	for await (const figure of document.querySelectorAll('figure')) {
		const img = figure.querySelector('img')
		const link = document.createElement("a")
		const src = img.getAttribute("src")
		const path = (
			pathUtils.isAbsolute(src)
				?
				"src/"
				:
				pathUtils.dirname(this.page.inputPath)
		)
		const imageDimensions = await Image(pathUtils.join(path, src), { statsOnly: true, formats: ["webp"] })

		setAttributes(link, {
			"href": src,
			"data-pswp-width": imageDimensions.webp[0].width,
			"data-pswp-height": imageDimensions.webp[0].height
		})

		link.replaceChildren(...figure.childNodes)
		figure.replaceChildren(link)


	}
	let width = ''
	if (data.match(/\!\[/g).length > 1) {
		width = 'container-wide'
	}
	return `<div class="picture-gallery ${width}">${document}</div>`
}

