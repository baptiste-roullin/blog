

(async function () {
	const dateHumanFormat = await import('../../filters/date_formatting.js')
	const removeMD = await import('../../filters/remove_MD.js')

	const njk = require('nunjucks')
	const fs = require('node:fs')
	const env = njk.configure('',

		// options, notamment pour supprimer les vides inutiles.
		{ autoescape: true, trimBlocks: true, lstripBlocks: true })

	env.addFilter('dateHumanFormat', dateHumanFormat)
	env.addFilter('removeMD', removeMD)

	//génération du HTML
	const tmpl = njk.precompile('src/_templates/components/posts_list_item.njk',)
	fs.writeFileSync("dist/assets/scripts/precompiled_search.js", tmpl)

})()