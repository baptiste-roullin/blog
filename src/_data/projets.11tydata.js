import truchetNode from '../features/truchet/truchet_node'
import meta from '../_data/meta';
module.exports = {
  eleventyComputed: {
    collatedImage: async (data) => {
      if (!data.img) {
        await truchetNode(data.name, 400, 400).catch(console.error);
        //chemin absolu
        return `/${meta.assetsDir}/truchet-${data.name}.png`
      }
      else {
        return data.img
      }
    },
  }
};