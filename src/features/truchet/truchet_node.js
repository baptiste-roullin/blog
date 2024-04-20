import debug from 'debug'
import truchet from './truchet_core.js'
import meta from '../../_data/meta.js'
import fs from 'fs'
import promises from 'stream'
const warning = debug('tcqb:warning')

/** @returns {Promise<void>} */
export default async function (slug, width, height) {
    const { createCanvas } = await import('canvas')

    const pipeline = promises.pipeline

    const path = `${meta.outputDir}/${meta.assetsDir}/truchet-${slug}.png`
    const tileCanvas = await truchet(createCanvas(width, height), createCanvas(width, height), { height: height, width: width }, 'node')
    await pipeline(tileCanvas.createPNGStream({ compressionLevel: 2 }), fs.createWriteStream(path), (err) => {
        if (err) {
            console.error('Pipeline failed.', err)
        }
        else {
            warning('truchet pipeline succeeded.')
        }
    })
    /*   }
       else {
           warning('truchet désactivé')

       }*/
}
