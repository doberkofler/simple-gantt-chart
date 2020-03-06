import {hasDuplicates} from '../util';

describe('util', () => {
	it('hasDuplicates should detect duplicates', () => {
		expect.hasAssertions();

		expect(hasDuplicates([])).toBe(false);
		expect(hasDuplicates([1])).toBe(false);
		expect(hasDuplicates([1, 2])).toBe(false);
		expect(hasDuplicates([1, 2, 1])).toBe(true);
		expect(hasDuplicates(['a'])).toBe(false);
		expect(hasDuplicates(['a', 'b'])).toBe(false);
		expect(hasDuplicates(['a', 'b', 'a'])).toBe(true);
	});
});
