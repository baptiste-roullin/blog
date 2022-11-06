import collateHeroImage from '../filters/collateHeroImage'


module.exports = {
  layout: "post",
  permalink: "blog/{{ page.date | dateHumanFormat('yyyy/MM') }}/{{ title | slugify }}/index.html",
  contentType: "post",
  author: "{{ meta.author }}",
  eleventyComputed: {

    collatedHeroImage: collateHeroImage
  }
};