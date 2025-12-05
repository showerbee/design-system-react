module.exports = {
	root: true,
	env: {
		browser: true,
		es2022: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:storybook/recommended',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
		project: ['./tsconfig.json', './tsconfig.node.json'],
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks'],
	settings: {
		react: {
			version: 'detect',
		},
	},
	ignorePatterns: [
		'dist',
		'node_modules',
		'*.config.js',
		'*.config.cjs',
		'*.config.mjs',
		'coverage',
		'.storybook',
	],
	rules: {
		// TypeScript handles these
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],

		// Allow any for gradual migration
		'@typescript-eslint/no-explicit-any': 'warn',

		// React 19 doesn't require importing React
		'react/react-in-jsx-scope': 'off',

		// PropTypes are being replaced with TypeScript
		'react/prop-types': 'off',

		// Allow function expressions for component definitions
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',

		// Hooks rules
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',

		// Allow require() for legacy compatibility during migration
		'@typescript-eslint/no-require-imports': 'off',

		// Allow non-null assertions during migration
		'@typescript-eslint/no-non-null-assertion': 'warn',

		// Console warnings for debugging (will clean up later)
		'no-console': ['warn', { allow: ['warn', 'error'] }],
	},
	overrides: [
		// JavaScript files (legacy, being migrated)
		{
			files: ['**/*.js', '**/*.jsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: null,
			},
			rules: {
				// Relax TypeScript rules for JS files
				'@typescript-eslint/no-var-requires': 'off',
				'@typescript-eslint/no-require-imports': 'off',
			},
		},
		// Test files
		{
			files: [
				'**/__tests__/**/*.{ts,tsx,js,jsx}',
				'**/*.test.{ts,tsx,js,jsx}',
				'**/*.spec.{ts,tsx,js,jsx}',
				'vitest.setup.ts',
			],
			env: {
				jest: true,
			},
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
			},
		},
		// Storybook files
		{
			files: ['**/__docs__/**/*.{ts,tsx,js,jsx}', '**/*.stories.{ts,tsx,js,jsx}'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'no-console': 'off',
			},
		},
		// Example files
		{
			files: ['**/__examples__/**/*.{ts,tsx,js,jsx}'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'no-console': 'off',
			},
		},
	],
};

