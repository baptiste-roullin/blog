/** @returns {any} */
export function normalize(tag) {
    return tag.slice(0, 1).toUpperCase() + tag.slice(1)
}
