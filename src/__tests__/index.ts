/* eslint-disable @typescript-eslint/ban-ts-comment */

import {GanttChart} from '../index';
import {getElementByClassName} from '../dom/dom';

describe('the class GanttChart', () => {
	beforeEach(() => {
		//@ts-ignore
		jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
	});

	afterEach(() => {
		(window.requestAnimationFrame as any).mockRestore(); // eslint-disable-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	});

	it('should render a gantt chart', () => {
		expect.hasAssertions();

		// Set up our document body
		document.body.innerHTML = '<div id="gantt_here" style="position: absolute; top: 10px; left: 10px; width: 1000px; height: 500px;"></div>';

		const gantt = new GanttChart();

		gantt.setConfig({treeWidthPercentage: 30});

		gantt.setData([
			{id: 1, text: 'Planning', startDate: new Date('2020-01-01'), days: 1},
			{id: 2, text: 'Analysis', startDate: new Date('2020-01-02'), days: 1, dependencies: [1]},
			{id: 3, text: 'Design', startDate: new Date('2020-01-04'), days: 2, dependencies: [2]},
			{id: 4, text: 'Implementation', startDate: new Date('2020-01-07'), days: 2, dependencies: [3]},
			{id: 5, text: 'Testing', startDate: new Date('2020-01-07'), days: 2, dependencies: [3]},
			{id: 6, text: 'Deployment', startDate: new Date('2020-01-10'), days: 2, dependencies: [4, 5]},
		]);
		const container = document.getElementById('gantt_here') as HTMLElement;
		gantt.render(container);

		expect(container.innerHTML).toMatch(/^<div id=".*" class="gc_root_container_view".*>.*<\/div>$/);

		// let's test scrolling
		const scrollbarElement = getElementByClassName('gc_timeline_scrollbar_cell');
		scrollbarElement.scrollLeft = 10;
		scrollbarElement.dispatchEvent(new Event('scroll'));
	});
});
