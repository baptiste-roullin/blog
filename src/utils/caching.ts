import { AssetCache } from "@11ty/eleventy-fetch"

import debug from 'debug'
debug('tcqb')
export default async function (key: string, duration: string, type: "json" | "buffer" | "text", req) {
	const cacheObject = new AssetCache(key, '.cache', { duration: duration, type: type })

	if (cacheObject.isCacheValid(duration)) {
		debug("cache valide :", key)
		if (type !== "buffer") {
			return await cacheObject.getCachedContents(type)
		}
		else {

		}
	}
	else {
		debug("création cache : ", key)
		try {
			const res = await req()
			await cacheObject.save(res, type)
			return res
		} catch (error) {
			throw error
		}

	}
}

