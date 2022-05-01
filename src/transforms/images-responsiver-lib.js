// https://github.com/nhoizey/images-responsiver/
// https://github.com/google/eleventy-high-performance-blog


const debug = require('debug');
const error = debug('images-responsiver:error');
const warning = debug('images-responsiver:warning');
const info = debug('images-responsiver:info');
require('dotenv').config()
const convertPictures = require("@11ty/eleventy-img");
import path from "path";
const { promisify } = require("util");
const { join } = require("path");
const exec = promisify(require("child_process").exec);
const pathToFfmpeg = require("ffmpeg-static");
const { parseHTML } = require('linkedom');
import path from "path";
const meta = require('../_data/meta.js')


const formats = (
	process.env.NODE_ENV === "production"
		?
		['webp', 'jpeg']
		:
		['jpeg']
)

function normalizePath(str) {
	return decodeURI(str.replace(/^\s(.*)\s$/g, "$1"))
}

const imageSettings = {
	selector: " #content :not(picture) > img[src]:not([srcset]):not([src$='.svg'])",
	minWidth: 360,
	maxWidth: 1920,
	fallbackWidth: 750,
	sizes: '(max-width: 60rem) 90vw, 60rem',
	resizedImageUrl: (src, width) => {
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

		const imageDimensions = convertPictures.statsSync(intermediaryPath, { statsOnly: true, formats: ["webp"] });

		image.setAttribute('width', imageDimensions.webp[0].width);
		image.setAttribute('height', imageDimensions.webp[0].height);

		const options = {
			sharpWebpOptions: {
				quality: 90,
			},
			widths: [360, 750, imageDimensions.width, 1140, 1530, 1920],
			dryRun: false,
			formats: formats,
			urlPath: '/assets/imagesToProcess/',
			outputDir: `./${meta.outputDir}/${meta.assetsDir}/`,
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				const modifiedFormat = (format === 'jpeg' ? 'jpg' : format);
				return `${name}-${width}.${modifiedFormat}`;
			}
		}

		convertPictures(intermediaryPath, options);

		image.dataset.responsiver = image.className;
		//image.dataset.responsiveruRL = metadata.jpg.url;
		image.dataset.size = image.className;

	}
	catch (e) {
		console.log("debug images-resp: " + originalPath + "  " + e)
	}
}


function prepareForLighbox(image, document) {
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


async function convertGIFs(name, convertedName, outPath) {

	const exists = promisify(require("fs").exists);
	if (await exists(convertedName)) {
		return convertedName;
	}
	const command = `${pathToFfmpeg} -y -v error -i \"${join('src/assets/imagesToProcess', name)}\" -filter_complex \"[0:v] crop=trunc(iw/2)*2:trunc(ih/2)*2, fps=15\" -vsync 0 -f mp4 -pix_fmt yuv420p \"${join(outPath, convertedName)}\"`
	try {
		await exec(command);
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(`Failed executing ${command} with ${e.message}`);
		}
	}
};


function handlePictures(image, document, imageSettings) {
	convertPictures(image, document);

	const imageSrc = image.getAttribute('src');
	info(`Transforming ${imageSrc}`);

	const imageWidth = image.getAttribute('width');
	if (imageWidth === null) {
		warning(`The image should have a width attribute: ${imageSrc}`);
	}

	let srcsetList = [];
	if (
		imageSettings.widthsList !== undefined &&
		imageSettings.widthsList.length > 0
	) {
		// Priority to the list of image widths for srcset
		// Make sure there are no duplicates, and sort in ascending order
		imageSettings.widthsList = [...new Set(imageSettings.widthsList)].sort(
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
		);
	} else {
		// We don't have a list of widths for srcset, we have to compute them

		// Make sure there are at least 2 steps for minWidth and maxWidth
		if (imageSettings.steps < 2) {
			warning(
				`Steps should be >= 2: ${imageSettings.steps} step for ${imageSrc}`
			);
			imageSettings.steps = 2;
		}

		// Make sure maxWidth > minWidth
		// (even if there would be no issue in `srcset` order)
		if (imageSettings.minWidth > imageSettings.maxWidth) {
			warning(`Combined options have minWidth > maxWidth for ${imageSrc}`);
			let tempMin = imageSettings.minWidth;
			imageSettings.minWidth = imageSettings.maxWidth;
			imageSettings.maxWidth = tempMin;
		}

		if (imageWidth !== null) {
			if (imageWidth < imageSettings.minWidth) {
				warning(
					`The image is smaller than minWidth: ${imageWidth} < ${imageSettings.minWidth}`
				);
				imageSettings.minWidth = imageWidth;
			}
			if (imageWidth < imageSettings.fallbackWidth) {
				warning(
					`The image is smaller than fallbackWidth: ${imageWidth} < ${imageSettings.fallbackWidth}`
				);
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
				warning(
					`The image is smaller than maxWidth: ${imageWidth} < ${imageSettings.maxWidth}`
				);
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

function handleGIFs(img, document, imageSettings) {
	const outPath = `${meta.outputDir}/${meta.assetsDir}/`
	let src = img.getAttribute("src");
	const name = path.basename(src)
	const convertedName = name.replace(/\.\w+$/, (_) => ".mp4");

	const video = img.ownerDocument.createElement("video");
	[...img.attributes].map(({ name, value }) => {
		video.setAttribute(name, value);
	});

	video.setAttribute('src', join('/' + meta.assetsDir, convertedName))
	video.setAttribute("autoplay", "");
	video.setAttribute("muted", "");
	video.setAttribute("loop", "");
	if (!video.getAttribute("aria-label")) {
		video.setAttribute("aria-label", img.getAttribute("alt"));
		video.removeAttribute("alt");
	}
	const parent = img.parentElement
	if (parent.name === "FIGURE") {
		parent.replaceChild(video, parent);
	}
	else {
		parent.replaceChild(video, img);
	}
	convertGIFs(name, convertedName, outPath);
}


module.exports = (html, options = {}) => {

	const { document } = parseHTML(html);

	[...document.querySelectorAll(imageSettings.selector)]
		.filter((image) =>
			!((new RegExp(imageSettings.ignore)).test(image.getAttribute('src')))
		)
		.filter((image) => {
			// filter out images without a src, or not SVG, or with already a srcset
			return (
				image.getAttribute('src') !== null &&
				!image.getAttribute('src').match(/\.svg$/) &&
				image.getAttribute('srcset') === null
			);
		})
		.forEach(async (image) => {

			if (image.getAttribute('src').match(/\.gif$/)) {
				await handleGIFs(image, document, imageSettings)
			}
			else {
				handlePictures(image, document, imageSettings)
			}
		});

	return document.toString();
};

