import dotenv from 'dotenv'
dotenv.config()
import convertToBool from '../utils/convertToBool.js'

export default {
	env: process.env.NODE_ENV || 'production',
	siteURL: 'https://toutcequibouge.net',
	siteName: "Tout ce qui bouge",
	siteDescription: 'Veille et réflexion sur la technologie, ses usages et mésusages.',
	image: 'assets/UI/linotype.png',
	lang: 'fr',
	locale: 'fr_FR',
	author: 'Baptiste Roullin',
	outputDir: "dist",
	assetsDir: 'img',
	zotero: convertToBool(process.env.ZOTERO),
	zoteroProfileID: process.env.zoteroProfileID || '',
	zoteroAPIKey: process.env.zoteroAPIKey || ''


}

