// https://github.com/nhoizey/images-responsiver/
// https://github.com/google/eleventy-high-performance-blog



require('dotenv').config()

const { parseHTML } = require('linkedom');
import { handleGIFs } from './pictures_animated';
import { handlePictures, globalSettings } from './pictures_static';




export default function pictures_processing(html) {

	const { document } = parseHTML(html);

	[...document.querySelectorAll(globalSettings.selector)]
		.filter((image) =>
			!((new RegExp(globalSettings.ignore)).test(image.getAttribute('src')))
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
				await handleGIFs(image)
			}
			else {
				handlePictures(image, document, globalSettings)
			}
		});

	return document.toString();
};

