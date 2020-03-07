import {getTimelineScale, ScaleType} from '../scale';

describe('scale', () => {
	it('getTimelineScale(day) should return a daily scale', () => {
		expect.hasAssertions();

		const cellWidth = 100;
		const startDate = new Date(2020, 0, 10); // 10-JAN-2020
		const endDate = new Date(2020, 1, 10); // 10-FEB-2020
		const scale = getTimelineScale(ScaleType.day, cellWidth, startDate, endDate);

		expect(scale).toHaveLength(32);
		expect(scale[0]).toStrictEqual({
			day: new Date(2020, 0, 10),
			dayAsString: '10. Jan',
			left: 0,
		});
		expect(scale[1]).toStrictEqual({
			day: new Date(2020, 0, 11),
			dayAsString: '11. Jan',
			left: cellWidth,
		});
		expect(scale[scale.length - 1]).toStrictEqual({
			day: new Date(2020, 1, 10),
			dayAsString: '10. Feb',
			left: cellWidth * (32 - 1),
		});
	});

	it('getTimelineScale(day) should return not return less than 31 days', () => {
		expect.hasAssertions();

		const startDate = new Date(2020, 0, 10); // 10-JAN-2020
		const endDate = new Date(2020, 0, 11); // 11-JAN-2020
		const scale = getTimelineScale(ScaleType.day, 100, startDate, endDate);

		expect(scale).toHaveLength(32);
	});

	it('getTimelineScale(day) should throw an exception if the start date is after the end date', () => {
		expect.hasAssertions();

		const startDate = new Date(2020, 0, 11); // 11-JAN-2020
		const endDate = new Date(2020, 0, 10); // 10-JAN-2020

		expect(() => getTimelineScale(ScaleType.day, 100, startDate, endDate)).toThrow('Invalid date range');
	});

	it('getTimelineScale with invalid type should throw an exception', () => {
		expect.hasAssertions();

		const startDate = new Date(2020, 0, 10); // 10-JAN-2020
		const endDate = new Date(2020, 0, 11); // 11-JAN-2020

		expect(() => getTimelineScale('month' as unknown as ScaleType, 100, startDate, endDate)).toThrow('Invalid scale "month"');
	});
});
