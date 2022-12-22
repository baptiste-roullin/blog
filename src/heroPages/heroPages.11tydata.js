import collateHeroImage from '../utils/collateHeroImage'


module.exports = {
  layout: "base",
  "permalink": "/{{page.fileSlug}}/index.html",
  author: "{{ meta.author }}",
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
}