import slugifyLib from '@sindresorhus/slugify'

// slugify is called 1000s of times, let's memoize it
let memoizedSlugs = {}

/** @returns {any} */
export default function (string, inputPath) {
    if (string in memoizedSlugs) {
        return memoizedSlugs[string]
    }
    else {
        try {
            if (!string) {
                throw new Error("slugify: slug string is empty")
            }

            if (typeof string !== 'string') {
                throw new Error("slugify : should be a string")
            }
            let slug = slugifyLib(string, {
                decamelize: false,
                customReplacements: [['%', ' '], ["'", '']],
            })
            memoizedSlugs[string] = slug
            return slug
        } catch (error) {
            console.log(error.message)
            console.log(inputPath)
        }

    }
}
;
