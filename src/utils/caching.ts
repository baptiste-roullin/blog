const { AssetCache } = require("@11ty/eleventy-fetch");


export default async function (key: string, duration: string, type: "json" | "buffer" | "text", req) {
	const cacheObject = new AssetCache(key, '.cache', { duration: duration, type: type })

	if (cacheObject.isCacheValid(duration)) {
		console.log("cache valide :", key);

		return cacheObject.getCachedContents("json");
	}
	else {
		console.log("création cache : ", key);
		try {
			const res = await req()
			cacheObject.save(res, "json")
			return res
		} catch (error) {
			throw error
		}

	}
}

