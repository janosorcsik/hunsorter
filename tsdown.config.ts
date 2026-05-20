import { defineConfig } from 'tsdown';

export default defineConfig([
	{
		entry: ['src/main.ts'],
		format: ['esm', 'cjs'],
	},
	{
		entry: ['src/main.ts'],
		format: ['iife'],
		globalName: 'hunsorter',
		minify: true,
	},
]);
