export declare type taskType = {
	id: number;
	text: string;
	startDate: Date;
	days: number;
	dependencies?: Array<number>;
};

export declare type headerColumnType = {
	id: string;
	title: string;
	width?: number;
};

export declare type optionsType = {
	treeWidthPercentage?: number;
	columns?: Array<headerColumnType>;
};

export declare class GanttChart {
	setConfig(options: optionsType): void;
	setData(tasks: Array<taskType>): void;
	render(container: HTMLElement): void;
}
