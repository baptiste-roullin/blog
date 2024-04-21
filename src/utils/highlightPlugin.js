import hljs from 'highlight.js'
import core from './highlight-core.js'

export default function highlightjs(md, opts) {
	opts = { ...highlightjs.defaults, ...opts }

	if (opts.hljs == null) {
		opts.hljs = hljs
	}

	return core(md, opts)
}

highlightjs.defaults = {
	auto: true,
	code: true,
	inline: false,
	ignoreIllegals: true
}
