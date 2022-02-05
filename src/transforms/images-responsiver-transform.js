'use strict';

const lib = require('./images-responsiver-lib.js');
let imagesResponsiverOptions;

const imagesResponsiverTransform = (content, outputPath) => {
	if (outputPath && outputPath.endsWith('.html')) {
		return lib(content, imagesResponsiverOptions);
	}
	return content;
};

module.exports = {
	configFunction: (eleventyConfig, options = {}) => {
		imagesResponsiverOptions = options;
		eleventyConfig.addTransform(
			'imagesResponsiver',
			imagesResponsiverTransform
		);
	},
};
