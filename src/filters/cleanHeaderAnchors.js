import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr"

/** @returns {string} */
export function cleanHeaderAnchors(content) {
    if (content === undefined) {
        return ''
    }
    const regex = /<a class="header-anchor"((?!(<\/a>)).|\n)+<\/a>/gm
    return content.replace(regex, '')
}
