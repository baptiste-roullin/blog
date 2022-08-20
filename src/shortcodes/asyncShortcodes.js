
require('dotenv').config()
import zotero from '../features/zotero/zotero'

export const asyncShortcodes = {
	// @ts-ignore
	zotero: (process.env.ZOTERO === "false" ? async () => "[ZOTÉRO DÉSACTIVÉ]" : zotero)
}