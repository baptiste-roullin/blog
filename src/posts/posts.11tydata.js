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
      if (data.draft !== true) {
        if (data.hero === undefined || data.hero === {}) {
          await truchetNode(slug).catch(console.error);
          return `truchet-${slug}.png`
        }
        else { return data.hero.image }
      }
      return undefined
    },

    relative: (data) => {
      return (
        (new RegExp('posts/.*/.*$')).test(data.page.filePathStem)
          ?
          true
          :
          false
      )

    }
  }
};