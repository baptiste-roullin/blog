import markdownIt from 'markdown-it';

import MarkdownItContainer from 'markdown-it-container';
import footnote from 'markdown-it-footnote';
import bracketedSpans from 'markdown-it-bracketed-spans';
import attrs from 'markdown-it-attrs';
import blockquoteCite from 'markdown-it-blockquote-cite';
import imageFigures from 'markdown-it-image-figures';
//import highlightjs from 'markdown-it-highlightjs/dist/core.js'

import highlightjs from "markdown-it-highlightjs";
import slugify from './filters/slugify.js';

/** @returns {void} */
const anchor = (md) => {
    

    md.renderer.rules.heading_open = function (tokens, index) {
        const contentToken = tokens[index + 1];
        const slug = slugify(contentToken.content);

        if (tokens[index].tag === 'h2') {
            return `
	        <${tokens[index].tag} id="${slug}">
			<a class="header-anchor" href="#${slug}">
         		<span aria-hidden="true">§︎</span>
          		<span class="sr-only">Ancre pour le titre : ${contentToken.content}</span>
        	</a>
			`;
        }
        return `<${tokens[index].tag}>`;
    };

    md.renderer.rules.heading_close = function (tokens, index) {
        //const contentToken = tokens[index - 1];
        //const slug = slugify(contentToken.content);
        return `</${tokens[index].tag}>`;
    };
};


//TODO : manque ortho-typo pour ? et !
// https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js

/** @returns {void} */
const double_punctuation = (md) => {
    const NBSP_DOUBLE_PUNCTUATION = /(\w+(?:\s?»)?)(\s?)([?!;:])(\s|$)/gu;
    const NNBSP = '\u202F'; // narrow non breakable space

    md.inline.ruler.push('double_punctuation', (state) => {
        state.replace(NBSP_DOUBLE_PUNCTUATION, (match, $1, $2, $3, $4) => {
            console.log('espaces fines insécables avant ? ! ; :');
            return $1 + NNBSP + $3 + $4;
        });
    });
};


let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: ['«\u202F', '\u202F»', '‹\u202F', '\u202F›']
};



export default markdownIt(options)
    .disable('code')
    .use(MarkdownItContainer, 'info-block')
    //.use(markdownItHeadingLevel, { firstLevel: 2 })
    .use(footnote)
    .use(anchor)
    //	.use(double_punctuation)
    .use(bracketedSpans)
    .use(attrs)
    .use(blockquoteCite)
    .use(imageFigures, { figcaption: true })
    .use(highlightjs);
