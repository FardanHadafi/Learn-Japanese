import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),
		prerender: {
			entries: ['*']
		},
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/Learn-Japanese' : ''
		},
		files: {
			lib: 'src/lib'
		}
	}
};

export default config;
