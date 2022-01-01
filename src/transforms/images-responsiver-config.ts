require('dotenv').config()
const transformPicture = require("@11ty/eleventy-img");
import path from "path";
const imageSize = require('image-size')

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

module.exports = {

	default: {
		// TODO : Tester cache. Par exemple "truchet-interet legitime.jpg" est-il mis en cache une seule fois.
		selector: " #content :not(picture)  > img[src]:not([srcset]):not([src$='.svg']):not([src$='.gif'])",
		minWidth: 360,
		maxWidth: 1920,
		fallbackWidth: 750,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: (src, width) => {
			const fullPath = '/assets/generatedImages/' + path.basename(src)
			return fullPath.
				replace(
					/^(.*)(\.[^\.]+)$/,
					'$1-' + width + '.jpg')
		},
		runBefore: runBefore,
		runAfter: runAfter,
		steps: 5,
		classes: ['img-default'],
		attributes: { loading: 'lazy', },
	},
	/*
		"post-list": {
			selector: " .post-list :not(picture)  > img[src]:not([srcset]):not([src$='.svg']):not([src$='.gif'])",
			minWidth: 420,
			maxWidth: 420,
			fallbackWidth: 420,
			sizes: '(max-width: 60rem) 90vw, 60rem',
			resizedImageUrl: (src, width) => {
				if (!(new RegExp('^/').test(src)) || src !== "") {
					src = "/assets/generatedImages/" + src
				}
				return src.
					replace(
						/\/assets\/.*\//,
						'/assets/generatedImages/').
					replace(
						/^(.*)(\.[^\.]+)$/,
						'$1-' + width + '.jpg')
			},
			runBefore: runBefore,
			runAfter: runAfter,
			steps: 5,
			classes: ['img-default'],
			attributes: { loading: 'lazy', },
		}*/
}




function runAfter(image, document) {
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


async function runBefore(image, document) {
	let originalPath = normalizePath(image.getAttribute('src'))
	const intermediaryPath = "src/assets/imagesToProcess/" + path.basename(originalPath)

	try {
		const imageDimensions = imageSize(intermediaryPath);
		image.setAttribute('width', imageDimensions.width);
		image.setAttribute('height', imageDimensions.height);

		const options = {
			sharpWebpOptions: {
				quality: 90,
			},
			widths: [360, 750, imageDimensions.width, 1140, 1530, 1920],
			dryRun: false,
			formats: formats,
			urlPath: '/assets/imagesToProcess/',
			outputDir: './dist/assets/generatedImages/',
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src);
				const name = path.basename(src, extension);
				const modifiedFormat = (format === 'jpeg' ? 'jpg' : format);
				return `${name}-${width}.${modifiedFormat}`;
			}
		}

		/*		const exists = promisify(require("fs").exists);
				if (!(await exists(intermediaryPath))) {
					console.log(intermediaryPath + 'debug : existe pas')
				}*/
		await transformPicture(intermediaryPath, options);

		image.dataset.responsiver = image.className;
		//image.dataset.responsiveruRL = metadata.jpg.url;
		image.dataset.size = image.className;

	}
	catch (e) {
		console.log("debug images-resp: " + originalPath + "  " + e)
	}
}