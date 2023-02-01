require('dotenv').config()
const { convertToBool } = require('../utils/convertToBool')

module.exports = {
	env: process.env.NODE_ENV || 'production ',
	siteURL: 'toutcequibouge.net',
	siteName: "Tout ce qui bouge",
	siteDescription: 'Veille et réflexion sur la technologie, ses usages et mésusages.',
	image: 'assets/UI/linotype.png',
	lang: 'fr',
	locale: 'fr_FR',
	author: 'Baptiste Roullin',
	authorEmail: '',
	outputDir: "dist",
	assetsDir: 'assets/images',
	zotero: convertToBool(process.env.ZOTERO),
	twitterBearer: process.env.TWITTER_BEARER,
	twitterThread: convertToBool(process.env.TWITTER_THREAD),
	search: convertToBool(process.env.SEARCH),
	pictures: convertToBool(process.env.PICTURES),
	zoteroProfileID: process.env.zoteroProfileID || '',
	zoteroAPIKey: process.env.zoteroAPIKey || ''


}

