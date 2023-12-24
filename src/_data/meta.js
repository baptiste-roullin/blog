import dotenv from 'dotenv'
dotenv.config()
import convertToBool from '../utils/convertToBool.js'

export default {
	env: process.env.NODE_ENV || 'production ',
	siteURL: 'https://toutcequibouge.net',
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

