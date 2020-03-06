import {taskType} from './index';

export type linkType = {
	source: number,
	target: number,
};

export type internalTaskType = taskType & {
	endDate: Date,
};

export type computedTaskType = {
	task: internalTaskType,
	top: number,
	left: number,
	height: number,
	width: number,
}
