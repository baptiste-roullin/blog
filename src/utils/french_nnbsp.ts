/*
Narrow non-breaking space before ? ! ; :
espaces fines insécables avant ? ! ; :

Requires the following option when initializing Markdown-it
markdownIt(	{  typographer: true} )

Additional option to enable french smart quotes and be le pefect typographer
markdownIt(	{  quotes: ['«\u202F', '\u202F»', '‹\u202F', '\u202F›']} )

*/


import markdownIt from 'markdown-it'
/**
 * @param  md {markdownIt}
 * @returns {void} */
export default (md) => {

	// basic regex
	const NNBSP_DOUBLE_PUNCTUATION = /([^\s]+)(?:\s*)([?!;:])/gu
	// narrow non-breakable space in unicode-ese
	const NNBSP = '\u202F'

	md.core.ruler.push('double_punctuation', (state) => {

		if (!state.md.options.typographer) { return }

		for (let i = state.tokens.length - 1; i >= 0; i--) {

			if (state.tokens[i].type !== 'inline') { continue }
			for (let j = state.tokens[i].children.length - 1; j >= 0; j--) {
				if (state.tokens[i].children[j].type !== 'text') { continue }

				state.tokens[i].children[j].content = state.tokens[i].children[j].content.replace(NNBSP_DOUBLE_PUNCTUATION, (match, $1, $2, $3, $4) => {
					return $1 + NNBSP + $2
				})
			}
		}
	})
}