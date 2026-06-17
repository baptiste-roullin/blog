import collateHeroImage from '../utils/collateHeroImage.ts'


export default {
  layout: "post",
  permalink: "blog/{{ page.date | dateFormatting('yyyy/MM') }}/{{ title | slugify }}/index.html",
  type: "post",
  author: "{{ meta.author }}",
  isArticle: true,
  eleventyComputed: {
    collatedHeroImage: collateHeroImage
  }
}