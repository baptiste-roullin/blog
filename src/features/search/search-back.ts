module.exports = function (collection) {

	const removeMD = require('remove-markdown');

	const { Document } = require("flexsearch");


	const documents = collection.map((page, index) => {

		return {
			id: index,
			url: page.url,
			title: page.data.title,
			description: page.data.description,
			tags: page.data.tags,
			//on accède au contenu en  markdown et on le transforme en texte brut.
			content: removeMD(page.template.frontMatter.content),
			date: page.data.date,
			hero: page.data.hero,
			fileSlug: page.fileSlug
		}
	})

	const index = new Document(documents);


	/*		function callback(this: ElasticLunr.Index<any>) {
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

				index.addDoc({
					url: page.url,
					title: page.data.title,
					description: page.data.description,
					tags: page.data.tags,
					//on accède au contenu en  markdown et on le transforme en texte brut.
					content: remove(page.template.frontMatter.content),
					date: page.data.date,
					hero: page.data.hero,
					fileSlug: page.fileSlug
				});

			});*/
	index.export(function (key, data) {
		console.log(key, data.length)
	});

	return { "key": "data" }


}
