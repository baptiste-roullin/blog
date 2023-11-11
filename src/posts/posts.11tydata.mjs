import collateHeroImage from '../utils/collateHeroImage'


export default {
  layout: "post",
  permalink: "blog/{{ page.date | dateHumanFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  contentType: "post",
  author: "{{ meta.author }}",
  picture_lightbox: true,
  eleventyComputed: {

    collatedHeroImage: collateHeroImage
  }
}