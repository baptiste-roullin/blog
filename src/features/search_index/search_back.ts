import ElasticLunr from "elasticlunr";
import elasticlunr from "elasticlunr";
require('./lunr.stemmer.support.js')(elasticlunr);
require('./lunr.fr.js')(elasticlunr);
import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr";
import { Stats, statSync } from 'fs';

import { meta } from '../../_data/meta.js';
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
	var index: ElasticLunr.Index<any>;
	var indexStats;
	try {
		const indexFile = require('./dist/index.min.json')
		indexStats = statSync('./dist/index.min.json') as Stats
		index = elasticlunr.Index.load(indexFile)
		console.log('index détecté et chargé')

	}
	catch (e) {
		console.log("pas d'index. index créé")
		index = elasticlunr(createIndex)
	}



	// loop through each page and add it to the index
	collection.forEach((page) => {
		let img = page.data.collatedHeroImage;
		if (/\/truchet-/.test(img)) {
			var finalPath = page.data.collatedHeroImage as string
		}
		else {
			var finalPath = `/${meta.assetsDir}/${img}`
		}
		const docOptions = {
			url: page.url,
			title: page.data.title,
			description: page.data.description,
			tags: page.data.tags,
			//on accède au contenu en markdown et on le transforme en texte brut.
			content: remove(page.template.frontMatter.content),
			date: page.data.date,
			collatedHeroImage: finalPath,
			fileSlug: page.fileSlug
		}


		if (index.documentStore.hasDoc(page.url)) {
			console.log(page.fileSlug, "doc déjà existant");
			if (statSync(page.inputPath) > indexStats.mtimeMs) {
				index.updateDoc(docOptions)
			}
		}
		else {

			index.addDoc(docOptions);
		}

	});
	return JSON.stringify(index.toJSON());
}
