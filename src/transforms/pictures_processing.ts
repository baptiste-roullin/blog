// https://github.com/nhoizey/images-responsiver/
// https://github.com/google/eleventy-high-performance-blog



require('dotenv').config()

const { parseHTML } = require('linkedom');
import { handleGIFs } from './pictures_animated';
import { handlePictures, imageSettings } from './pictures_static';




export default function pictures_processing(html) {

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

