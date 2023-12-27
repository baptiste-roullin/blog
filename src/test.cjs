

(function () {
	const njk = require('nunjucks')
	const fs = require('node:fs')

	const env = njk.configure('src/_templates/components/',

		// options, notamment pour supprimer les vides inutiles.
		{ autoescape: true, trimBlocks: true, lstripBlocks: true })

	//env.addFilter('dateHumanFormat', dateHumanFormat)

	//génération du HTML
	const tmpl = njk.precompile('src/_templates/components/posts_list_item.njk',)
	console.log(tmpl)
	fs.writeFileSync("precompiled.js", tmpl)

})()