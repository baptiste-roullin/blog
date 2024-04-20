import dotenv from 'dotenv'
dotenv.config()
import path from 'node:path'
import convertPicturesLibrary from "@11ty/eleventy-img"
import clonedeep from 'lodash.clonedeep'
import debug from 'debug'
import { parseHTML } from 'linkedom'
const warning = debug('pictures:warning')

import meta from '../_data/meta.js'

function reformatURL(src, width) {
	const fullPath = `/${meta.assetsDir}/${path.basename(src)}`

	return fullPath.
		replace(
			/^(.*)(\.[^\.]+)$/,
			'$1-' + width + '.jpg')
}


function generateSrcList(imageSettings, imageWidth, imageSrc) {
	if (imageWidth === null) {
		warning(`The image should have a width attribute: ${imageSrc}`)
	}

	let srcsetList = []
	let widthsList = []

	if (
		imageSettings.widthsList !== undefined &&
		imageSettings.widthsList.length > 0
	) {

	} else {
		// We don't have a list of widths for srcset, we have to compute them

		// Make sure there are at least 2 steps for minWidth and maxWidth
		if (imageSettings.steps < 2) {
			warning(`Steps should be >= 2: ${imageSettings.steps} step for ${imageSrc}`)
			imageSettings.steps = 2
		}

		// Make sure maxWidth > minWidth
		// (even if there would be no issue in `srcset` order)
		if (imageSettings.minWidth > imageSettings.maxWidth) {
			warning(`Combined options have minWidth > maxWidth for ${imageSrc}`)
			let tempMin = imageSettings.minWidth
			imageSettings.minWidth = imageSettings.maxWidth
			imageSettings.maxWidth = tempMin
		}

		if (imageWidth !== null) {
			if (imageWidth < imageSettings.minWidth) {
				warning(`The image is smaller than minWidth: ${imageWidth} < ${imageSettings.minWidth}`)
				imageSettings.minWidth = imageWidth
			}
			if (imageWidth < imageSettings.fallbackWidth) {
				warning(`The image is smaller than fallbackWidth: ${imageWidth} < ${imageSettings.fallbackWidth}`)
				imageSettings.fallbackWidth = imageWidth
			}
		}

		// generate the srcset attribute
		let previousStepWidth = 0
		for (let i = 0; i < imageSettings.steps; i++) {
			let stepWidth = Math.ceil(
				imageSettings.minWidth +
				(
					(imageSettings.maxWidth - imageSettings.minWidth) /
					(imageSettings.steps - 1)
				) * i
			)

			if (imageWidth !== null && stepWidth >= imageWidth) {
				warning(`The image is smaller than maxWidth: ${imageWidth} < ${imageSettings.maxWidth}`)
				widthsList.push(imageWidth)

				srcsetList.push(
					`${imageSettings.resizedImageUrl(
						imageSrc,
						imageWidth
					)} ${imageWidth}w`
				)
				break
			}
			if (stepWidth === previousStepWidth) {
				// Don't set twice the same image width
				continue
			}
			previousStepWidth = stepWidth
			widthsList.push(stepWidth)
			const url = imageSettings.resizedImageUrl(imageSrc, stepWidth)
			srcsetList.push(`${url} ${stepWidth}w`)
		}
	}

	return { srcsetList, widthsList }
}


function prepareForLighbox(image, document) {
	if (image.closest('.rich-picture')) {
		const link = document.createElement("a")
		link.setAttribute("data-pswp-srcset", image.getAttribute('srcset'))

		link.setAttribute("href", image.getAttribute('src'))
		link.appendChild(image.cloneNode(true))
		link.setAttribute('data-pswp-width', image.width)
		link.setAttribute('data-pswp-height', image.height)
		image.replaceWith(link)
	}
}


function handleImg(image, document, globalSettings) {

	try {
		let originalPath = path.normalize(image.getAttribute('src'))
		const intermediaryPath = "src/assets/imagesToProcess/" + path.basename(originalPath)
		let imageSettings = clonedeep(globalSettings)

		const imageDimensions = convertPicturesLibrary.statsSync(intermediaryPath, { statsOnly: true, formats: ["webp"] })
		const originalWidth = imageDimensions.webp[0].width
		image.setAttribute('width', originalWidth)
		image.setAttribute('height', imageDimensions.webp[0].height)


		const imageSrc = image.getAttribute('src')
		const imageWidth = image.getAttribute('width')
		warning(`Transforming ${imageSrc}`)


		let { widthsList, srcsetList } = generateSrcList(imageSettings, imageWidth, imageSrc)
		widthsList.push(originalWidth)

		if (imageSettings.fallbackWidth) {
			image.setAttribute(
				'src',
				imageSettings.resizedImageUrl(imageSrc, imageSettings.fallbackWidth)
			)
		}
		image.setAttribute('srcset', srcsetList.join(', '))
		// add sizes attribute
		image.setAttribute('sizes', imageSettings.sizes)
		image.dataset.responsiver = image.dataAttribute
		// add 'data-pristine' attribute with URL of the pristine image
		image.dataset.pristine = imageSrc
		if (!image.getAttribute("data-hero")) {
			image.setAttribute("loading", "lazy")
		}
		let options = {
			sharpOptions: {
				animated: true,
			},
			sharpWebpOptions: {
				quality: 90,
			},
			widths: widthsList,
			dryRun: false,
			formats: ['webp'],
			urlPath: '/assets/imagesToProcess/',
			outputDir: `./${meta.outputDir}/${meta.assetsDir}/`,
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}-${width}.${options.formats[0]}`
			}
		}
		try {

			convertPicturesLibrary(intermediaryPath, options)

		}
		catch (e) {
			console.log("debug images-resp: " + intermediaryPath + "  " + e)
		}


		prepareForLighbox(image, document)
	} catch (e) {
		console.log(e)

	}
}

export default function findImg(html, outputPath) {

	const contentPagesSettings = {
		selector: `.image-responsiver-content img[src]:not([srcset]):not([src$='.svg'])`,
		minWidth: 400,
		maxWidth: 1920,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: reformatURL,
		steps: 5,
		dataAttribute: 'img-content-page',
	}


	let listPagesSettings = {
		selector: `.image-responsiver-list img[src]:not([srcset]):not([src$='.svg'])`,
		minWidth: 300,
		maxWidth: 600,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: reformatURL,
		steps: 2,
		dataAttribute: 'img-list-page',
		ignore: 'truchet-'
	}

	if (outputPath && outputPath.endsWith('.html')) {
		const { document } = parseHTML(html);

		[...document.querySelectorAll(contentPagesSettings.selector)].forEach(async (image) => {
			handleImg(image, document, contentPagesSettings)
		});

		[...document.querySelectorAll(listPagesSettings.selector)].
			filter((image) =>
				!((new RegExp(listPagesSettings.ignore)).test(image.getAttribute('src')))
			)
			.forEach(async (image) => {
				handleImg(image, document, listPagesSettings)
			})

		return document.toString()
	}
	else { return html }
}


