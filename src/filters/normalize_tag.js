/** @returns {any} */
export default function normalize(tag) {
    return tag.slice(0, 1).toUpperCase() + tag.slice(1);
}
