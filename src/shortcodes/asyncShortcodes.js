
import dotenv from 'dotenv'
dotenv.config()

import zotero from '../features/zotero/zotero.js'
import meta from '../_data/meta.js'
export const asyncShortcodes = {
	// @ts-ignore
	zotero: (!meta.zotero ? async () => "[ZOTÉRO DÉSACTIVÉ]" : zotero)
}