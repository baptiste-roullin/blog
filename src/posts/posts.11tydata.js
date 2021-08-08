var truchetNode = require('../truchet/truchet-node.js');

module.exports = {
  layout: "post",
  permalink: "blog/{{ page.date | dateToFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  tags: [
    "post"
  ],

  author: "{{ meta.author }}",
  eleventyComputed: {

    placeholderImage: async (data) => {
      if (data.draft !== true) {
        if (data.hero === undefined || data.hero === {}) {
          await truchetNode(data.page.fileSlug).catch(console.error);
          return true
        }
        else { return false }
      }
      return false
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