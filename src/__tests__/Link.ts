import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import {Config} from '../config';
import {setData} from '../data';
import {getLinkMarkup} from '../components/Link';

describe('the function getLinkMarkup', () => {
	it('should generate the markup of a link', () => {
		expect.hasAssertions();

		const config = new Config();
		const tasks = [
			{
				id: 1,
				text: 'task1',
				startDate: new Date(2020, 0, 1), // 1-JAN-2020
				days: 1,
				dependencies: []
			},
			{
				id: 2,
				text: 'task2',
				startDate: new Date(2020, 0, 2), // 2-JAN-2020
				days: 1,
				dependencies: [1]
			},
			{
				id: 3,
				text: 'task2',
				startDate: new Date(2020, 0, 10), // 10-JAN-2020
				days: 1,
				dependencies: [2]
			},
		];
		expect(tasks).toHaveLength(3);
		setData(tasks, config);
		expect(config.links).toHaveLength(2);

		// calculate the enhanced tasks
		const cellWidth = 100;
		const cellIndex = 0;
		const computedTasks = config.tasks.map((task, index) => {
			const taskDurationInDays = differenceInCalendarDays(task.endDate, task.startDate);
			const taskWidth = taskDurationInDays * cellWidth;

			return {
				task,
				top: config.lineHeight * index + 2,
				left: cellIndex * cellWidth,
				height: config.lineHeight - 4 - 1,
				width: taskWidth,
			};
		});
		expect(computedTasks).toHaveLength(3);

		let markup = getLinkMarkup({
			lineHeight: config.lineHeight,
			link: config.links[0],
			source: computedTasks[0],
			target: computedTasks[1],
		});
		expect(markup).toMatch(/^<div class="gc_link_container_view".*<\/div>$/);

		markup = getLinkMarkup({
			lineHeight: config.lineHeight,
			link: config.links[1],
			source: computedTasks[1],
			target: computedTasks[2],
		});
		expect(markup).toMatch(/^<div class="gc_link_container_view".*<\/div>$/);
	});
});
