
import dotenv from 'dotenv'
dotenv.config()

import zotero from '../features/zotero/zotero.cjs'
import meta from '../_data/meta.js'
export default {
	// @ts-ignore
	zotero: (!meta.zotero ? async () => "[ZOTÉRO DÉSACTIVÉ]" : zotero)
}