import {isValid, addDays} from './date';
import {Config} from './config';
import {hasDuplicates} from './util';
import {taskType, headerColumnType} from './index';
import {linkType} from './internalTypes';

/*
*	Get the default tree configuration
*/
export function getDefaultTreeColumns(): Array<headerColumnType> {
	return [
		{
			id: 'text',
			title: 'Tasks',
		},
		{
			id: 'days',
			title: 'Days',
			width: 60,
		},
	];
}

/*
*	Convert the data
*/
export function setData(tasks: Array<taskType>, config: Config): void {
	if (!Array.isArray(tasks)) {
		throw new Error('The method "setData" expects the first parameter to be an array of tasks');
	}

	let scaleStart: Date|null = null;
	let scaleEnd: Date|null = null;

	const taskIds: Array<number> = [];
	config.tasks = tasks.map(task => {
		// make sure that the id is unique
		if (taskIds.indexOf(task.id) !== -1) {
			throw new TypeError(`The task id ${task.id} is used more then once`);
		}
		taskIds.push(task.id);

		// round the duration in days
		const days = Math.round(task.days);
		if (days <= 0) {
			throw new TypeError(`Duration in task ${task.id} is <= 0`);
		}

		if (!isValid(task.startDate)) {
			throw new TypeError(`Start date in task ${task.id} is invalid`);
		}

		// calculate when the task ends
		const endDate = addDays(task.startDate, days);

		// capture the date range
		if (scaleStart === null || task.startDate < scaleStart) {
			scaleStart = task.startDate;
		}
		if (scaleEnd === null || endDate > scaleEnd) {
			scaleEnd = endDate;
		}

		return {
			id: task.id,
			text: task.text,
			startDate: task.startDate,
			endDate,
			days,
		};
	});

	if (scaleStart !== null) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
		config.scaleStart = scaleStart;
	}
	if (scaleEnd !== null) { // eslint-disable-line @typescript-eslint/no-unnecessary-condition
		config.scaleEnd = scaleEnd;
	}

	// calculate the links
	config.links = getLinks(tasks, taskIds);
}

/*
*	Convert the links
*/
function getLinks(tasks: Array<taskType>, taskIds: Array<number>): Array<linkType> {
	const links: Array<linkType> = [];

	// process all tasks
	tasks.forEach(task => {
		if (Array.isArray(task.dependencies)) {
			// the list of dependencies is not allowed to have any duplicates
			if (hasDuplicates(task.dependencies)) {
				throw new TypeError(`The dependencies in the task with id "${task.id}" contain duplicates`);
			}

			// process all tasks this task dependens upon
			task.dependencies.forEach(source => {
				// make sure that the task id exists
				if (taskIds.indexOf(source) === -1) {
					throw new TypeError(`The task with id "${task.id}" has an invalid dependency "${source}"`);
				}

				// add link
				links.push({
					source,
					target: task.id,
				});
			});
		}
	});

	return links;
}
