// Allow registration of other languages.
function registerLangs(hljs, register) {
	for (const [lang, fn] of Object.entries(register)) {
		hljs.registerLanguage(lang, fn)
	}
}

// Highlight with given language.
function highlight(md, hljs, ignoreIllegals, code, lang) {
	try {
		return hljs.highlight(code, {
			language: lang !== "" ? lang : "plaintext",
			ignoreIllegals
		}).value
	} catch (e) {
		return md.utils.escapeHtml(code)
	}
}

// Highlight with given language or automatically.
function highlightAuto(md, hljs, ignoreIllegals, code, lang) {
	if (lang !== "") {
		return highlight(md, hljs, ignoreIllegals, code, lang)
	}

	try {
		return hljs.highlightAuto(code).value
	} catch (e) {
		return md.utils.escapeHtml(code)
	}
}
// Wrap a render function to add `hljs` class to code blocks.
function wrapCodeRenderer(renderer) {
	return function wrappedRenderer(...args) {
		return renderer(...args)
			.replace('<code class="', '<code class="hljs ')
			.replace("<code>", '<code class="hljs">')
	}
}

function inlineCodeLanguageRule(state) {
	for (const parentToken of state.tokens) {
		if (parentToken.type !== "inline") {
			continue
		}

		if (parentToken.children == null) {
			continue
		}

		for (const [i, token] of parentToken.children.entries()) {
			if (token.type !== "code_inline") {
				continue
			}

			const next = parentToken.children[i + 1]

			if (next == null) {
				continue
			}

			const match = /^{:?\.([^}]+)}/.exec(next.content)

			if (match == null) {
				continue
			}

			const lang = match[1]

			// Remove the language specification from text following the code.
			next.content = next.content.slice(match[0].length)

			let className = token.attrGet("class") ?? ""

			className += `${state.md.options.langPrefix ?? "language-"}${lang}`

			token.attrSet("class", className)
			token.meta = { ...token.meta, highlightLanguage: lang }
		}
	}
}

function inlineCodeRenderer(tokens, idx, options, env, slf) {
	const token = tokens[idx]

	// Make TypeScript happy...
	if (options.highlight == null) {
		throw new Error(
			"`options.highlight` was null, this is not supposed to happen"
		)
	}

	const highlighted = options.highlight(
		token.content,
		token.meta?.highlightLanguage ?? "",
		""
	)

	return `<code${slf.renderAttrs(token)}>${highlighted}</code>`
}

export default function core(md, opts) {
	const optsWithDefaults = { ...core.defaults, ...opts }

	if (optsWithDefaults.hljs == null) {
		throw new Error(
			"Please pass a highlight.js instance for the required `hljs` option."
		)
	}

	if (optsWithDefaults.register != null) {
		registerLangs(optsWithDefaults.hljs, optsWithDefaults.register)
	}

	md.options.highlight = (optsWithDefaults.auto
		? highlightAuto
		: highlight
	).bind(null, md, optsWithDefaults.hljs, optsWithDefaults.ignoreIllegals)

	if (md.renderer.rules.fence != null) {
		md.renderer.rules.fence = wrapCodeRenderer(md.renderer.rules.fence)
	}

	if (optsWithDefaults.code && md.renderer.rules.code_block != null) {
		md.renderer.rules.code_block = wrapCodeRenderer(
			md.renderer.rules.code_block
		)
	}

	if (optsWithDefaults.inline) {
		md.core.ruler.before(
			"linkify",
			"inline_code_language",
			inlineCodeLanguageRule
		)
		md.renderer.rules.code_inline = wrapCodeRenderer(inlineCodeRenderer)
	}
}

core.defaults = {
	auto: false,
	code: false,
	inline: false,
	ignoreIllegals: false
}
