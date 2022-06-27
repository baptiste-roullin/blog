/** @type {import('tailwindcss').Config} */

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
				'per': '4%',
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
					light: 'hsl(217,32%,32%)',
					lighter: 'hsl(202, 70%, 20%)'
				},
				'accent': 'hsl(5, 77%, 37%)',
				'accent2': 'hsl(31, 67%, 34%)',
				'accent3': 'hsl(30.8, 95%, 17.3%)',
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
						'ul': {
							marginTop: '1.2em',
							marginBottom: '1.2em',
						},
						'ol': {
							marginTop: '1.2em',
							marginbottom: '1.2em',
						},
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
						color: theme('colors.gray.50'),
						a: {
							color: theme('colors.gray.50'),
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
			height: (theme) => ({
				'1/2': '50vh',
				'3/4': '75vh',
				'9/10': '90vh',
				'1/1': '100vh',
				/*				'1/3': 'calc(100vh / 3)',*/
				'2/3': '66vh',
				/*				'1/4': 'calc(100vh / 4)',
								'1/5': 'calc(100vh / 5)',*/
				'17/20': '85%',
				96: '24rem',
				128: '32rem',
			}),
		},


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
