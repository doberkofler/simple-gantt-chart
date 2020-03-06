export {default as isValid} from 'date-fns/isValid';
export {default as addDays} from 'date-fns/addDays';
export {default as subDays} from 'date-fns/subDays';
export {default as startOfMonth} from 'date-fns/startOfMonth';
export {default as endOfMonth} from 'date-fns/endOfMonth';
export {default as differenceInCalendarDays} from 'date-fns/differenceInCalendarDays';
export {default as format} from 'date-fns/format';

export function getDateWitoutTime(date: Date): Date {
	const temp = new Date(date);
	temp.setHours(0, 0, 0, 0);
	return temp;
}
