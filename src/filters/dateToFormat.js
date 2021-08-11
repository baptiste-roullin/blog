const { DateTime } = require('luxon')

module.exports = function dateToFormat(date, format) {

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

