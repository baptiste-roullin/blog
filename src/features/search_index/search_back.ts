const remove = require('remove-markdown');



import ElasticLunr from "elasticlunr";
const meta = require('../../_data/meta.js')


const elasticlunr = require("elasticlunr");
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
const { DateTime, Settings } = require('luxon')
Settings.defaultLocale = "fr";


export function search(collection) {

	function callback(this: ElasticLunr.Index<any>) {
		//@ts-ignore
		this.use(lunr.fr);
		this.addField("title")
		this.addField("description")
		this.addField("tags")
		this.addField("content")
		this.setRef("url");
	}

	// what fields we'd like our index to consist of
	var index: ElasticLunr.Index<any> = elasticlunr(callback)

	// loop through each page and add it to the index
	collection.forEach((page) => {
		let img = page.data.collatedHeroImage

		if (/\/truchet-/.test(img)) {
			var finalPath = page.data.collatedHeroImage as string
		}
		else {
			var finalPath = `/${meta.assetsDir}/${img}`
		}
		index.addDoc({
			url: page.url,
			title: page.data.title,
			description: page.data.description,
			tags: page.data.tags,
			//on accède au contenu en markdown et on le transforme en texte brut.
			content: remove(page.template.frontMatter.content),
			date: page.data.date,
			collatedHeroImage: finalPath,
			fileSlug: page.fileSlug
		});
	});
	return JSON.stringify(index.toJSON());
}
