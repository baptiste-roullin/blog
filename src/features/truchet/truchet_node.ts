
import debug from 'debug'
import truchet from './truchet_core'
import meta from '../../_data/meta'
import fs from 'fs'
import promises from 'stream'
const warning = debug('tcqb:warning')

export default async function (slug, width, height) {
	if (process.platform !== "win32") {
		const { createCanvas } = await import('canvas')

		const pipeline = promises.pipeline

		const path = `${meta.outputDir}/${meta.assetsDir}/truchet-${slug}.png`
		const tileCanvas = await truchet(
			createCanvas(width, height), createCanvas(width, height), { height: height, width: width }, 'node')
		await pipeline(
			tileCanvas.createPNGStream({ compressionLevel: 2 }),
			fs.createWriteStream(path),
			(err) => {
				if (err) {
					console.error('Pipeline failed.', err)
				} else {
					warning('truchet pipeline succeeded.')
				}
			})
	}
	else {
		warning('truchet désactivé')

	}
}