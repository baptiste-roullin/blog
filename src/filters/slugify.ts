import slugifyLib from '@sindresorhus/slugify'

// slugify is called 1000s of times, let's memoize it
let memoizedSlugs = {}

export function slugifyFilter(string) {
	if (string in memoizedSlugs) {
		return memoizedSlugs[string]
	} else {
		if (!string) {
			console.log("slugify: slug string is empty")
			return ""
		}
		let slug = slugifyLib(string, {
			decamelize: false,
			customReplacements: [['%', ' '], ["'", '']],
		})
		memoizedSlugs[string] = slug
		return slug
	}
};
