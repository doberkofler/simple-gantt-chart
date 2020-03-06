export function getDateWitoutTime(date: Date): Date {
	const temp = new Date(date);
	temp.setHours(0, 0, 0, 0);
	return temp;
}
