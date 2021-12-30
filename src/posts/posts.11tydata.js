var truchetNode = require('../features/truchet/truchet-node.js');

module.exports = {
  layout: "post",
  permalink: "blog/{{ page.date | dateToFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  tags: [
    "post"
  ],

  author: "{{ meta.author }}",
  eleventyComputed: {

    collatedImage: async (data) => {
      const slug = data.page.fileSlug
      const hero = data.hero
      if (data.draft !== true) {
        if (hero === undefined || hero === {}) {
          await truchetNode(slug, 400, 280).catch(console.error);
          return `truchet-${slug}.png`
        }
        else {
          const isGif = /\.gif$/
          if (isGif.test(hero.image)) {
            return "/assets/generatedImages/" + hero.image

          }
          else {
            return hero.image
          }
        }
      }
      return undefined
    },

  }
};