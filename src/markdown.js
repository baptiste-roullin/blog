import markdownIt from 'markdown-it'
import MarkdownItContainer from 'markdown-it-container'
import footnote from 'markdown-it-footnote'
import bracketedSpans from 'markdown-it-bracketed-spans'
import attrs from 'markdown-it-attrs'
import blockquoteCite from 'markdown-it-blockquote-cite'
import imageFigures from 'markdown-it-image-figures'
import highlightjs from "./utils/highlightPlugin.js"

import slugify from './filters/slugify.js'

/** @returns {void} */
const anchor = (md) => {


    md.renderer.rules.heading_open = function (tokens, index) {
        const contentToken = tokens[index + 1]
        const slug = slugify(contentToken.content)

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


//espaces fines insécables avant ? ! ; :'
/** @returns {void} */
const double_punctuation = (md) => {
    //(\s|$|\n)
    const NBSP_DOUBLE_PUNCTUATION = /(\w+(?:\s?»)?)(\s?)([?!;:])/gu
    const NNBSP = '\u202F' // narrow non breakable space

    md.core.ruler.push('double_punctuation', (state) => {

        if (!state.md.options.typographer) { return }

        for (let index = state.tokens.length - 1; index >= 0; index--) {

            if (state.tokens[index].type !== 'inline') { continue }

            console.log(state.tokens[index].children)
            for (let j = state.tokens[index].children.length - 1; j >= 0; j--) {
                state.tokens[index].children[j].content = state.tokens[index].children[j].content.replace(NBSP_DOUBLE_PUNCTUATION, (match, $1, $2, $3, $4) => {
                    // console.log($1 + NNBSP + $3 + $4)
                    return $1 + NNBSP + $3
                })
            }
        }
    })
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
    .use(double_punctuation)
    .use(MarkdownItContainer, 'info-block')
    //.use(markdownItHeadingLevel, { firstLevel: 2 })
    .use(footnote)
    .use(anchor)
    .use(bracketedSpans)
    .use(attrs)
    .use(blockquoteCite)
    .use(imageFigures, { figcaption: true })
