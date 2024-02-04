// https://github.com/nhoizey/images-responsiver/
// https://github.com/google/eleventy-high-performance-blog


import path from 'path'
require('dotenv').config()

const { parseHTML } = require('linkedom')
import handleGIFs from './processing_GIF'
import handlePictures from './procesing_pictures'

const meta = require('../_data/meta')

function reformatURL(src: string, width): string {
	const fullPath = `/${meta.assetsDir}/${path.basename(src)}`

	return fullPath.
		replace(
			/^(.*)(\.[^\.]+)$/,
			'$1-' + width + '.jpg')
}

export default function pictures_processing(html, outputPath) {

	const contentPagesSettings = {
		selector: `.image-responsiver-content img[src]:not([srcset]):not([src$='.svg'])`,
		minWidth: 400,
		maxWidth: 1920,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: reformatURL,
		steps: 5,
		classes: ['img-default'],
		ignore: 'truchet-'
	}


	let listPagesSettings = {
		selector: `.image-responsiver-list img[src]:not([srcset]):not([src$='.svg'])`,
		minWidth: 300,
		maxWidth: 600,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: reformatURL,
		steps: 2,
		classes: ['img-default'],
		ignore: 'truchet-'
	}

	if (
		outputPath &&
		outputPath.endsWith('.html')
		/*&&
		!(outputPath.startsWith('dist/tags/'))*/
	) {
		const { document } = parseHTML(html);

		[...document.querySelectorAll(contentPagesSettings.selector)].forEach(async (image) => {

			if (image.getAttribute('src').match(/\.gif$/)) {
				await handleGIFs(image)
			}
			else {
				handlePictures(image, document, contentPagesSettings)
			}
		});

		[...document.querySelectorAll(listPagesSettings.selector)].forEach(async (image) => {

			if (image.getAttribute('src').match(/\.gif$/)) {
				await handleGIFs(image)
			}
			else {
				handlePictures(image, document, listPagesSettings)
			}
		})

		return document.toString()
	}
	else { return html }
}


