const { DateTime, Settings } = require('luxon')
Settings.defaultLocale = "fr";

module.exports = function dateHumanFormat(date, format) {

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
