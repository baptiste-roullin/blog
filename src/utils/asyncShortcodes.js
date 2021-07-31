const njk = require('nunjucks')
const api = require('zotero-api-client');
const meta = require('../_data/meta.js');



module.exports = {
	zotero: async function (cat, requestedTag,) {

		const lib = await api(meta.zoteroAPIKey).library('user', meta.zoteroProfileID)
		const colls = await lib.collections().get()
		const collectionObject = colls.getData().filter(coll => coll.name === cat)[0]
		const collectionItems = await lib.collections(collectionObject.key).items().get()
		//console.log('1:    ', collectionItems.getData()[0])
		const itemsFilteredByTag = collectionItems.getData().filter(item =>
			item.tags.some(tag => tag.tag === requestedTag)
		)
		console.log('2:   ', itemsFilteredByTag[0].title)
		/*		if (type === 'tag') {
					const response = await api().library('user', meta.zoteroProfileID).tags(id).items().get();
				}
				else {
					const response = await api().library('user', meta.zoteroProfileID).collection(id).items().get();

				}*/

		njk.configure('src/_templates/components/', { autoescape: true, trimBlocks: true, lstripBlocks: true });

		return njk.render('zotero.njk', { items: itemsFilteredByTag });
	}
}