
require('dotenv').config()
const convertPicturesLibrary = require("@11ty/eleventy-img");
import path from "path";
require('dotenv').config()
const meta = require('../_data/meta.js')
const clonedeep = require('lodash.clonedeep');


function normalizePath(str) {
	return decodeURI(str.replace(/^\s(.*)\s$/g, "$1"))
}

export const globalSettings = {
	selector: " #content :not(picture) > img[src]:not([srcset]):not([src$='.svg'])",
	minWidth: 360,
	maxWidth: 1920,
	fallbackWidth: 750,
	sizes: '(max-width: 60rem) 90vw, 60rem',
	resizedImageUrl: (src: string, width): string => {
		const fullPath = `/${meta.assetsDir}/${path.basename(src)}`

		return fullPath.
			replace(
				/^(.*)(\.[^\.]+)$/,
				'$1-' + width + '.jpg')
	},
	steps: 5,
	classes: ['img-default'],
	attributes: { loading: 'lazy', },
	ignore: 'truchet-'

};



function convertPictures(image, document) {



	let originalPath = normalizePath(image.getAttribute('src'))
	const intermediaryPath = "src/assets/imagesToProcess/" + path.basename(originalPath)

	try {
		// TODO : Tester cache. Par exemple "truchet-interet legitime.jpg" est-il mis en cache une seule fois.

		const imageDimensions = convertPicturesLibrary.statsSync(intermediaryPath, { statsOnly: true, formats: ["webp"] });

		image.setAttribute('width', imageDimensions.webp[0].width);
		image.setAttribute('height', imageDimensions.webp[0].height);

		const options = {
			sharpWebpOptions: {
				quality: 90,
			},
			widths: [360, 750, imageDimensions.width, 1140, 1530, 1920],
			dryRun: false,
			formats: (
				process.env.NODE_ENV === "production"
					?
					['webp', 'jpeg']
					:
					['jpeg']
			),
			urlPath: '/assets/imagesToProcess/',
			outputDir: `./${meta.outputDir}/${meta.assetsDir}/`,
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				const modifiedFormat = (format === 'jpeg' ? 'jpg' : format);
				return `${name}-${width}.${modifiedFormat}`;
			}
		}
		convertPicturesLibrary(intermediaryPath, options);

		image.dataset.responsiver = image.className;
		//image.dataset.responsiveruRL = metadata.jpg.url;
		image.dataset.size = image.className;

	}
	catch (e) {
		console.log("debug images-resp: " + originalPath + "  " + e)
	}
}


export function prepareForLighbox(image, document) {
	//image.setAttribute('src', image.dataset.responsiveruRL);
	//let caption = image.getAttribute("title");
	if (image.closest('.rich-picture')) {
		const link = document.createElement("a");
		link.setAttribute("data-pswp-srcset", image.getAttribute('srcset'));

		link.setAttribute("href", image.getAttribute('src'));
		link.appendChild(image.cloneNode(true));
		link.setAttribute('data-pswp-width', image.width);
		link.setAttribute('data-pswp-height', image.height);
		image.replaceWith(link);
	}
}

