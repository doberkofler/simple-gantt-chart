module.exports = {
	ignorePatterns: [
		'.eslintrc.js',
		'node_modules/*',
		'dist/*',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: 'module',
		project: [
			'./tsconfig.json'
		]
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: [
					'.js',
					'.jsx'
				]
			},
			webpack: {
				config: './webpack.config.js'
			}
		},
	},
	env: {
		es6: true,
		browser: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:promise/recommended',
		'plugin:jest/all',
	],
	plugins: [
		'jest',
		'jsdoc',
	],
	rules: {
		//
		//	ESLINT RULES
		//

		// Possible Errors
		'for-direction': 'error',
		'no-async-promise-executor': 'warn',
		'no-await-in-loop': 'warn',
		'no-console': 'off',
		'no-debugger': 'warn',
		'no-empty': ['error', {'allowEmptyCatch': true}],
		'no-extra-boolean-cast': 'warn',
		'no-extra-parens': 'off',
		'no-import-assign': 'error',
		'no-misleading-character-class': 'error',
		'no-unsafe-finally': 'error',
		'no-prototype-builtins': 'off',
		'no-setter-return': 'warn',
		'no-template-curly-in-string': 'error',
		'require-atomic-updates': 'warn',

		// Best Practices
		'accessor-pairs': 'warn',
		'array-callback-return': 'warn',
		'complexity': ['warn', 30],
		'consistent-return': 'warn',
		'curly': ['error', 'all'],
		'default-case': 'error',
		'default-param-last': 'warn',
		'dot-notation': ['error', {'allowKeywords': true, 'allowPattern': '^[a-zA-Z]+(_[a-zA-Z]+)+$'}],
		'eqeqeq': 'error',
		'guard-for-in': 'off',
		'grouped-accessor-pairs': 'warn',
		'no-alert': 'off',
		'no-caller': 'error',
		'no-case-declarations': 'error',
		'no-constructor-return': 'warn',
		'no-div-regex': 'error',
		'no-empty-pattern': 'warn',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'warn',
		'no-fallthrough': 'warn',
		'no-floating-decimal': 'error',
		'no-implicit-coercion': ['warn', {'boolean': true, 'number': true, 'string': true}],
		'no-implicit-globals': 'warn',
		'no-implied-eval': 'error',
		'no-invalid-this': 'error',
		'no-iterator': 'error',
		'no-labels': ['error', {'allowLoop': false, 'allowSwitch': false}],
		'no-lone-blocks': 'warn',
		'no-loop-func': 'error',
		'no-magic-numbers': 'off',
		'no-multi-spaces': ['warn', {'ignoreEOLComments': true}],
		'no-multi-str': 'error',
		'no-native-reassign': 'error',
		'no-new-func': 'error',
		'no-new-wrappers': 'error',
		'no-octal-escape': 'error',
		'no-octal': 'error',
		'no-process-env': 'error',
		'no-proto': 'error',
		'no-redeclare': ['error', {'builtinGlobals': true}],
		'no-return-assign': 'error',
		'no-return-await': 'error',
		'no-script-url': 'error',
		'no-self-assign': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'error',
		'no-unmodified-loop-condition': 'warn',
		'no-unused-expressions': ['warn', {'allowTernary': true}],
		'no-unused-labels': 'warn',
		'no-useless-call': 'warn',
		'no-useless-catch': 'warn',
		'no-useless-concat': 'warn',
		'no-useless-return': 'warn',
		'no-void': 'error',
		'no-warning-comments': 'off',
		'no-with': 'error',
		'radix': 'error',
		'vars-on-top': 'error',
		'wrap-iife': ['error', 'outside'],
		'yoda': ['error', 'never', {'exceptRange': true}],

		// Strict Mode
		'strict': ['error', 'global'],

		// Variables
		'no-delete-var': 'error',
		'no-label-var': 'error',
		'no-shadow': ['error',
			{
				'builtinGlobals': true,
				'allow': [
					'close',
					'event',
					'external',
					'innerHeight',
					'length',
					'module',
					'name',
					'open',
					'parent',
					'print',
					'prompt',
					'status',
					'test',
					'toolbar',
					'top',
					'URL',
				]
			}
		],
		'no-shadow-restricted-names': 'error',
		'no-undef': 'error',
		'no-undef-init': 'error',
		'no-undefined': 'off',
		'no-unused-vars': ['warn', {'vars': 'all', 'args': 'after-used'}],
		'no-use-before-define': ['error', 'nofunc'],

		// Node.js and CommonJS
		'global-require': 'warn',
		'handle-callback-err': 'warn',
		'no-buffer-constructor': 'warn',
		'no-new-require': 'warn',
		'no-path-concat': 'warn',

		// Stylistic Issues
		'array-bracket-newline': 'off',
		'array-bracket-spacing': ['warn', 'never'],
		'block-spacing': ['warn', 'never'],
		'brace-style': ['warn', '1tbs'],
		'camelcase': ['warn', {'properties': 'never'}],
		'comma-spacing': ['warn', {'before': false, 'after': true}],
		'comma-style': ['warn', 'last'],
		'computed-property-spacing': ['warn', 'never'],
		'consistent-this': ['warn', 'that'],
		'eol-last': 'warn',
		'func-call-spacing': ['warn', 'never'],
		'func-names': 'off',
		'func-style': 'off',
		'function-paren-newline': ['warn', 'multiline'],
		'id-blacklist': 'off',
		'id-length': 'off',
		'id-match': 'off',
		'implicit-arrow-linebreak': 'warn',
		'indent': ['warn', 'tab', {'SwitchCase': 1}],
		'jsx-quotes': ['warn', 'prefer-double'],
		'key-spacing': ['warn', {'beforeColon': false, 'afterColon': true}],
		'keyword-spacing': ['error', {'before': true, 'after': true, 'overrides': {}}],
		'linebreak-style': 'off',
		'lines-around-comment': 'off',
		'max-depth': ['warn', 10],
		'max-len': ['warn', 500],
		'max-lines': ['warn', 1000],
		'max-nested-callbacks': ['warn', 10],
		'max-params': ['warn', 10],
		'max-statements': ['warn', 150],
		'max-statements-per-line': ['warn', {'max': 2}],
		'new-cap': 'warn',
		'new-parens': 'warn',
		'newline-per-chained-call': 'off',
		'no-array-constructor': 'warn',
		'no-bitwise': 'warn',
		'no-continue': 'warn',
		'no-inline-comments': 'off',
		'no-lonely-if': 'off',
		'no-mixed-spaces-and-tabs': 'warn',
		'no-multiple-empty-lines': 'off',
		'no-multi-assign': 'warn',
		'no-negated-condition': 'off',
		'no-new-object': 'warn',
		'no-plusplus': 'off',
		'no-restricted-syntax': ['warn', 'WithStatement'],
		'no-ternary': 'off',
		'no-trailing-spaces': 'warn',
		'no-underscore-dangle': 'off',
		'no-unneeded-ternary': 'warn',
		'no-whitespace-before-property': 'warn',
		'object-curly-newline': 'off',
		'object-curly-spacing': ['warn', 'never'],
		'one-var-declaration-per-line': 'off',
		'operator-assignment': 'off',
		'operator-linebreak': ['warn', 'after', {'overrides': {'?': 'ignore', ':': 'ignore'}}],
		'padded-blocks': 'off',
		'padding-line-between-statements': ['warn',
			{'blankLine': 'always', 'prev': 'directive', 'next': '*'},
			{'blankLine': 'any', 'prev': 'directive', 'next': 'directive'}
		],
		'quote-props': ['warn', 'consistent'],
		'quotes': ['warn', 'single', 'avoid-escape'],
		'semi': ['warn', 'always'],
		'semi-spacing': ['warn', {'before': false, 'after': true}],
		'semi-style': ['error', 'last'],
		'sort-imports': 'off',
		'sort-vars': 'off',
		'space-before-blocks': 'warn',
		'space-before-function-paren': ['warn', {'anonymous': 'always', 'named': 'never'}],
		'space-infix-ops': 'warn',
		'space-unary-ops': [
			'warn', {
				'words': true,
				'nonwords': false
			}
		],
		'spaced-comment': ['off', 'always'],
		'switch-colon-spacing': ['error', {'after': true, 'before': false}],
		'unicode-bom': ['error', 'never'],
		'wrap-regex': 'off',

		// ECMAScript 6
		'arrow-spacing': ['warn', {'before': true, 'after': true}],
		'constructor-super': 'error',
		'generator-star-spacing': ['warn', {'before': true, 'after': false}],
		'no-class-assign': 'error',
		'no-confusing-arrow': 'error',
		'no-const-assign': 'error',
		'no-dupe-class-members': 'error',
		'no-duplicate-imports': 'error',
		'no-new-symbol': 'error',
		'no-restricted-imports': ['error', {
			'paths': [
				'lodash',
			],
			'patterns': [
				'lodash/*',
			]
		}],
		'no-this-before-super': 'error',
		'no-useless-constructor': 'error',
		'no-useless-computed-key': 'warn',
		'no-useless-rename': 'warn',
		'no-var': 'error',
		'object-shorthand': 'off',
		'prefer-arrow-callback': 'off',
		'prefer-const': 'warn',
		'prefer-reflect': 'off',
		'prefer-rest-params': 'off',
		'prefer-spread': 'off',
		'prefer-template': 'off',
		'require-yield': 'error',
		'template-curly-spacing': 'error',
		'yield-star-spacing': 'error',

		//
		//	@TYPESCRIPT-ESLINT RULES
		//

		'@typescript-eslint/array-type': ['warn', {default: 'generic'}],
		'@typescript-eslint/await-thenable': 'warn',
		'@typescript-eslint/ban-ts-comment': ['warn',
			{
				'ts-ignore': true,
				'ts-nocheck': true,
				'ts-check': false
			}
		],
		'@typescript-eslint/ban-ts-ignore': 'off',
		'brace-style': 'off',
		'@typescript-eslint/brace-style': ['warn', '1tbs'],
		'comma-spacing': 'off',
		'@typescript-eslint/comma-spacing': ['warn', {'before': false, 'after': true}],
		'@typescript-eslint/explicit-function-return-type': 'warn',
		'@typescript-eslint/explicit-member-accessibility': 'warn',
		'indent': 'off',
		'@typescript-eslint/indent': ['warn', 'tab', {'SwitchCase': 1}],
		'@typescript-eslint/member-delimiter-style': ['warn',
			{
				singleline: {
					delimiter: 'comma',
					requireLast: false
				},
				multiline: {
					delimiter: 'comma',
					requireLast: true
				}
			}
		],
		'camelcase': 'off',
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'variable',
				format: ['camelCase', 'UPPER_CASE'], // only camelCase would be more appropriate
				leadingUnderscore: 'allow'
			},
			{
				selector: 'function',
				format: ['camelCase'], // only camelCase would be more appropriate
				leadingUnderscore: 'allow'
			},
			{
				selector: 'parameter',
				format: ['camelCase'],
				leadingUnderscore: 'allow'
			},
			/*
			{
				selector: 'property',
				format: ['camelCase']
			},
			{
				selector: 'parameterProperty',
				format: ['camelCase']
			},
			*/
			{
				selector: 'method',
				format: ['camelCase'],
				leadingUnderscore: 'allow'
			},
			/*
			{
				selector: 'accessor',
				format: ['camelCase']
			},
			{
				selector: 'enumMember',
				format: ['camelCase']
			},
			*/
			{
				selector: 'class',
				format: ['PascalCase']
			},
			/*
			{
				selector: 'interface',
				format: ['camelCase']
			},
			{
				selector: 'typeAlias',
				format: ['camelCase']
			},
			{
				selector: 'enum',
				format: ['camelCase']
			},
			{
				selector: 'typeParameter',
				format: ['camelCase']
			},
			*/
		],
		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-base-to-string': 'warn',
		'@typescript-eslint/no-dupe-class-members': ['error'],
		'@typescript-eslint/no-dynamic-delete': 'warn',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'warn',
		'no-extra-parens': 'off',
		'@typescript-eslint/no-extra-parens': 'warn',
		'no-extra-semi': 'off',
		'@typescript-eslint/no-extra-semi': ['error'],
		'@typescript-eslint/no-extraneous-class': 'warn',
		'@typescript-eslint/no-for-in-array': 'warn',
		'@typescript-eslint/no-inferrable-types': ['warn', {'ignoreParameters': true}],
		'@typescript-eslint/no-misused-promises': 'warn',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-unnecessary-boolean-literal-compare': 'warn',
		'@typescript-eslint/no-unnecessary-condition': ['warn', {ignoreRhs: true}],
		'@typescript-eslint/no-unnecessary-qualifier': 'warn',
		'@typescript-eslint/no-unnecessary-type-assertion': 'warn',
		'@typescript-eslint/no-unsafe-call': 'warn',
		'@typescript-eslint/no-unsafe-member-access': 'warn',
		'@typescript-eslint/no-unsafe-return': 'warn',
		'@typescript-eslint/no-untyped-public-signature': 'warn',
		'@typescript-eslint/no-useless-constructor': 'warn',
		'@typescript-eslint/no-require-imports': 'warn',
		'@typescript-eslint/no-this-alias': [
			'warn',
			{
				allowDestructuring: true,
				allowedNames: ['that']
			}
		],
		'@typescript-eslint/no-throw-literal': ['error'],
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/prefer-as-const': ['error'],
		'@typescript-eslint/prefer-function-type': 'warn',
		'@typescript-eslint/prefer-includes': 'off',
		'@typescript-eslint/prefer-interface': 'off',
		'@typescript-eslint/prefer-string-starts-ends-with': 'off',
		'@typescript-eslint/prefer-readonly': 'warn',
		'@typescript-eslint/prefer-readonly-parameter-types': 'off', // should probably be on
		'@typescript-eslint/promise-function-async': 'warn',
		'@typescript-eslint/require-array-sort-compare': 'warn',
		'require-await': 'off',
		'@typescript-eslint/require-await': 'warn',
		'@typescript-eslint/restrict-plus-operands': 'off',
		'@typescript-eslint/restrict-template-expressions': ['off', {allowNumber: true, allowBoolean: true, allowNullable: true}],
		'space-before-function-paren': 'off',
		'@typescript-eslint/space-before-function-paren': ['warn', {'anonymous': 'always', 'named': 'never'}],
		'@typescript-eslint/strict-boolean-expressions': 'warn',
		'@typescript-eslint/switch-exhaustiveness-check': 'warn',
		'@typescript-eslint/unbound-method': 'warn',

		//
		//	PROMISE RULES
		//
		'promise/avoid-new': 'error',
		'promise/always-return': 'off',
		'promise/no-callback-in-promise': 'error',
		'promise/no-nesting': 'error',
		'promise/prefer-await-to-then': 'error',
		//'promise/prefer-await-to-callbacks': 'error',

		//
		//	JSDOC RULES
		//

		'jsdoc/check-param-names': 'warn',
		'jsdoc/check-tag-names': 'warn',
		'jsdoc/check-types': 'off',
		'jsdoc/newline-after-description': 'off',
		'jsdoc/no-undefined-types': 'off',
		'jsdoc/require-description': 'off',
		'jsdoc/require-description-complete-sentence': 'off',
		'jsdoc/require-example': 'off',
		'jsdoc/require-hyphen-before-param-description': 'off',
		'jsdoc/require-param': 'warn',
		'jsdoc/require-param-description': 'warn',
		'jsdoc/require-param-name': 'warn',
		'jsdoc/require-param-type': 'warn',
		'jsdoc/require-returns-description': 'warn',
		'jsdoc/require-returns-type': 'warn',
		'jsdoc/valid-types': 'warn',
	},
};
