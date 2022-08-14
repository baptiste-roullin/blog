import ElasticLunr from "elasticlunr";
import elasticlunr from "elasticlunr";
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr";
import { Stats, statSync } from 'fs';

import meta from '../../_data/meta';
const remove = require('remove-markdown');




export default function search(collection) {


	// what fields we'd like our index to consist of
	function createIndex(this: ElasticLunr.Index<any>) {
		//@ts-ignore
		this.use(lunr.fr);
		this.addField("title")
		this.addField("description")
		this.addField("tags")
		this.addField("content")
		this.setRef("url");
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


		index.addDoc(docOptions);


	});
	return JSON.stringify(index.toJSON());
}
