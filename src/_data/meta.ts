require('dotenv').config()


export const meta = {
	env: process.env.NODE_ENV || 'development ',
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
	zoteroProfileID: process.env.zoteroProfileID || '',
	zoteroAPIKey: process.env.zoteroAPIKey || ''



}
