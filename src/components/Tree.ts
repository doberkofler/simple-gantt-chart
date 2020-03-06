import {Config} from '../config';
import {classNames} from '../classNames';
import {getContainer} from '../dom/tags';
import {headerColumnType} from '../index';
import {internalTaskType} from '../internalTypes';

export class Tree {
	private readonly _config: Config;
	private readonly _width: number;
	private readonly _header: Array<headerColumnType>;

	public constructor(config: Config, width: number) {
		this._config = config;
		this._width = width;
		this._header = calculateHeaderColumnSizes(config.columns, width);
	}

	public getHeader(): string {
		const styles = {
			'box-sizing': 'border-box',
			'width': `${this._width}px`,
			'display': 'flex',
			'flex-direction': 'row'
		};
		const content = getHeaderRow(this._header, this._config.lineHeight);

		return getContainer(classNames.treeHeaderView, styles, content);
	}

	public getTable(): string {
		const content = this._config.tasks.map(task => getTableRow(task, this._header, this._config.lineHeight)).join('');

		return getContainer(classNames.treeTableView, {
			'box-sizing': 'border-box',
			'width': `${this._width}px`
		}, content);
	}
}

function getHeaderRow(header: Array<headerColumnType>, lineHeight: number): string {
	const content = header.map((column, colIndex) => getHeaderCell(column, colIndex === 0, colIndex === header.length - 1)).join('');

	return getContainer(classNames.treeHeaderRow, {
		'height': `${lineHeight}px`,
		'box-sizing': 'border-box',
		'display': 'flex',
		'flex-direction': 'row',
	}, content);
}

function getHeaderCell(column: headerColumnType, firstCell: boolean, lastCell: boolean): string {
	const classes = [classNames.treeHeaderCell, classNames.borderBottom];
	if (!firstCell) {
		classes.push(classNames.borderLeft);
	}
	if (lastCell) {
		classes.push(classNames.borderRightWide);
	}

	return getContainer(classes, {
		'height': 'inherit',
		'width': `${column.width}px`,
		'min-width': `${column.width}px`,
		'box-sizing': 'border-box',
	}, column.title);
}

function getTableRow(task: internalTaskType, columns: Array<headerColumnType>, lineHeight: number): string {
	const content = columns.map((column, colIndex) => getTableCell(task, column, colIndex === 0, colIndex === columns.length - 1)).join('');

	return getContainer([classNames.treeTableRow, classNames.borderBottom], {
		'height': `${lineHeight}px`,
		'width': 'inherit',
		'box-sizing': 'border-box',
		'display': 'flex',
		'flex-direction': 'row',
	}, content, {
		'data-taskid': task.id,
	});
}

function getTableCell(task: internalTaskType, column: headerColumnType, firstCell: boolean, lastCell: boolean): string {
	const classes = [classNames.treeTableCell];
	if (!firstCell) {
		classes.push(classNames.borderLeft);
	}
	if (lastCell) {
		classes.push(classNames.borderRightWide);
	}

	const content = (task as unknown as {[key: string]: string})[column.id];

	return getContainer(classes, {
		'height': 'inherit',
		'width': `${column.width}px`,
		'box-sizing': 'border-box',
	}, content, {
		'data-columnid': column.id,
		'data-taskid': task.id,
	});
}

function calculateHeaderColumnSizes(columns: Array<headerColumnType>, headerWidth: number): Array<headerColumnType> {
	const allocatedWidth = columns.reduce((prev, curr) => {
		if (typeof curr.width === 'number') {
			prev += curr.width;
		}
		return prev;
	}, 0);
	const numberOfColumnsWithoutWidth = columns.filter(column => typeof column.width !== 'number').length;
	const withOfUnspecifiedColumn = Math.round((headerWidth - allocatedWidth) / numberOfColumnsWithoutWidth);

	return columns.map(column => ({
		title: column.title,
		id: column.id,
		width: typeof column.width === 'number' ? column.width : withOfUnspecifiedColumn,
	}));
}
