/* eslint-disable @typescript-eslint/no-explicit-any, jest/valid-title */

import {isObject, isFunction, isNumber, isInteger, isBoolean, isDate} from '../types';

describe('types', () => {
	const tests = [
		{
			value: '',
			title: 'empty string',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: true,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: '4',
			title: 'string',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: true,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: 4,
			title: 'integer',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: true,
			_isInteger: true,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: 4.4,
			title: 'float',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: true,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: NaN,
			title: 'NaN',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: Infinity,
			title: 'Infinity',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: -Infinity,
			title: '-Infinity',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: true,
			title: 'true',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: true,
			_isDate: false
		},
		{
			value: false,
			title: 'false',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: true,
			_isDate: false
		},
		{
			value: Boolean(1),
			title: 'Boolean(1)',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: true,
			_isDate: false
		},
		{
			value: Boolean(0),
			title: 'Boolean(0)',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: true,
			_isDate: false
		},
		{
			value: {},
			title: '{}',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: true,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: [],
			title: '[]',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: true,
			_isArray: true,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: function (): void {},
			title: 'function',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: true,
			_isArray: false,
			_isFunction: true,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: (): void => {},
			title: 'fat arrow function',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: true,
			_isArray: false,
			_isFunction: true,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: async (): Promise<void> => {},
			title: 'async function',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: true,
			_isArray: false,
			_isFunction: true,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: new Date(),
			title: 'new Date()',
			_isDefined: true,
			_isUndefined: false,
			_isNull: false,
			_isObject: true,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: true
		},
		{
			value: undefined,
			title: 'undefined',
			_isDefined: false,
			_isUndefined: true,
			_isNull: false,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		},
		{
			value: null,
			title: 'null',
			_isDefined: true,
			_isUndefined: false,
			_isNull: true,
			_isObject: false,
			_isArray: false,
			_isFunction: false,
			_isString: false,
			_isNumber: false,
			_isInteger: false,
			_isBoolean: false,
			_isDate: false
		}
	];

	[isObject, isFunction, isNumber, isInteger, isBoolean, isDate].forEach(func => {
		const funcName = func.name;
		it(funcName, () => {
			expect.hasAssertions();
			tests.forEach(test => {
				const property = '_' + funcName;
				if (!(property in test)) {
					throw new Error(`Missing property "${property}" in test "${test.title}"`);
				}
				expect(func(test.value)).toStrictEqual((test as {[key: string]: any})[property]);
			});
		});
	});
});
