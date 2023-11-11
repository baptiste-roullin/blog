import collateHeroImage from '../utils/collateHeroImage'


export default {
  layout: "heroPage",
  hideMeta: true,
  author: "{{ meta.author }}",
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
}