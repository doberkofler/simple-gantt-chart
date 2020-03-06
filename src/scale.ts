import {differenceInCalendarDays, addDays, format, getDateWitoutTime} from './date';

export const enum ScaleType {
	day = 'day',
}

export type scaleCellType = {
	day: Date,
	dayAsString: string,
	left: number,
};
export type scaleHeaderType = Array<scaleCellType>;

export function getTimelineScale(scale: ScaleType, cellWidth: number, startDate: Date, endDate: Date): scaleHeaderType {
	switch (scale) {
		case 'day':
			return getScaleDay(cellWidth, startDate, endDate);
		default:
			throw new TypeError(`Invalid scale "${scale}`);
	}
}

function getScaleDay(cellWidth: number, startDate: Date, endDate: Date): scaleHeaderType {
	const startDateWithoutTime = getDateWitoutTime(startDate);
	let endDateWithoutTime = addDays(getDateWitoutTime(endDate), 1);

	// make it at least 31 days
	const numberOfDays = differenceInCalendarDays(endDateWithoutTime, startDateWithoutTime);
	if (numberOfDays < 31) {
		endDateWithoutTime = addDays(endDateWithoutTime, 31 - numberOfDays - 1);
	}

	const days: scaleHeaderType = [];
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
