/*
Narrow non-breaking space before ? ! ; :
espaces fines insécables avant ? ! ; :

Requires the following option when initializing Markdown-it
markdownIt(	{  typographer: true} )

Additional parameter to enable french smartquotes and be le pefect typographer
markdownIt(	{  quotes: ['«\u202F', '\u202F»', '‹\u202F', '\u202F›']} )

*/


import markdownIt from 'markdown-it'
/**
 * @param  md {markdownIt}
 * @returns {void} */
export default (md) => {
	//(\s|$|\n)
	const NBSP_DOUBLE_PUNCTUATION = /(\w+(?:\s?»)?)(\s?)([?!;:])/gu
	const NNBSP = '\u202F' // narrow non breakable space

	md.core.ruler.push('double_punctuation', (state) => {

		if (!state.md.options.typographer) { return }

		for (let index = state.tokens.length - 1; index >= 0; index--) {

			if (state.tokens[index].type !== 'inline') { continue }
			for (let j = state.tokens[index].children.length - 1; j >= 0; j--) {
				state.tokens[index].children[j].content = state.tokens[index].children[j].content.replace(NBSP_DOUBLE_PUNCTUATION, (match, $1, $2, $3, $4) => {
					// console.log($1 + NNBSP + $3 + $4)
					return $1 + NNBSP + $3
				})
			}
		}
	})
}