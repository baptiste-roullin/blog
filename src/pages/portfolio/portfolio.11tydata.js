import collateHeroImage from '../../filters/collateHeroImage'


module.exports = {
  layout: "post",
  "permalink": "/{{page.fileSlug}}/index.html",
  author: "{{ meta.author }}",
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
};