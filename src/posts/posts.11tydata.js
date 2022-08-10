import truchetNode from '../features/truchet/truchet_node'
import { meta } from '../_data/meta';

module.exports = {
  layout: "post",
  permalink: "blog/{{ page.date | dateHumanFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  contentType: "post",

  author: "{{ meta.author }}",
  eleventyComputed: {

    collatedHeroImage: async (data) => {
      const slug = data.page.fileSlug
      const hero = data.hero
      let finalName;
      if (hero === undefined || hero === {}) {
        await truchetNode(slug, 400, 280).catch(console.error);
        //URL absolue
        finalName = `truchet-${slug}.png`
      }
      else {
        const isGif = /\.gif$/
        if (isGif.test(hero.image)) {
          finalName = `${hero.image}`

        }
        else { finalName = hero.image }
      }
      return `/${meta.assetsDir}/${finalName}`
    },
  }
};