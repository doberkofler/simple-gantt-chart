import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import {Config} from '../config';
import {classNames} from '../classNames';
import {getContainer} from '../dom/tags';
import {getTimelineScale, scaleCellType} from '../scale';
import {getLinkMarkup} from './Link';
import {internalTaskType, linkType, computedTaskType} from '../internalTypes';

export class Timeline {
	private readonly _config: Config;
	private readonly _width: number;
	private readonly _scale: Array<scaleCellType>;
	private readonly _taskModel: Array<computedTaskType>;

	public constructor(config: Config, width: number) {
		this._config = config;
		this._width = width;
		this._scale	= getTimelineScale(config.scale, config.timelineCellWidth, config.scaleStart, config.scaleEnd);
		this._taskModel	= getTaskModel(this._scale, this._config.tasks, this._config.lineHeight, config.timelineCellWidth);
	}

	public getTimelineHeight(): number {
		return this._config.tasks.length * this._config.lineHeight;
	}

	public getTimelineWidth(): number {
		return this._scale.length * this._config.timelineCellWidth;
	}

	public getHeader(): string {
		const content = getHeaderRow(this._scale, this._config.lineHeight, this._config.timelineCellWidth);

		return getContainer(classNames.timelineHeaderView, {
			'box-sizing': 'border-box',
			'width': `${this._width}px`,
			'display': 'flex',
			'flex-direction': 'row',
			'overflow-x': 'hidden',
			'overflow-y': 'hidden'
		}, content);
	}

	public getTable(): string {
		const timelineHeight = this.getTimelineHeight();

		const gridLayer = getTableGrids(timelineHeight, this._width, this._config.lineHeight, this._config.timelineCellWidth, this._scale, this._config.tasks);
		const taskLayer = getTableTasks(timelineHeight, this._width, this._taskModel);
		const linkLayer = getTableLinks(timelineHeight, this._width, this._config.lineHeight, this._taskModel, this._config.links);

		return getContainer(classNames.timelineTableView, {
			'box-sizing': 'border-box',
			'position': 'relative',
			'width': `${this._width}px`,
			'height': `${timelineHeight}px`,
			'overflow-x': 'hidden',
			'overflow-y': 'hidden'
		}, gridLayer + taskLayer + linkLayer);
	}
}

function getHeaderRow(scaleHeader: Array<scaleCellType>, lineHeight: number, cellWidth: number): string {
	let content = '';
	for (let i = 0; i < scaleHeader.length; i++) {
		content += getHeaderCell(scaleHeader[i], cellWidth, i === 0);
	}

	return getContainer(classNames.timelineHeaderRow, {
		'box-sizing': 'border-box',
		'height': `${lineHeight}px`,
		'display': 'flex',
		'flex-direction': 'row',
	}, content);
}

function getHeaderCell(cell: scaleCellType, cellWidth: number, firstCell: boolean): string {
	const classes = [classNames.timelineHeaderCell, classNames.borderBottom];
	if (!firstCell) {
		classes.push(classNames.borderLeft);
	}

	return getContainer(classes, {
		'box-sizing': 'border-box',
		'height': 'inherit',
		'width': `${cellWidth}px`,
		'min-width': `${cellWidth}px`,
	}, cell.dayAsString);
}

function getTableGrids(height: number, width: number, lineHeight: number, cellWidth: number, scale: Array<scaleCellType>, tasks: Array<internalTaskType>): string {
	let content = '';
	for (let i = 0; i < tasks.length; i++) {
		content += getTableGridRow(scale, lineHeight, cellWidth);
	}

	return getContainer(classNames.timelineTableGridView, {
		'box-sizing': 'border-box',
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'height': `${height}px`,
		'width': `${width}px`,
	}, content);
}

function getTableGridRow(scaleHeader: Array<scaleCellType>, lineHeight: number, cellWidth: number): string {
	let content = '';
	for (let i = 0; i < scaleHeader.length; i++) {
		content += getTableGridCell(cellWidth, i === 0);
	}

	return getContainer([classNames.timelineTableRow, classNames.borderBottom], {
		'box-sizing': 'border-box',
		'height': `${lineHeight}px`,
		'flex-direction': 'row',
		'display': 'flex',
	}, content);
}

function getTableGridCell(cellWidth: number, firstCell: boolean): string {
	const classes = [classNames.timelineTableCell, classNames.borderBottom];
	if (!firstCell) {
		classes.push(classNames.borderLeft);
	}

	return getContainer(classes, {
		'box-sizing': 'border-box',
		'height': 'inherit',
		'width': `${cellWidth}px`,
		'min-width': `${cellWidth}px`,
	});
}

function getTableTasks(height: number, width: number, tasks: Array<computedTaskType>): string {
	let content = '';
	for (let i = 0; i < tasks.length; i++) {
		content += getTableTask(tasks[i]);
	}

	return getContainer(classNames.timelineTableTaskView, {
		'box-sizing': 'border-box',
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'height': `${height}px`,
		'width': `${width}px`,
	}, content);
}

function getTableTask(task: computedTaskType): string {
	return getContainer(classNames.timelineTableTask, {
		'box-sizing': 'border-box',
		'position': 'absolute',
		'top': `${task.top}px`,
		'left': `${task.left}px`,
		'height': `${task.height}px`,
		'width': `${task.width}px`,
	}, task.task.text, {
		'data-taskid': task.task.id.toString(),
		'data-date': task.task.startDate.getTime().toString(),
	});
}

function getTableLinks(height: number, width: number, lineHeight: number, tasks: Array<computedTaskType>, links: Array<linkType>): string {
	let content = '';
	for (let i = 0; i < links.length; i++) {
		const link = links[i];

		content += getLinkMarkup({
			lineHeight,
			link,
			source: getComputedTask(tasks, link.source),
			target: getComputedTask(tasks, link.target),
		});
	}

	return getContainer(classNames.timelineTableLinkView, {
		'box-sizing': 'border-box',
		'position': 'absolute',
		'top': 0,
		'left': 0,
		'height': `${height}px`,
		'width': `${width}px`,
	}, content);
}

function getComputedTask(tasks: Array<computedTaskType>, id: number): computedTaskType {
	const task = tasks.find(e => e.task.id === id);

	/* istanbul ignore if */
	if (typeof task === 'undefined') {
		throw new Error(`Cannot find task with id "${id}"`);
	}

	return task;
}

function getTaskModel(scale: Array<scaleCellType>, tasks: Array<internalTaskType>, lineHeight: number, cellWidth: number): Array<computedTaskType> {
	/* istanbul ignore if */
	if (scale.length < 1) {
		throw new Error('The scale is empty');
	}

	const firstDayOnScale = scale[0].day;

	return tasks.map((task, index) => {
		// how many days since the first date in the header
		const cellIndex = differenceInCalendarDays(task.startDate, firstDayOnScale);

		// when does the task end
		const taskDurationInDays = differenceInCalendarDays(task.endDate, task.startDate);
		const taskWidth = taskDurationInDays * cellWidth;

		return {
			task,
			top: lineHeight * index + 2,
			left: cellIndex * cellWidth,
			height: lineHeight - 4 - 1,
			width: taskWidth,
		};
	});
}
