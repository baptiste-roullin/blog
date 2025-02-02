/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import forms from '@tailwindcss/forms'

export default {
	darkMode: 'class',
	safelist: ['sr-only'],
	content: [
		'./src/**/*.html',
		'./src/**/*.njk',
		'./src/**/*.md',
		'./src/filters/*.{ts,js}',
		'./src/shortcodes/*.{ts,js}',
	],
	theme: {
		extend: {

			maxWidth: {
				'8xl': '90rem',
				'9xl': '100rem',
				'1/4': '25%',
				'1/3': '33%',
				'1/2': '50%',
				'2/3': '66%'
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
				'per': '4%',
			},
			fontSize: {
				'xl-bis': '1.65rem',
				'lg-bis': "1.4rem"

			},
			textShadow: {
				"lg-blue": "3px 3px 6px rgb(0 0 0 / 46%), 0 0 5px rgb(15 3 86 / 42%)"
			},
			boxShadow: {
				"flat": "0 4px 5px 0px rgba(100,0,0,0.25)",
				"lg-blue":
					"0 1.3px 1.9px rgba(0, 0, 0, 0.1),  0 3.3px 4.9px rgba(0, 0, 0, 0.133),  0 6.7px 9.9px rgba(0, 0, 0, 0.167),  0 13.9px 20.4px rgba(0, 0, 0, 0.207),  0 38px 56px rgba(0, 0, 0, 0.2);"
			},
			typography: (theme) => ({

				'sm': {
					css: {
						h4: {
							marginBottom: '0px'
						}
					}
				},
				'md': {
					css: {
						h4: {
							marginBottom: '0px'
						}
					}
				},
				'xl': {
					css: {
						p: {
							"margin-top": "1.1em",
							"margin-bottom": "1.1em"
						},
						'line-height': '1.6',
						'ul > li:before':
						{
							top: '.8em !important'
						},
						h1: {
							lineHeight: '1.2',
						},
						h3: {
							marginTop: "1.4em",
							color: theme('colors.gray.700')
						},
						h4: {
							marginBottom: '0px'
						}
					}
				},
				'lg': {
					css: {
						p: {
							"margin-top": "1.1em",
							"margin-bottom": "1.1em"
						},
						'line-height': '1.5',
						'ul > li:before':
						{
							top: '.8em !important'
						},

						h1: {
							color: 'inherit',
							fontSize: '2.2em',
							lineHeight: '1.1'
						},
						h2: {
							marginTop: "1.3em",
							marginBottom: "0.5em"
						},
						h3: {
							marginTop: "1.4em",
						},
						h4: {
							marginBottom: '0px'
						}
					}
				},
				DEFAULT: {

					css: {
						'code::before': {
							content: 'none', // don’t generate the pseudo-element
							//                content: '""', // this is an alternative: generate pseudo element using an empty string
						},
						'code::after': {
							content: 'none'
						},

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
								color: theme('colors.brown-light'),
							},
						},
						blockquote: {
							fontWeight: 'normal',
							quotes: 'none',
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
							marginTop: "1.5em",

						},
						h3: {
							marginTop: "1.4em",
							color: theme('colors.gray.700')
						},
						h4: {
							color: theme('colors.gray.700'),
							marginBottom: '0px'
						}
					},
				},

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
		typography,
		forms,

	]
	,
}
