

import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr"
export default function dateISOFormat(date) {
	if (!date) {
		console.log("date string is empty")
		return ""
	}
	return DateTime.fromJSDate(date).toISODate()
}