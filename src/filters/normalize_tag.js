/** @returns {any} */
export default function normalizeTag(tag) {
    return tag.slice(0, 1).toUpperCase() + tag.slice(1)
}
