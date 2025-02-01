export default function (el: HTMLElement, attributes: Object): HTMLElement {
    Object.entries(attributes).forEach(([key, value]) => {
        el.setAttribute(key, value)
    })
    return el
}