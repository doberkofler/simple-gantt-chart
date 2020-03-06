/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/strict-boolean-expressions */

/**
 * Is the given value a plain "object" (not null or a function)
 *
 * @param {*} value - The value to be checked
 * @returns {boolean} returns true if the value matches the type
 */
export function isObject(value: any): boolean {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
}

/**
 * Is the given value a function
 *
 * @param {*} value - The value to be checked
 * @returns {boolean} returns true if the value matches the type
 */
export function isFunction(value: any): value is Function {
	return !!(value && value.constructor && value.call && value.apply); // eslint-disable-line no-implicit-coercion
}

/**
 * Is the given value a number
 *
 * @param {*} value - The value to be checked
 * @returns {boolean} returns true if the value matches the type
 */
export function isNumber(value: any): value is number {
	return typeof value === 'number' && !Number.isNaN(value) && Number.isFinite(value);
}

/**
*	Is the given value an integer
*
 * @param {*} value - The value to be checked
 * @returns {boolean} returns true if the value matches the type
*/
export function isInteger(value: any): value is number {
	return isNumber(value) && value % 1 === 0;
}

/**
 * Is the given value a boolean
 *
 * @param {*} value - The value to be checked
 * @returns {boolean} returns true if the value matches the type
 */
export function isBoolean(value: any): value is boolean {
	return value === true || value === false || toString.call(value) === '[object Boolean]';
}

/**
 * Is the given value a Date
 *
 * @param {*} value - The value to be checked
 * @returns {boolean} returns true if the value matches the type
 */
export function isDate(value: any): value is Date {
	return toString.call(value) === '[object Date]';
}
