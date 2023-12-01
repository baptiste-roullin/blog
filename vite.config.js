import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		origin: 'http://127.0.0.1:8080',
	},
	build: {
		manifest: true,
		outDir: "dist",
		rollupOptions: {
			input: {
				search_front: resolve(__dirname, 'src/assets/scripts/search_front.ts'),
				contact: resolve(__dirname, 'src/assets/scripts/contact.ts'),
				main: resolve(__dirname, 'src/assets/scripts/main.js'),
				picture_lightbox: resolve(__dirname, 'src/assets/scripts/picture_lightbox.js'),
				spin: resolve(__dirname, 'src/assets/scripts/spin.js'),
				nav: resolve(__dirname, 'src/assets/scripts/nav.js'),
				arrowPagination: resolve(__dirname, 'src/assets/scripts/arrow_pagination.js'),
				truchet: resolve(__dirname, 'src/features/truchet/truchet_core.ts'),
				truchet_dom: resolve(__dirname, 'src/features/truchet/truchet_dom.ts'),
				dateFormatting: resolve(__dirname, 'src/filters/date_formatting.ts'),
			},
		},
	},
})