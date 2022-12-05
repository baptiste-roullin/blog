
require('dotenv').config()
const convertPicturesLibrary = require("@11ty/eleventy-img")
const clonedeep = require('lodash.clonedeep')
const meta = require('../_data/meta')
const debug = require('debug')
const warning = debug('tcqb:warning')
import path from 'path'
//import cache from '../utils/caching'


function normalizePath(str) {
	return decodeURI(str.replace(/^\s(.*)\s$/g, "$1"))
}


async function convertPictures(image, widthsList, originalPath, intermediaryPath) {
	try {
		const options = {
			sharpWebpOptions: {
				quality: 90,
			},
			widths: widthsList,
			dryRun: false,
			formats: (
				meta.env === "production"
					?
					['jpeg']
					:
					['jpeg']
			),
			urlPath: '/assets/imagesToProcess/',
			outputDir: `./${meta.outputDir}/${meta.assetsDir}/`,
			filenameFormat: function (id, src, width, format) {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				const modifiedFormat = (format === 'jpeg' ? 'jpg' : format)
				return `${name}-${width}.${modifiedFormat}`
			}
		}
		convertPicturesLibrary(intermediaryPath, options)
		image.dataset.responsiver = image.className
		//image.dataset.responsiveruRL = metadata.jpg.url;
		image.dataset.size = image.className
	}
	catch (e) {
		console.log("debug images-resp: " + originalPath + "  " + e)
	}
}

function generateList(imageSettings, imageWidth, imageSrc) {
	if (imageWidth === null) {
		warning(`The image should have a width attribute: ${imageSrc}`)
	}

	let srcsetList: string[] = []
	let widthsList: number[] = []

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

			srcsetList.push(
				`${imageSettings.resizedImageUrl(
					imageSrc,
					stepWidth
				)} ${stepWidth}w`
			)
		}
	}

	return { srcsetList, widthsList }
}


function prepareForLighbox(image, document) {
	//image.setAttribute('src', image.dataset.responsiveruRL);
	//let caption = image.getAttribute("title");
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


export default function handlePictures(image, document, globalSettings) {

	try {
		let originalPath = normalizePath(image.getAttribute('src'))
		const intermediaryPath = "src/assets/imagesToProcess/" + path.basename(originalPath)
		let imageSettings = clonedeep(globalSettings)

		const imageDimensions = convertPicturesLibrary.statsSync(intermediaryPath, { statsOnly: true, formats: ["webp"] })
		image.setAttribute('width', imageDimensions.webp[0].width)
		image.setAttribute('height', imageDimensions.webp[0].height)


		const imageSrc = image.getAttribute('src') as string
		const imageWidth = image.getAttribute('width')
		warning(`Transforming ${imageSrc}`)


		const { widthsList, srcsetList } = generateList(imageSettings, imageWidth, imageSrc)


		if (imageSettings.classes.length > 0) {
			image.classList.add(...imageSettings.classes)
		}
		// Change the image source
		image.setAttribute(
			'src',
			imageSettings.resizedImageUrl(imageSrc, imageSettings.fallbackWidth)
		)
		image.setAttribute('srcset', srcsetList.join(', '))
		// add sizes attribute
		image.setAttribute('sizes', imageSettings.sizes)

		// add 'data-pristine' attribute with URL of the pristine image
		image.dataset.pristine = imageSrc

		// Add attributes from the preset
		if (Object.keys(imageSettings.attributes).length > 0) {
			for (const attribute in imageSettings.attributes) {
				if (imageSettings.attributes[attribute] !== null) {
					image.setAttribute(attribute, imageSettings.attributes[attribute])
				}
			}
		}

		convertPictures(image, widthsList, originalPath, intermediaryPath)


		prepareForLighbox(image, document)
	} catch (e) {
		console.log(e)

	}
}