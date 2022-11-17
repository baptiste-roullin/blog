import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr";

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
	else {
		return DateTime.fromJSDate(date, {
			zone: 'utc',
		}).toFormat(String(format))
	}
}
