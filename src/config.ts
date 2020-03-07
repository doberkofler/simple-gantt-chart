import {v4 as uuid} from 'uuid';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import {getDateWitoutTime} from './date';
import {getElementByIdAndClass} from './dom/dom';
import {ScaleType} from './scale';
import {headerColumnType, optionsType} from './index';
import {internalTaskType, linkType} from './internalTypes';

export class Config {
	public id: string;
	public columns: Array<headerColumnType>;
	public scale: ScaleType;
	public treeWidthPercentage: number;
	public timelineCellWidth: number;
	public lineHeight: number;
	public scaleStart: Date;
	public scaleEnd: Date;
	public tasks: Array<internalTaskType>;
	public links: Array<linkType>;

	public constructor() {
		const now = new Date();

		this.id = uuid();
		this.columns = getDefaultTreeColumns();
		this.scale = ScaleType.day;
		this.scaleStart = getDateWitoutTime(startOfMonth(now));
		this.scaleEnd = getDateWitoutTime(endOfMonth(now));
		this.treeWidthPercentage = 30;
		this.timelineCellWidth = 60;
		this.lineHeight = 34;
		this.tasks = [];
		this.links = [];
	}

	public setConfig(options: optionsType): void {
		// treeWidthPercentage
		if (typeof options.treeWidthPercentage !== 'undefined') {
			if (typeof options.treeWidthPercentage === 'number' && options.treeWidthPercentage >= 0 && options.treeWidthPercentage <= 100) {
				this.treeWidthPercentage = options.treeWidthPercentage;
			} else {
				throw new TypeError(`The option "treeWidthPercentage" must be a number between 0 and 100: ${options.treeWidthPercentage}`);
			}
		}

		// columns
		if (typeof options.columns !== 'undefined') {
			this.columns = getColumns(options.columns);
		}
	}

	public getElementByClassName(className: string): Element {
		return getElementByIdAndClass(this.id, className);
	}

	/*
	public getTask(id: number): internalTaskType {
		const task = this.tasks.find(e => e.id === id);

		if (typeof task === 'undefined') {
			throw new Error(`Cannot find task with id "${id}"`);
		}

		return task;
	}
	*/
}

/*
*	Get the default tree configuration
*/
function getDefaultTreeColumns(): Array<headerColumnType> {
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

function getColumns(columns: Array<headerColumnType>): Array<headerColumnType> {
	if (!Array.isArray(columns)) {
		throw new TypeError('The option "columns" must be an array');
	}

	const columnIds: Array<string> = [];
	const newColumns = columns.map(column => {
		// make sure that the id is unique
		if (columnIds.indexOf(column.id) !== -1) {
			throw new TypeError(`The option columns uses the id "${column.id}" more then once`);
		}
		columnIds.push(column.id);

		return Object.assign({}, column);
	});

	const requiredColumns = ['text', 'days'];
	requiredColumns.forEach(column => {
		if (columnIds.indexOf(column) === -1) {
			throw new TypeError(`The option "columns" does not contain the required column "${column}"`);
		}
	});

	return newColumns;
}
