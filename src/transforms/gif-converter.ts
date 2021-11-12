/**
 * Copyright (c) 2021 Google Inc
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */


// https://github.com/google/eleventy-high-performance-blog



const { promisify } = require("util");
const { join } = require("path");
const exec = promisify(require("child_process").exec);
const pathToFfmpeg = require("ffmpeg-static");
const { parseHTML } = require('linkedom');
import path from "path";


async function convert(filename, outPath) {
	const convertedName = path.basename(filename).replace(/\.\w+$/, (_) => ".mp4");

	const exists = promisify(require("fs").exists);
	if (await exists(convertedName)) {
		return convertedName;
	}
	/*	const command = shell([
			pathToFfmpeg,
			// See https://engineering.giphy.com/how-to-make-gifs-with-ffmpeg/
			"-y",
			"-v",
			"error",
			"-i",
			join("src/", filename), // input path
			"-filter_complex",
			// ajout d'un filtre de crop pour les cas où les dimensions sont non-divisibles par deux.
			// syntaxe : [O:v] (le stream traité) filtre1, filtre2
			"[0:v] crop=trunc(iw/2)*2:trunc(ih/2)*2, fps=15",
			"-vsync",
			0,
			"-f",
			"mp4",
			"-pix_fmt",
			"yuv420p",
			join('dist/', outPath, convertedName), // output path
		]);*/

	const command = `${pathToFfmpeg} -y -v error -i \"${join('src/', filename)}\" -filter_complex \"[0:v] crop=trunc(iw/2)*2:trunc(ih/2)*2, fps=15\" -vsync 0 -f mp4 -pix_fmt yuv420p \"${join('dist/', outPath, convertedName)}\"`


	try {
		await exec(command);
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(`Failed executing ${command} with ${e.message}`);
		}
	}
	return join(outPath, convertedName);
};


async function convertGIFs(img) {
	const outPath = "/assets/generatedImages"
	let src = img.getAttribute("src");
	const videoSrc = await convert(src, outPath);
	const video = img.ownerDocument.createElement("video");
	[...img.attributes].map(({ name, value }) => {
		video.setAttribute(name, value);
	});

	video.setAttribute('src', videoSrc)

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
	return;
}



const gif2mp4Transform = async (content, outputPath) => {
	if (outputPath && outputPath.endsWith('.html')) {
		const { document } = parseHTML(content);

		const GIFList = [...document.querySelectorAll('.template-post-main img[src$=".gif"]:not([srcset])')]
		await Promise.all(GIFList.map((img) => convertGIFs(img)))
		return document.toString();
	}
	return content;
};

module.exports = {
	configFunction: async (eleventyConfig, options = {}) => {
		eleventyConfig.addTransform(
			'gif2mp4Transform',
			gif2mp4Transform
		);
	},
};
