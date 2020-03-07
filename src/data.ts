import addDays from 'date-fns/addDays';
import isValid from 'date-fns/isValid';
import {isInteger} from './types';
import {Config} from './config';
import {hasDuplicates} from './util';
import {taskType} from './index';
import {linkType} from './internalTypes';

/*
*	Convert the data
*/
export function setData(tasks: Array<taskType>, config: Config): void {
	if (!Array.isArray(tasks) || !tasks.every(e => typeof e === 'object')) {
		throw new Error('The method "setData" expects the first parameter to be an array of tasks');
	}

	let scaleStart: Date|null = null;
	let scaleEnd: Date|null = null;

	const taskIds: Array<number> = [];
	config.tasks = tasks.map(task => {
		// id
		if (!isInteger(task.id) || task.id <= 0) {
			throw new TypeError('The property "id" must be a positive integer');
		}
		if (taskIds.indexOf(task.id) !== -1) {
			throw new TypeError(`The task id "${task.id}" is used more then once`);
		}
		taskIds.push(task.id);

		// text
		if (typeof task.text !== 'string') {
			throw new TypeError(`The property "text" in task "${task.id}" must be a string`);
		}

		// startDate
		if (!isValid(task.startDate)) {
			throw new TypeError(`The property "startDate" in task "${task.id}" must be a Date`);
		}

		// days
		if (!isInteger(task.days) || task.days <= 0) {
			throw new TypeError('The property "days" must be a positive integer');
		}

		// calculate when the task ends
		const endDate = addDays(task.startDate, task.days);

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
			days: task.days,
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
