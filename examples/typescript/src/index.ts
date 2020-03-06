import {GanttChart} from 'simple-gantt-chart';

const gantt = new GanttChart();
gantt.setData([
	{id: 1, text: 'Planning', startDate: new Date('2020-01-01'), days: 1},
	{id: 2, text: 'Analysis', startDate: new Date('2020-01-02'), days: 1, dependencies: [1]},
	{id: 3, text: 'Design', startDate: new Date('2020-01-04'), days: 2, dependencies: [2]},
	{id: 4, text: 'Implementation', startDate: new Date('2020-01-07'), days: 2, dependencies: [3]},
	{id: 5, text: 'Testing', startDate: new Date('2020-01-07'), days: 2, dependencies: [3]},
	{id: 6, text: 'Deployment', startDate: new Date('2020-01-10'), days: 2, dependencies: [4, 5]},
]);
gantt.render(document.getElementById('gantt_here'));
