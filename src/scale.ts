import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import format from 'date-fns/format';
import {getDateWitoutTime} from './date';
import addDays from 'date-fns/addDays';

export const enum ScaleType {
	day = 'day',
}

export type scaleCellType = {
	day: Date,
	dayAsString: string,
	left: number,
};

export function getTimelineScale(scale: ScaleType, cellWidth: number, startDate: Date, endDate: Date): Array<scaleCellType> {
	switch (scale) {
		case 'day':
			return getScaleDay(cellWidth, startDate, endDate);
		default:
			throw new TypeError(`Invalid scale "${scale}"`);
	}
}

function getScaleDay(cellWidth: number, startDate: Date, endDate: Date): Array<scaleCellType> {
	if (endDate < startDate) {
		throw new Error('Invalid date range');
	}

	const startDateWithoutTime = getDateWitoutTime(startDate);
	let endDateWithoutTime = getDateWitoutTime(endDate);

	// make it at least 31 days
	const numberOfDays = differenceInCalendarDays(endDateWithoutTime, startDateWithoutTime);
	if (numberOfDays < 31) {
		endDateWithoutTime = addDays(endDateWithoutTime, 31 - numberOfDays);
	}

	const days: Array<scaleCellType> = [];
	let left = 0;
	for (let day = new Date(startDateWithoutTime); day <= endDateWithoutTime; day = addDays(day, 1)) {
		days.push({
			day: new Date(day),
			dayAsString: format(day, 'd. MMM'),
			left,
		});
		left += cellWidth;
	}

	return days;
}
