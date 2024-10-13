/** @returns {any} */
export function normalizeTag(tag) {
    return tag.slice(0, 1).toUpperCase() + tag.slice(1)
}
