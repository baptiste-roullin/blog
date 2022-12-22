import collateHeroImage from '../utils/collateHeroImage'


module.exports = {
  layout: "base",
  hideMeta: true,
  author: "{{ meta.author }}",
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
}