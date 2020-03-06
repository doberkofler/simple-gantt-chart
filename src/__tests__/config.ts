import {getDefaultTreeColumns} from '../config';

describe('config', () => {
	it('getDefaultTreeColumns should return the default configuration', () => {
		expect.hasAssertions();

		expect(getDefaultTreeColumns()).toStrictEqual([
			{
				id: 'text',
				title: 'Tasks',
			},
			{
				id: 'days',
				title: 'Days',
				width: 60,
			},
		]);
	});
});
