
import dotenv from 'dotenv'
dotenv.config()

import zotero from '../features/zotero/zotero'
import meta from '../_data/meta'
export const asyncShortcodes = {
	// @ts-ignore
	zotero: (!meta.zotero ? async () => "[ZOTÉRO DÉSACTIVÉ]" : zotero)
}