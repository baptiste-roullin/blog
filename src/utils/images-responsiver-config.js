const Image = require("@11ty/eleventy-img");
const path = require("path");
const { promisify } = require("util");
const imageSize = require('image-size');
module.exports = {

	default: {
		selector: '#content :not(picture)  > img[src]:not([srcset]):not([src$=".svg"]):not([src$=".gif"])',
		minWidth: 360,
		maxWidth: 1920,
		fallbackWidth: 750,
		sizes: '(max-width: 60rem) 90vw, 60rem',
		resizedImageUrl: (src, width) => {
			if (!(new RegExp('^/').test(src))) {
				src = "/assets/generatedImages/" + src
			}
			src = src.
				replace(
					/\/assets\/images\//,
					'/assets/generatedImages/'
				).
				replace(
					/^(.*)(\.[^\.]+)$/,
					'$1-' + width + '.jpg')
			return src
		},
		runBefore: async (image, document) => {
			let originalPath = image.getAttribute('src')
			const intermediaryPath = "src/assets/imagesToProcess/" + path.basename(originalPath)

			try {
				imageDimensions = imageSize(intermediaryPath);
				image.setAttribute('width', imageDimensions.width);
				image.setAttribute('height', imageDimensions.height);
			}
			catch (e) {
				console.log("debug:    " + e)
			}


			const options = {
				sharpWebpOptions: {
					quality: 90,
				},
				widths: [360, 750, imageDimensions.width, 1140, 1530, 1920],
				dryRun: false,
				formats: ['webp', 'jpeg'],
				urlPath: '/assets/imagesToProcess/',
				outputDir: './dist/assets/generatedImages/',
				filenameFormat: function (id, src, width, format, options) {
					const extension = path.extname(src);
					const name = path.basename(src, extension);
					const modifiedFormat = (format === 'jpeg' ? 'jpg' : format);
					return `${name}-${width}.${modifiedFormat}`;
				}
			}

			try {
				/*		const exists = promisify(require("fs").exists);
						if (!(await exists(intermediaryPath))) {
							console.log(intermediaryPath + 'debug : existe pas')
						}*/
				const stats = await Image(decodeURI(intermediaryPath), options);

			}
			catch (e) {
				console.log("debug:     " + e)
			}

			image.dataset.responsiver = image.className;
			//image.dataset.responsiveruRL = metadata.jpg.url;
			image.dataset.size = image.className;

		},
		runAfter: (image, document) => {
			//image.setAttribute('src', image.dataset.responsiveruRL);
			//let caption = image.getAttribute("title");
			if (image.closest('.rich-picture')) {
				const link = document.createElement("a");
				link.setAttribute("href", image.getAttribute('src'));
				link.appendChild(image.cloneNode(true));

				image.replaceWith(link);
			}

		},
		steps: 5,
		classes: ['img-default'],
		attributes: { loading: 'lazy', },
	},
	gallery_3x2: {
	},
}
