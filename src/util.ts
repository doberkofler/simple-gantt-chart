export function hasDuplicates(array: Array<string|number>): boolean {
	return new Set(array).size !== array.length;
}
