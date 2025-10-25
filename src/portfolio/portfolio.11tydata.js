import collateHeroImage from '../utils/collateHeroImage.ts'


export default {
  layout: "heroPage",
  hideMeta: true,
  author: "{{ meta.author }}",
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
}