/**
 * @param {string} pathToComponent "relative to src/"
 * @param filters
 * @param data
 */
export default async function (pathToComponent, data, filters) {
	const { default: njk } = await import('nunjucks')

	const env = njk.configure('./src/',
		// options, notamment pour supprimer les vides inutiles.
		{ autoescape: true, trimBlocks: true, lstripBlocks: true })

	filters.forEach(filter => {
		env.addFilter(filter.name, filter)
	})

	//génération du HTML
	return await env.render(pathToComponent, data)
}


