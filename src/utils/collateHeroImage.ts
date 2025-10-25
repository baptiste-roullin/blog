// used for pictures in banner in single post page
// and for thumbnail in home page and blog/search page.

import fsp from "node:fs/promises"
import path from "node:path"

import truchetNode from '../truchet/truchet_node.ts'
import meta from '../_data/meta.ts'
import fileExists from './fileExists.ts'

/** @returns {Promise<string>} */
export default async function (data) {

    const slug = data.page.fileSlug
    const hero = data.hero
    let finalName
    let inputPath
    let outputPath
    let url
    try {

        if (typeof hero !== "object" || typeof hero?.image !== "string" || hero?.image === null || hero?.image === "") {

            ////URL absolue
            finalName = `truchet-${slug}.png`
            inputPath = `src/${meta.assetsDir}/${finalName}`
            outputPath = `/${meta.outputDir}/${meta.assetsDir}/${finalName}`
            url = `/${meta.assetsDir}/${finalName}`
            //utile uniquement sur Windows ${process.cwd()}
            //TODO: check
            const truchetExists = await fileExists(inputPath)
            if (!truchetExists) {
                if (true) {
                    await truchetNode(400, 280, inputPath).catch(console.error)
                }
            }
        }

        else {
            finalName = hero.image
            // "img" already in name
            inputPath = `src/${finalName}`
            outputPath = `${meta.outputDir}/${finalName}`
            // first slash and full path already in frontmatter in .md files
            url = `${finalName}`
        }

        //for search
        if (meta.env === "production") {
            const src = path.join(process.cwd(), inputPath)
            const dest = path.join(process.cwd(), outputPath)
            await fsp.copyFile(src, dest)
        }
        return url
    } catch (error) {
        console.log(error)
    }
}