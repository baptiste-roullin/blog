import truchetNode from '../features/truchet/truchet_node.js'
import meta from '../_data/meta.js'
import path from 'path'
import fileExists from './fileExists.js'
import fsp from "node:fs/promises"
/** @returns {Promise<string>} */
export default async function (data) {

    const slug = data.page.fileSlug
    const hero = data.hero
    let finalName
    if (typeof hero !== "object"
        || typeof hero?.image !== "string" || hero?.image === null || hero?.image === "") {
        finalName = `truchet-${slug}.png`
        //utile uniquement sur Windows ${process.cwd()}
        //const truchetExists = await fileExists(`/${meta.outputDir}/${meta.assetsDir}/${finalName}`)
        //if (!truchetExists) {
        if (true) {
            await truchetNode(400, 280, `${meta.outputDir}/${meta.assetsDir}/${finalName}`).catch(console.error)
        }
    }

    else {
        finalName = hero.image

        //for search
        if (meta.env === "production ") {
            const source = process.cwd() + "/src/assets/imagesToProcess/" + hero.image
            const dest = `${process.cwd()}/${meta.outputDir}/${meta.assetsDir}/${hero.image}`
            await fsp.copyFile(source, dest)
        }
    }

    ////URL absolue

    // return `/${meta.assetsDir}/${path.basename(finalName)}`
    return finalName
}
