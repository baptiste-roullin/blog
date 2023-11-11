import truchetNode from '../features/truchet/truchet_node'
import meta from '../_data/meta'
import path from 'path'


export default async function (data) {
	const slug = data.page.fileSlug
	const hero = data.hero

	let finalName

	if (typeof hero !== "object" || typeof hero?.image !== "string") {
		await truchetNode(slug, 400, 280).catch(console.error)
		//URL absolue
		finalName = `truchet-${slug}.png`
	}
	else if (/\.gif$/.test(hero.image)) {
		finalName = hero.image
	}

	else { finalName = hero.image }


	return `/${meta.assetsDir}/${path.basename(finalName)}`
}