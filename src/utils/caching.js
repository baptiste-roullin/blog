import { AssetCache } from "@11ty/eleventy-fetch";

import debug from 'debug';
debug('tcqb');
/** @param {string} key
 * @param {string} duration
 * @param {"json" | "buffer" | "text"} type
 * @returns {Promise<any>}
 */
export default async function (key, duration, type, req) {
    const cacheObject = new AssetCache(key, '.cache', { duration: duration, type: type });

    if (cacheObject.isCacheValid(duration)) {
        debug("cache valide :", key);
        if (type !== "buffer") {
            return await cacheObject.getCachedContents(type);
        }
        else {

        }
    }
    else {
        debug("création cache : ", key);
        try {
            const res = await req();
            await cacheObject.save(res, type);
            return res;
        }
        catch (error) {
            throw error;
        }

    }
}
