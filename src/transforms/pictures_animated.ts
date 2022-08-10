
require('dotenv').config()
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);
const pathToFfmpeg = require("ffmpeg-static");
import path from 'path'
import meta from '../_data/meta';


async function convertGIFs(name, convertedName, outPath) {

	const exists = promisify(require("fs").exists);
	if (await exists(convertedName)) {
		return convertedName;
	}
	const command = `${pathToFfmpeg} -y -v error -i \"${path.join('src/assets/imagesToProcess', name)}\" -filter_complex \"[0:v] crop=trunc(iw/2)*2:trunc(ih/2)*2, fps=15\" -vsync 0 -f mp4 -pix_fmt yuv420p \"${path.join(outPath, convertedName)}\"`
	try {
		await exec(command);
	} catch (e) {
		if (e instanceof Error) {
			throw new Error(`Failed executing ${command} with ${e.message}`);
		}
	}
};


export default function handleGIFs(img) {
	const outPath = `${meta.outputDir}/${meta.assetsDir}/`
	let src = img.getAttribute("src");
	const name = path.basename(src)
	const convertedName = name.replace(/\.\w+$/, (_) => ".mp4");

	const video = img.ownerDocument.createElement("video");
	[...img.attributes].map(({ name, value }) => {
		video.setAttribute(name, value);
	});

	video.setAttribute('src', path.join('/' + meta.assetsDir, convertedName))
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
