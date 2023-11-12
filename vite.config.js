import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		//	outDir: 'dist/assets/'
	},
	publicDir: "dist/assets/",
	resolve: { mainFields: ["assets/scripts/main.js"] }
	//appType: "mpa"
})