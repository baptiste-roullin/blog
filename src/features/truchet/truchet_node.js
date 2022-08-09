const meta = require('../../_data/meta.js')


module.exports = async function (slug, width, height) {
	if (process.platform !== "win32") {
		//@ts-ignore
		const { createCanvas } = require('canvas')
		const fs = require('fs')
		const promises = require('stream');
		const pipeline = promises.pipeline
		//@ts-ignore
		const truchet = require('./truchet_core.ts')

		const path = `${meta.outputDir}/${meta.assetsDir}/truchet-${slug}.png`


		const tileCanvas = await truchet(
			createCanvas(width, height), createCanvas(width, height), { height: height, width: width }, 'node')
		await pipeline(
			tileCanvas.createPNGStream({ compressionLevel: 2 }),
			fs.createWriteStream(path),
			(err) => {
				if (err) {
					console.error('Pipeline failed.', err);
				} else {
					console.log('truchet pipeline succeeded.');
				}
			})
	}
}