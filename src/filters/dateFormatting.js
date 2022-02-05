const { DateTime, Settings } = require('luxon')
Settings.defaultLocale = "fr";

module.exports = {
	dateHumanFormat: function (date, format) {

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
	},

	dateToPermalink: function (date) {
		return DateTime.fromJSDate(date, {
			zone: 'utc',
		}).toFormat('yyyy/MM')
	},


	dateISOFormat: function (date) {
		return DateTime.fromJSDate(date).toISODate()
	}

}