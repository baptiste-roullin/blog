import markdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import footnote from 'markdown-it-footnote'
import bracketedSpans from 'markdown-it-bracketed-spans'
import attrs from 'markdown-it-attrs'
import toc from 'markdown-it-table-of-contents'

// Conflit avec markdown-it-attrs
//import blockquoteCite from 'markdown-it-blockquote-cite'
import imageFigures from 'markdown-it-image-figures'
import highlightjs from "./utils/highlightPlugin.js"
import french_nnbsp from './french_nnbsp.js'
import customSlug from './filters/slugify.js'

/** @returns {void} */
const anchor = (md) => {


    md.renderer.rules.heading_open = function (tokens, index) {
        const contentToken = tokens[index + 1]

        const slug = customSlug(contentToken.content)

        if (tokens[index].tag === 'h2') {
            return `
	        <${tokens[index].tag} id="${slug}">
			<a class="header-anchor" href="#${slug}">
         		<span aria-hidden="true">§︎</span>
          		<span class="sr-only">Ancre pour le titre : ${contentToken.content}</span>
        	</a>
			`
        }
        return `<${tokens[index].tag}>`
    }

    md.renderer.rules.heading_close = function (tokens, index) {
        //const contentToken = tokens[index - 1];
        //const slug = slugify(contentToken.content);
        return `</${tokens[index].tag}>`
    }
}



let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: ['«\u202F', '\u202F»', '‹\u202F', '\u202F›']
}


export default markdownIt(options)
    .disable('code')
    // faire marcher l'import auto de CSS
    .use(highlightjs)
    .use(french_nnbsp)
    .use(MarkdownItContainer, 'info-block')
    //.use(markdownItHeadingLevel, { firstLevel: 2 })
    .use(footnote)
    .use(toc, { includeLevel: [2, 3, 4], slugify: customSlug })
    .use(anchor)
    .use(bracketedSpans)
    .use(attrs)
    .use(imageFigures, { figcaption: true })
