import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import {getDateWitoutTime} from '../date';
import {Config} from '../config';
import {render} from '../render';
import {ScaleType} from '../scale';
import {optionsType} from '../index';

describe('the class Config', () => {
	it('should initialize with a default configuration', () => {
		expect.hasAssertions();

		const now = new Date();
		const config = new Config();

		expect(typeof config.id).toStrictEqual('string');
		expect(config.columns).toStrictEqual([
			{
				id: 'text',
				title: 'Tasks',
			},
			{
				id: 'days',
				title: 'Days',
				width: 60,
			},
		]);
		expect(config.scale).toStrictEqual(ScaleType.day);
		expect(config.scaleStart).toStrictEqual(getDateWitoutTime(startOfMonth(now)));
		expect(config.scaleEnd).toStrictEqual(getDateWitoutTime(endOfMonth(now)));
		expect(config.treeWidthPercentage).toStrictEqual(30);
		expect(config.timelineCellWidth).toStrictEqual(60);
		expect(config.lineHeight).toStrictEqual(34);
		expect(config.tasks).toStrictEqual([]);
		expect(config.links).toStrictEqual([]);
	});

	it('should allow to set the configuration with setConfig', () => {
		expect.hasAssertions();

		const config = new Config();

		config.setConfig({treeWidthPercentage: 50});
		expect(config.treeWidthPercentage).toStrictEqual(50);
		expect(() => config.setConfig({treeWidthPercentage: 110})).toThrow('The option "treeWidthPercentage" must be a number between 0 and 100: 110');

		config.setConfig({columns: [
			{
				id: 'text',
				title: 'Tasks',
			},
			{
				id: 'days',
				title: 'Days',
				width: 60,
			},
		]});

		expect(() => config.setConfig({columns: 1} as unknown as optionsType)).toThrow('The option "columns" must be an array');
		expect(() => config.setConfig({columns: [{id: 'text'}, {id: 'text'}]} as unknown as optionsType)).toThrow('The option columns uses the id "text" more then once');
		expect(() => config.setConfig({columns: [{id: 'text'}]} as unknown as optionsType)).toThrow('The option "columns" does not contain the required column "days"');
	});

	it('should allow to find DOM elements by class name', () => {
		expect.hasAssertions();

		// Set up our document body
		document.body.innerHTML = '<div id="gantt_here" style="position: absolute; top: 10px; left: 10px; width: 1000px; height: 500px;"></div>';

		const config = new Config();
		const container = document.getElementById('gantt_here') as HTMLElement;

		render(container, config);

		expect(config.getElementByClassName('gc_header_view').innerHTML).toMatch(/^<div class="gc_tree_header_view".*>.*<\/div>$/);
	});
});
