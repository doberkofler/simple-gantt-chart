import {Config} from './config';
import {setData} from './data';
import {render} from './layout';

export type taskType = {
	id: number,
	text: string,
	startDate: Date,
	days: number,
	dependencies?: Array<number>,
};

export type headerColumnType = {
	id: string,
	title: string,
	width?: number,
};

export type optionsType = {
	treeWidthPercentage?: number,
	columns?: Array<headerColumnType>,
};

export class GanttChart {
	readonly #config: Config; // eslint-disable-line @typescript-eslint/explicit-member-accessibility

	public constructor() {
		this.#config = new Config();
	}

	public setConfig(options: optionsType): void {
		this.#config.setConfig(options);
	}

	public setData(tasks: Array<taskType>): void {
		setData(tasks, this.#config);
	}

	public render(container: HTMLElement): void {
		render(container, this.#config);
	}
}
