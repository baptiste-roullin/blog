import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr"

/** @returns {string} */
export default function dateHumanFormat(date, format) {

    if (typeof date === 'string') {
        if (!date) {
            console.log("date string is empty")
            return ""
        }
        return DateTime.fromISO(date, {
            zone: 'utc',
        }).toFormat(String(format))
    }
    // Date is objet. Returned by Eleventy, even in templates
    else {
        return DateTime.fromJSDate(date, {
            zone: 'utc',
        }).toFormat(String(format))
    }
}
