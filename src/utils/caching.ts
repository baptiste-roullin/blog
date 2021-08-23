const { AssetCache } = require("@11ty/eleventy-cache-assets");


export default async function (key: string, duration: string, type: "json" | "buffer" | "text", req) {
	const cacheObject = new AssetCache(key, '.cache', { duration: duration, type: type })

	if (cacheObject.isCacheValid(duration)) {
		//	console.log("cache valide");

		return cacheObject.getCachedValue();
	}
	else {
		//	console.log("création cache");
		try {
			return await req()
		} catch (error) {
			throw error
		}

	}
}

