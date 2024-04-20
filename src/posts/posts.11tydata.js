import collateHeroImage from '../utils/collateHeroImage.js'


export default {
  layout: "post",
  permalink: "blog/{{ page.date | dateHumanFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  type: "post",
  author: "{{ meta.author }}",
  picture_lightbox: true,
  eleventyComputed: {

    collatedHeroImage: collateHeroImage
  }
}