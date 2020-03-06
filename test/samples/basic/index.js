const gantt = new ganttchart.GanttChart();

gantt.setData([
	{id: 1, text: 'Task #1', startDate: new Date('2018-01-01'), days: 1, dependencies: []},
	{id: 2, text: 'Task #2', startDate: new Date('2018-01-02'), days: 2, dependencies: [1, 15]},
	{id: 3, text: 'Task #3', startDate: new Date('2018-01-04'), days: 2, dependencies: [2]},
	{id: 4, text: 'Task #4', startDate: new Date('2018-01-03'), days: 1, dependencies: [3]},
	{id: 5, text: 'Task #5', startDate: new Date('2018-01-05'), days: 1, dependencies: [4, 5]},
	{id: 6, text: 'Task #6', startDate: new Date('2018-01-08'), days: 1, dependencies: [5]},
	{id: 7, text: 'Task #7', startDate: new Date('2018-01-09'), days: 1, dependencies: [6]},
	{id: 8, text: 'Task #8', startDate: new Date('2018-01-10'), days: 1, dependencies: [7]},
	{id: 9, text: 'Task #9', startDate: new Date('2018-01-10'), days: 1, dependencies: [8]},
	{id: 10, text: 'Task #10', startDate: new Date('2018-01-11'), days: 1, dependencies: [9]},
	{id: 11, text: 'Task #11', startDate: new Date('2018-01-12'), days: 1, dependencies: [10]},
	{id: 12, text: 'Task #12', startDate: new Date('2018-01-13'), days: 1, dependencies: [11]},
	{id: 13, text: 'Task #13', startDate: new Date('2018-01-14'), days: 1, dependencies: [12]},
	{id: 14, text: 'Task #14', startDate: new Date('2018-01-15'), days: 1, dependencies: [13]},
	{id: 15, text: 'Task #15', startDate: new Date('2018-01-16'), days: 1, dependencies: [14]},
	{id: 16, text: 'Task #16', startDate: new Date('2018-01-17'), days: 1},
]);

gantt.render(document.getElementById('gantt_here'));
