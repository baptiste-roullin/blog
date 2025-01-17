// used for pictures in banner in single post page
// and for thumbnail in home page and blog/search page.

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
    let url
    if (typeof hero !== "object"
        || typeof hero?.image !== "string" || hero?.image === null || hero?.image === "") {

        ////URL absolue
        finalName = `/${meta.assetsDir}/truchet-${slug}.png`

        //utile uniquement sur Windows ${process.cwd()}
        const truchetExists = await fileExists(`src/${finalName}`)
        if (!truchetExists) {
            if (true) {
                await truchetNode(400, 280, "src/" + finalName).catch(console.error)
            }
        }

        return finalName
    }

    else {
        finalName = hero.image

        //for search
        if (meta.env === "production ") {
            const source = "process.cwd() " + hero.image
            const dest = `${process.cwd()}/${meta.outputDir}/${meta.assetsDir}/${hero.image}`
            await fsp.copyFile(source, dest)
            return `${finalName}`
        }
        //TODO
        return finalName

    }
}