export function handlePictures(image, document, globalSettings) {

	let imageSettings = clonedeep(globalSettings);
	convertPictures(image, document);

	const imageSrc = image.getAttribute('src') as string;
	console.log(`Transforming ${imageSrc}`);

	const imageWidth = image.getAttribute('width');

	if (imageWidth === null) {
		console.log(`The image should have a width attribute: ${imageSrc}`);
	}

	let srcsetList: string[] = [];
	if (
		imageSettings.widthsList !== undefined &&
		imageSettings.widthsList.length > 0
	) {
		// TODO : redéfinir une widthslist (ou pas ?)


		// Priority to the list of image widths for srcset
		// Make sure there are no duplicates, and sort in ascending order
		/*		imageSettings.widthsList = [...new Set(imageSettings.widthsList)].sort(
					(a, b) => a - b
				);
				const widthsListLength = imageSettings.widthsList.length;
				if (imageWidth !== null) {
					// Filter out widths superiors to the image's width
					imageSettings.widthsList = imageSettings.widthsList.filter(
						(width) => width <= imageWidth
					);
					if (
						imageSettings.widthsList.length < widthsListLength &&
						(imageSettings.widthsList.length === 0 ||
							imageSettings.widthsList[imageSettings.widthsList.length - 1] !==
							imageWidth)
					) {
						// At least one value was removed because superior to the image's width
						// Let's replace it/them with the image's width
						imageSettings.widthsList.push(imageWidth);
					}
				}
				// generate the srcset attribute
				srcsetList = imageSettings.widthsList.map(
					(width) =>
						`${imageSettings.resizedImageUrl(imageSrc, width)} ${width}w`
				);*/
	} else {
		// We don't have a list of widths for srcset, we have to compute them

		// Make sure there are at least 2 steps for minWidth and maxWidth
		if (imageSettings.steps < 2) {
			//console.log(`Steps should be >= 2: ${imageSettings.steps} step for ${imageSrc}`);
			imageSettings.steps = 2;
		}

		// Make sure maxWidth > minWidth
		// (even if there would be no issue in `srcset` order)
		if (imageSettings.minWidth > imageSettings.maxWidth) {
			console.log(`Combined options have minWidth > maxWidth for ${imageSrc}`);
			let tempMin = imageSettings.minWidth;
			imageSettings.minWidth = imageSettings.maxWidth;
			imageSettings.maxWidth = tempMin;
		}

		if (imageWidth !== null) {
			if (imageWidth < imageSettings.minWidth) {
				console.log(`The image is smaller than minWidth: ${imageWidth} < ${imageSettings.minWidth}`);
				imageSettings.minWidth = imageWidth;
			}
			if (imageWidth < imageSettings.fallbackWidth) {
				console.log(`The image is smaller than fallbackWidth: ${imageWidth} < ${imageSettings.fallbackWidth}`);
				imageSettings.fallbackWidth = imageWidth;
			}
		}

		// generate the srcset attribute
		let previousStepWidth = 0;
		for (let i = 0; i < imageSettings.steps; i++) {
			let stepWidth = Math.ceil(
				imageSettings.minWidth +
				((imageSettings.maxWidth - imageSettings.minWidth) /
					(imageSettings.steps - 1)) *
				i
			);

			if (imageWidth !== null && stepWidth >= imageWidth) {
				console.log(`The image is smaller than maxWidth: ${imageWidth} < ${imageSettings.maxWidth}`);
				srcsetList.push(
					`${imageSettings.resizedImageUrl(
						imageSrc,
						imageWidth
					)} ${imageWidth}w`
				);
				break;
			}
			if (stepWidth === previousStepWidth) {
				// Don't set twice the same image width
				continue;
			}
			previousStepWidth = stepWidth;
			srcsetList.push(
				`${imageSettings.resizedImageUrl(
					imageSrc,
					stepWidth
				)} ${stepWidth}w`
			);
		}
	}

	if (imageSettings.classes.length > 0) {
		image.classList.add(...imageSettings.classes);
	}

	// Change the image source
	image.setAttribute(
		'src',
		imageSettings.resizedImageUrl(imageSrc, imageSettings.fallbackWidth)
	);

	image.setAttribute('srcset', srcsetList.join(', '));

	// add sizes attribute
	image.setAttribute('sizes', imageSettings.sizes);

	// add 'data-pristine' attribute with URL of the pristine image
	image.dataset.pristine = imageSrc;

	// Add attributes from the preset
	if (Object.keys(imageSettings.attributes).length > 0) {
		for (const attribute in imageSettings.attributes) {
			if (imageSettings.attributes[attribute] !== null) {
				image.setAttribute(attribute, imageSettings.attributes[attribute]);
			}
		}
	}

	prepareForLighbox(image, document);
}