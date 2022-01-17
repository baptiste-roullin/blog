/*const { opacity, fontFamily } = require('tailwindcss/defaultTheme')
const defaultTheme = require('tailwindcss/defaultTheme')*/
const colors = require('tailwindcss/colors')
module.exports = {
	corePlugins: {
	},
	safelist: ['sr-only'],
	content: [
		'./src/**/*.html',
		'./src/**/*.njk',
		'./src/**/*.md',
		'./src/_data/structure.js',
	],
	theme: {
		fontFamily: {
			sans: [
				'Brandon',
				'ui-sans-serif',
				'system-ui',
				'-apple-system',
				'BlinkMacSystemFont',
				'"Segoe UI"',
				'Roboto',
				'"Helvetica Neue"',
				'Arial',
				'"Noto Sans"',
				'sans-serif',
			],
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			gray: colors.gray,
			indigo: colors.indigo,
		},

		extend: {
			maxWidth: {
				'8xl': '90rem',
				'9xl': '100rem',
				'1/3': '33%',
				'1/4': '25%',


			},
			borderRadius: {
				'4xl': '3rem'
			},
			minHeight: {

				'1/4h': '25vh',

				'1/2h': '50vh',

				'3/4h': '75vh',


				'full': '100vh',
			},
			minWidth: {

				'1/4': '25%',

				'1/2': '50%',

				'3/4': '75%',

			},
			spacing: {
				'per-lg': '2%',
				'per': '2%',
			},
			fontSize: {
				'xl-bis': '1.65rem',
				'lg-bis': "1.4rem"

			},
			// TODO https://github.com/tailwindlabs/tailwindcss-typography/releases/tag/v0.5.0
			textShadow: {
				"lg-dark": "3px 3px 6px rgb(0 0 0 / 46%), 0 0 5px rgb(15 3 86 / 42%)"
			},
			boxShadow: {
				"flat": "0 4px 5px 0px rgba(100,0,0,0.25)",
				"lg-dark":
					"0 1.3px 1.9px rgba(0, 0, 0, 0.1),  0 3.3px 4.9px rgba(0, 0, 0, 0.133),  0 6.7px 9.9px rgba(0, 0, 0, 0.167),  0 13.9px 20.4px rgba(0, 0, 0, 0.207),  0 38px 56px rgba(0, 0, 0, 0.2);"
			},
			colors: {
				'dark': {
					DEFAULT: 'hsl(202, 78%, 16%)',
					lighter: 'hsl(202, 70%, 20%)'
				},
				'accent': 'hsl(5, 77%, 37%)',
				'accent2': 'hsl(31, 67%, 34%)',
				'accent-light': '#fff4ed'
			},

			typography: (theme) => ({
				'xl': {
					css: {
						'line-height': '1.7',
						'ul > li:before':
						{
							top: '.8em !important'
						}
					}
				},
				'lg': {
					css: {
						'line-height': '1.6',
						'ul > li:before':
						{
							top: '.8em !important'
						},

						h1: {
							color: 'inherit',
							fontSize: '2.2em',
							lineHeight: '1.1'
						}

					}
				},
				DEFAULT: {

					css: {
						color: theme('colors.gray.900'),
						figcaption: {
							textAlign: "center"
						},
						a: {
							fontWeight: 'normal',
							transition: 'all .15s ease-in',
							'&:hover': {
								color: theme('colors.accent2'),
							},
						},

						blockquote: {
							fontWeight: 'normal',
						},

						code: {
							fontSize: '.8em',
							border: 'none',
							padding: '.3rem',
							fontWeight: 'normal',
							'&:before': { content: "none !important" },
							'&:after': { content: "none !important" },
							borderRadius: '3px',
							backgroundColor: 'rgba(229, 231, 235, .5)',
							fontFamily: 'unset'
						},
						h1: {
							color: 'inherit',
							fontSize: '2em',
							lineHeight: '1.1'
						},
						h2: {
							color: theme('colors.gray.700')
						},
						h3: {
							color: theme('colors.gray.700')

						},
						h4: {
							color: theme('colors.gray.700')

						}

					},
				},
				dark: {
					css: {
						color: theme('colors.gray.200'),
						a: {
							color: theme('colors.gray.200'),
							'&:hover': {
								color: theme('colors.accent'),
							},
						},
					}
				}
			}),
			opacity: (theme) => ({
				5: '.05',
				10: '.1',
				15: '.15',
				20: '.2',
			}),
			// created my own heights so can specify for Heros
			height: (theme) => ({
				'1/2': '50vh',
				'3/4': '75vh',
				'9/10': '90vh',
				'1/1': '100vh',
				'1/3': 'calc(100vh / 3)',
				'2/3': '66vh',
				'1/4': 'calc(100vh / 4)',
				'1/5': 'calc(100vh / 5)',
				96: '24rem',
				128: '32rem',
			}),
		},
		fontVariantCaps: { // defaults to these values
			'normal': 'normal',
			'small': 'small-caps',
			'all-small': 'all-small-caps',
			'petite': 'petite-caps',
			'unicase': 'unicase',
			'titling': 'titling-caps',
		},
		fontVariantNumeric: { // defaults to these values
			'normal': 'normal',
			'ordinal': 'ordinal',
			'slashed-zero': 'slashed-zero',
			'lining': 'lining-nums',
			'oldstyle': 'oldstyle-nums',
			'proportional': 'proportional-nums',
			'tabular': 'tabular-nums',
			'diagonal-fractions': 'diagonal-fractions',
			'stacked-fractions': 'stacked-fractions',
		},
		fontVariantLigatures: { // defaults to these values
			'normal': 'normal',
			'none': 'none',
			'common': 'common-ligatures',
			'no-common': 'no-common-ligatures',
			'discretionary': 'discretionary-ligatures',
			'no-discretionary': 'no-discretionary-ligatures',
			'historical': 'historical-ligatures',
			'no-historical': 'no-historical-ligatures',
			'contextual': 'contextual',
			'no-contextual': 'no-contextual',
		},
		textRendering: { // defaults to these values
			'rendering-auto': 'auto',
			'optimize-legibility': 'optimizeLegibility',
			'optimize-speed': 'optimizeSpeed',
			'geometric-precision': 'geometricPrecision'
		},
		textStyles: theme => ({ // defaults to {}
			heading: {
				output: false, // this means there won't be a "heading" component in the CSS, but it can be extended
				fontWeight: theme('fontWeight.bold'),
				lineHeight: theme('lineHeight.tight'),
			},
			h1: {
				extends: 'heading', // this means all the styles in "heading" will be copied here; "extends" can also be an array to extend multiple text styles
				fontSize: theme('fontSize.5xl'),
				'@screen sm': {
					fontSize: theme('fontSize.6xl'),
				},
			},
			h2: {
				extends: 'heading',
				fontSize: theme('fontSize.4xl'),
				'@screen sm': {
					fontSize: theme('fontSize.5xl'),
				},
			},
			h3: {
				extends: 'heading',
				fontSize: theme('fontSize.4xl'),
			},
			h4: {
				extends: 'heading',
				fontSize: theme('fontSize.3xl'),
			},
			h5: {
				extends: 'heading',
				fontSize: theme('fontSize.2xl'),
			},
			h6: {
				extends: 'heading',
				fontSize: theme('fontSize.xl'),
			},
			link: {
				fontWeight: theme('fontWeight.bold'),
				color: theme('colors.blue.400'),
				'&:hover': {
					color: theme('colors.blue.600'),
					textDecoration: 'underline',
				},
			},
			richText: {
				fontWeight: theme('fontWeight.normal'),
				fontSize: theme('fontSize.base'),
				lineHeight: theme('lineHeight.relaxed'),


				'> * + *': {
					marginTop: '1em',
				},
				'h1': {
					extends: 'h1',
					marginTop: '1.5em'

				},
				'h2': {
					extends: 'h2',
					marginTop: '1.5em'
				},
				'h3': {
					extends: 'h3',
					marginTop: '1.5em'

				},
				'h4': {
					extends: 'h4',
					marginTop: '1.5em'

				},
				'h5': {
					extends: 'h5',
					marginTop: '1.5em'

				},
				'h6': {
					extends: 'h6',
					marginTop: '1.5em'

				},
				'ul': {
					listStyleType: 'disc',
				},
				'ol': {
					listStyleType: 'decimal',
				},
				'a': {
					extends: 'link',
				},
				'b, strong': {
					fontWeight: theme('fontWeight.bold'),
				},
				'i, em': {
					fontStyle: 'italic',
				},
			},
		}),
	},
	plugins: [
		require('@tailwindcss/typography')({
			modifiers: ['lg', 'xl', '2xl'],
		}),
		require('tailwindcss/nesting'),
		require('tailwindcss-textshadow'),
		require('@tailwindcss/forms'),
	]
	,
}
