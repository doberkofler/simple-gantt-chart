import addDays from 'date-fns/addDays';
import {setData} from '../data';
import {taskType} from '../index';
import {Config} from '../config';

describe('data', () => {
	it('setData should convert the project to the Config object', () => {
		expect.hasAssertions();

		let config: Config;
		let tasks: Array<taskType>;

		// no tasks
		config = new Config();
		tasks = [];
		setData(tasks, config);
		expect(config.tasks).toStrictEqual(tasks);
		expect(config.links).toStrictEqual([]);

		// one task
		config = new Config();
		tasks = [{
			id: 1,
			text: '2',
			startDate: new Date(),
			days: 3,
			dependencies: [1],
		}];
		setData(tasks, config);
		expect(config.tasks).toStrictEqual([{
			id: tasks[0].id,
			text: tasks[0].text,
			startDate: tasks[0].startDate,
			endDate: addDays(tasks[0].startDate, tasks[0].days),
			days: tasks[0].days,
		}]);
		expect(config.links).toStrictEqual([{
			source: 1,
			target: 1,
		}]);
		expect(config.scaleStart).toStrictEqual(tasks[0].startDate);
		expect(config.scaleEnd).toStrictEqual(addDays(tasks[0].startDate, tasks[0].days));

		// two task
		config = new Config();
		tasks = [{
			id: 1,
			text: 'a',
			startDate: new Date(2020, 0, 1), // 1-JAN-2020
			days: 9,
			dependencies: [],
		},
		{
			id: 2,
			text: 'b',
			startDate: new Date(2020, 0, 15), // 15-JAN-2020
			days: 5,
			dependencies: [1],
		}];
		setData(tasks, config);
		expect(config.tasks).toStrictEqual([{
			id: tasks[0].id,
			text: tasks[0].text,
			startDate: tasks[0].startDate,
			endDate: addDays(tasks[0].startDate, tasks[0].days),
			days: tasks[0].days,
		},
		{
			id: tasks[1].id,
			text: tasks[1].text,
			startDate: tasks[1].startDate,
			endDate: addDays(tasks[1].startDate, tasks[1].days),
			days: tasks[1].days,
		}]);
		expect(config.links).toStrictEqual([{
			source: 1,
			target: 2,
		}]);
		expect(config.scaleStart).toStrictEqual(tasks[0].startDate);
		expect(config.scaleEnd).toStrictEqual(addDays(tasks[1].startDate, tasks[1].days));
	});

	it('setData should throw an exception', () => {
		expect.hasAssertions();

		const tests = [
			{tasks: '', error: 'The method "setData" expects the first parameter to be an array of tasks'},
			{tasks: [''], error: 'The method "setData" expects the first parameter to be an array of tasks'},
			{tasks: [{}], error: 'The property "id" must be a positive integer'},
			{tasks: [{id: '1'}], error: 'The property "id" must be a positive integer'},
			{tasks: [{id: 1.1}], error: 'The property "id" must be a positive integer'},
			{tasks: [{id: 0}], error: 'The property "id" must be a positive integer'},
			{tasks: [{id: 1}], error: 'The property "text" in task "1" must be a string'},
			{tasks: [{id: 1, text: 'task'}], error: 'The property "startDate" in task "1" must be a Date'},
			{tasks: [{id: 1, text: 'task', startDate: new Date()}], error: 'The property "days" must be a positive integer'},
			{tasks: [{id: 1, text: 'task', startDate: new Date(), days: '0'}], error: 'The property "days" must be a positive integer'},
			{tasks: [{id: 1, text: 'task', startDate: new Date(), days: 1.5}], error: 'The property "days" must be a positive integer'},
			{tasks: [{id: 1, text: 'task', startDate: new Date(), days: 1}, {id: 1, text: 'task', startDate: new Date(), days: 1}], error: 'The task id "1" is used more then once'},
			{tasks: [{id: 1, text: 'task', startDate: new Date(), days: 1, dependencies: [1, 1]}], error: 'The dependencies in the task with id "1" contain duplicates'},
			{tasks: [{id: 1, text: 'task', startDate: new Date(), days: 1, dependencies: [2]}], error: 'The task with id "1" has an invalid dependency "2"'},
		];

		tests.forEach(test => {
			const config = new Config();
			expect(() => setData(test.tasks as unknown as Array<taskType>, config)).toThrow(test.error);
		});
	});
});
