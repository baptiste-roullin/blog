const markdownItAttributes = require('markdown-it-attrs');
const markdownItContainer = require('markdown-it-container');
const markdownIt = require('markdown-it')
const markdownItFootnote = require('markdown-it-footnote');
const markdownItAnchor = require('markdown-it-anchor');
const slugify = require('./slugify.js');
const imageFigures = require('markdown-it-image-figures');
//const bracketedSpans = require('markdown-it-bracketed-spans');

const MarkdownBlockquoteCite = require('markdown-it-blockquote-cite');


// https://www.toptal.com/designers/htmlarrows/punctuation/section-sign/
const markdownItAnchorOptions = {
	permalink: true,
	permalinkClass: 'deeplink',
	permalinkSymbol: '&#xa7;&#xFE0E;',
	level: [2, 3, 4],
	slugify: function (s) {
		return slugify(s);
	},
};

// taken from https://gist.github.com/rodneyrehm/4feec9af8a8635f7de7cb1754f146a39
function getHeadingLevel(tagName) {
	if (tagName[0].toLowerCase() === 'h') {
		tagName = tagName.slice(1);
	}

	return parseInt(tagName, 10);
}

function markdownItHeadingLevel(md, options) {
	var firstLevel = options.firstLevel;

	if (typeof firstLevel === 'string') {
		firstLevel = getHeadingLevel(firstLevel);
	}
	if (!firstLevel || isNaN(firstLevel)) {
		return;
	}
	var levelOffset = firstLevel - 1;
	if (levelOffset < 1 || levelOffset > 6) {
		return;
	}

	md.core.ruler.push('adjust-heading-levels', function (state) {
		var tokens = state.tokens;
		for (var i = 0; i < tokens.length; i++) {
			if (tokens[i].type !== 'heading_close') {
				continue;
			}

			var headingOpen = tokens[i - 2];
			var headingClose = tokens[i];

			var currentLevel = getHeadingLevel(headingOpen.tag);
			var tagName = 'h' + Math.min(currentLevel + levelOffset, 6);

			headingOpen.tag = tagName;
			headingClose.tag = tagName;
		}
	});
}


let options = {
	html: true,
	breaks: true,
	linkify: true,
	typographer: true,
	quotes: ['«\u202F', '\u202F»', '‹\u202F', '\u202F›']
}

const md = markdownIt(options)
	.disable('code')
	//	.use(markdownItHeadingLevel, { firstLevel: 2 })
	.use(markdownItFootnote)
	.use(markdownItAnchor, markdownItAnchorOptions)
	.use(markdownItAttributes)
	.use(MarkdownBlockquoteCite)
	.use(markdownItContainer, 'info')
	.use(imageFigures, { figcaption: true });


module.exports = md;