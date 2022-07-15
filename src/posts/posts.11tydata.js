var truchetNode = require('../features/truchet/truchet_node.js');
const meta = require('../_data/meta.js')

module.exports = {
  layout: "post",
  permalink: "blog/{{ page.date | dateHumanFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  contentType: "post",

  author: "{{ meta.author }}",
  eleventyComputed: {

    collatedHeroImage: async (data) => {
      const slug = data.page.fileSlug
      const hero = data.hero

      if (hero === undefined || hero === {}) {
        await truchetNode(slug, 400, 280).catch(console.error);
        //URL absolue
        return `/${meta.assetsDir}/truchet-${slug}.png`
      }
      else {
        const isGif = /\.gif$/
        if (isGif.test(hero.image)) {
          return `/${meta.assetsDir}/${hero.image}`

        }
        return hero.image
      }

    },
  }
};