//@ts-nocheck
import truchet from './truchet_core'
import meta from '../_data/meta.js'

import debug from 'debug'
const warning = debug('tcqb:warning')

export default async function (slug, width, height) {
	if (process.platform !== "win32") {
		import { createCanvas } from 'canvas'
		import fs from 'fs'
		import promises from 'stream'
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