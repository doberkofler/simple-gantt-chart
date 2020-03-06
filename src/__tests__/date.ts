import {getDateWitoutTime} from '../date';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

describe('date', () => {
	it('getDateWitoutTime should set the time components to 0', () => {
		expect.hasAssertions();

		const date = new Date();
		const dateWithoutTime = getDateWitoutTime(date);

		expect(dateWithoutTime.getHours()).toBe(0);
		expect(dateWithoutTime.getMinutes()).toBe(0);
		expect(dateWithoutTime.getSeconds()).toBe(0);
		expect(dateWithoutTime.getMilliseconds()).toBe(0);
		expect(differenceInCalendarDays(date, dateWithoutTime)).toBe(0);
	});
});
