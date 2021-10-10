
require('dotenv').config()


module.exports = {
	// @ts-ignore
	zotero: (process.env.ZOTERO === "false" ? async () => "[ZOTÉRO DÉSACTIVÉ]" : require('../features/zotero/zotero'))
}