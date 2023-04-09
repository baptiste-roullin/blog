// https://github.com/nhoizey/images-responsiver/
// https://github.com/google/eleventy-high-performance-blog


import path from 'path'
require('dotenv').config()

const { parseHTML } = require('linkedom')
import handleGIFs from './handle_GIFs'
import handlePictures from './handle_pictures'

const meta = require('../_data/meta')

function reformatURL(src: string, width): string {
	const fullPath = `/${meta.assetsDir}/${path.basename(src)}`

	return fullPath.
		replace(
			/^(.*)(\.[^\.]+)$/,
			'$1-' + width + '.jpg')
}

export default function pictures_processing(html) {

	const globalSettings = {
		selector: `.image-responsiver img[src]:not([srcset]):not([src$='.svg'])`,
		minWidth: 400,
		maxWidth: 1920,
/*		fallbackWidth: 750,
*/		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: reformatURL,
		steps: 5,
		classes: ['img-default'],
		ignore: 'truchet-'
	}

	const { document } = parseHTML(html);

	[...document.querySelectorAll(globalSettings.selector)]
		.filter((image) =>
			!((new RegExp(globalSettings.ignore)).test(image.getAttribute('src')))
		)
		.filter((image) => {
			// filter out images without a src, or not SVG, or with already a srcset
			return (
				image.getAttribute('src') &&
				!image.getAttribute('src').match(/\.svg$/) &&
				!image.getAttribute('srcset')
			)
		})
		.forEach(async (image) => {

			if (image.getAttribute('src').match(/\.gif$/)) {
				await handleGIFs(image)
			}
			else {
				handlePictures(image, document, globalSettings)
			}
		})

	return document.toString()
};

