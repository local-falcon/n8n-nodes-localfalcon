module.exports = {
	root: true,
	parser: '@typescript-eslint/parser@5.62.0',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint'],
	extends: ['plugin:n8n-nodes-base/community'],
	rules: {
		'n8n-nodes-base/node-param-resource-with-plural-option': 'off',
	},
};
