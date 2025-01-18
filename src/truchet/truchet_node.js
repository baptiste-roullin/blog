import debug from 'debug'
import truchet from './truchet_core.js'
import meta from '../_data/meta.js'

const warning = debug('tcqb:warning')

import { Canvas } from 'skia-canvas'

/** @returns {Promise<void>} */
export default async function (width, height, path) {

    try {
        //const path = `${meta.outputDir}/${meta.assetsDir}/truchet-${slug}.png`
        //const path = `$/truchet-${slug}.png`
        const tileCanvas = await truchet(
            new Canvas(width, height),
            new Canvas(width, height),
            { height: height, width: width }, 'node')

        await tileCanvas.saveAs(path)


    } catch (error) {
        console.log(error)

    }
    /*   }
       else {
           warning('truchet désactivé')

       }*/
}
