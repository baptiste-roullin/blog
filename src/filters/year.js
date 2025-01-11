import { DateTime, Settings } from 'luxon'
Settings.defaultLocale = "fr"
export default function year(date) {
	return DateTime.fromJSDate(date).year
}