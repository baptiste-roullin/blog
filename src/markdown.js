const markdownItAttributes = require('markdown-it-attrs');
//const markdownItContainer = require('markdown-it-container');
const markdownIt = require('markdown-it')
const markdownItFootnote = require('markdown-it-footnote');
const slugify = require('./filters/slugify.js');
const imageFigures = require('markdown-it-image-figures');

const MarkdownBlockquoteCite = require('markdown-it-blockquote-cite');



const anchor = (md, options) => {

	const defaultOptions = {
		divClass: 'heading-wrapper',
		anchorClass: 'header-anchor',
	};

	options = Object.assign({}, defaultOptions, options);

	md.renderer.rules.heading_open = function (tokens, index) {
		const contentToken = tokens[index + 1];
		const slug = slugify(contentToken.content);

		if (tokens[index].tag === 'h2') {
			return `
      <div class="${options.divClass}">
        <${tokens[index].tag} id="${slug}">`;
		}
		return `<${tokens[index].tag}>`;
	};

	md.renderer.rules.heading_close = function (tokens, index) {
		const contentToken = tokens[index - 1];
		const slug = slugify(contentToken.content);

		if (tokens[index].tag === 'h2') {
			return `
      </${tokens[index].tag}>
        <a class="${options.anchorClass}" href="#${slug}">
          <span aria-hidden="true">§︎</span>
          <span class="sr-only">Section avec le titre : ${contentToken.content}</span>
        </a>
      </div>`;
		}
		return `</${tokens[index].tag}>`;
	};
};



/*
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
*/

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
	.use(anchor)
	.use(markdownItAttributes)
	.use(MarkdownBlockquoteCite)
	//.use(markdownItContainer, 'info')
	.use(imageFigures, { figcaption: true });


module.exports = md;