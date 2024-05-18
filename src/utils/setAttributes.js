
/**
 * @param {HTMLElement} el
 * @param {Object} attributes
 * @returns {HTMLElement}
**/
export default function (el, attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
        el.setAttribute(key, value)
    })
    return el
}
