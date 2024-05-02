import truchetNode from '../features/truchet/truchet_node.js'
import meta from '../_data/meta.js'
import path from 'path'
import fsp from 'node:fs/promises'
import fileExists from './fileExists.js'
/** @returns {Promise<string>} */
export default async function (data) {


    const slug = data.page.fileSlug
    const hero = data.hero
    let finalName
    if (meta.pictures && typeof hero !== "object"
        || typeof hero?.image !== "string" || hero?.image === null || hero?.image === "") {
        await truchetNode(slug, 400, 280).catch(console.error)
        //URL absolue
        finalName = `truchet-${slug}.png`
    }


    else {
        finalName = hero.image
        //for search
        const source = process.cwd() + "/src/assets/imagesToProcess/" + hero.image
        const dest = `${process.cwd()}/${meta.outputDir}/${meta.assetsDir}/${hero.image}`
        await fsp.copyFile(source, dest)
    }

    return `/${meta.assetsDir}/${path.basename(finalName)}`
}
