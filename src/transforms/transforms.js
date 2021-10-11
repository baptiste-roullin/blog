//const htmlmin = require('html-minifier')
//require('dotenv').config()

module.exports = {
  /* htmlmin: function (content, outputPath) {
     // bail if not production env
     if (process.env.NODE_ENV !== 'production') {
       return content
     }
 
     // returned minified content from html files
     if (outputPath.endsWith('.html')) {
       let minified = htmlmin.minify(content, {
         useShortDoctype: false,
         removeComments: true,
         collapseWhitespace: false,
         html5: true
       })
 
       return minified
     }
 
     return content
   },*/
}
