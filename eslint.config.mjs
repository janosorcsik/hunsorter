import xoTypeScript from 'eslint-config-xo-typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
	{
		ignores: ['dist/', 'eslint.config.mjs', '**/*.js'],
	},
	...xoTypeScript,
	{
		files: ['src/**/*.ts'],
		rules: {
			'@stylistic/object-curly-spacing': ['error', 'always'],
			'@stylistic/function-paren-newline': ['error', 'multiline-arguments'],
		},
	},
	eslintPluginPrettierRecommended,
];
