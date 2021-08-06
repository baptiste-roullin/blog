
module.exports = async function (slug) {

	const { createCanvas } = require('canvas')
	const fs = require('fs')
	const promises = require('stream');
	const pipeline = promises.pipeline
	const truchet = require('./truchet.js')

	//const path = 'dist/assets/generatedImages/truchet-' + slug + '.png'
	const path = 'src/assets/imagesToProcess/truchet-' + slug + '.png'


	const tileCanvas = await truchet(
		createCanvas(400, 280), createCanvas(400, 280), null, 'node')
	await pipeline(
		tileCanvas.createPNGStream({ compressionLevel: 2 }),
		fs.createWriteStream(path),
		function () { }
	)
}