require('dotenv').config()
import zotero from '../features/zotero/zotero'
const meta = require('../_data/meta')

export const asyncShortcodes = {
	// @ts-ignore
	zotero: (!meta.zotero ? async () => "[ZOTÉRO DÉSACTIVÉ]" : zotero)
}