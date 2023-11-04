import * as ElasticLunr from "elasticlunr"
import * as elasticlunr from "/node_modules/elasticlunr/lib/elasticlunr.js"
require('./lunr.stemmer.support.js')(elasticlunr)
require('./lunr.fr.js')(elasticlunr)
import { Settings } from 'luxon'
Settings.defaultLocale = "fr"

import remove from 'remove-markdown'


export default function search(collection) {


	// what fields we'd like our index to consist of
	function createIndex(this: ElasticLunr.Index<any>) {
		//@ts-ignore
		this.use(lunr.fr)
		this.addField("title")
		this.addField("description")
		this.addField("tags")
		this.addField("content")
		this.setRef("url")
	}
	var index: ElasticLunr.Index<any> = elasticlunr(createIndex)




	// loop through each page and add it to the index
	collection.forEach((page) => {

		const docOptions = {
			url: page.url,
			title: page.data.title,
			description: page.data.description,
			tags: page.data.tags,
			//on accède au contenu en markdown et on le transforme en texte brut.
			content: remove(page.template.frontMatter.content),
			date: page.data.date,
			collatedHeroImage: page.data.collatedHeroImage,
			fileSlug: page.fileSlug
		}


		index.addDoc(docOptions)


	})
	return JSON.stringify(index.toJSON())
}
