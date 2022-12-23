import collateHeroImage from '../utils/collateHeroImage'


module.exports = {
  layout: "heroPage",
  hideMeta: true,
  author: "{{ meta.author }}",
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
}