const { DateTime, Settings } = require('luxon')
Settings.defaultLocale = "fr";

export function dateHumanFormat(date, format) {

	if (typeof date === 'string') {
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

export function dateToPermalink(date) {
	return DateTime.fromJSDate(date, {
		zone: 'utc',
	}).toFormat('yyyy/MM')
}


export function dateISOFormat(date) {
	return DateTime.fromJSDate(date).toISODate()
}