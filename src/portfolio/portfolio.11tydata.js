import collateHeroImage from '../utils/collateHeroImage.js'


export default {
  layout: "heroPage",
  hideMeta: true,
  author: "{{ meta.author }}",
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
}