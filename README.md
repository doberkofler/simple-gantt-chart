[![NPM version](https://img.shields.io/npm/v/simple-gantt-chart.svg)](https://www.npmjs.com/package/simple-gantt-chart)
[![Downloads](https://img.shields.io/npm/dm/simple-gantt-chart.svg)](https://www.npmjs.com/package/simple-gantt-chart)
[![Linux Build](https://travis-ci.org/doberkofler/simple-gantt-chart.svg?branch=master)](https://travis-ci.org/doberkofler/simple-gantt-chart)

# Simple Gantt Chart

Very simple vanilla JavaScript library for displaying projects as Gantt Charts.


# Install

npm i simple-gantt-chart


# Usage

You can use this library as a script tag or you can import it as a npm module.

## CommonJS

```js
const {GanttChart} = require('simple-gantt-chart');
```

## ES2015 modules

```js
import {GanttChart} from 'simple-gantt-chart'
```


# Example

```html
<!DOCTYPE html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=utf-8">
	<title>Gantt Chart Example</title>
	<link rel="stylesheet" href="./node_modules/simple-gantt-chart/dist/index.css">
	<style>
		html {
			font-family: Arial, Helvetica, sans-serif;
			font-size: small;
		}
		</style>
</head>
<body>
	<div id="gantt_here" style="position: absolute; top: 100px; left: 100px; width: 1000px; height: 500px;"></div>
	<script src="./node_modules/simple-gantt-chart/dist/index.js"></script>
	<script>
		const gantt = new ganttchart.GanttChart();

		gantt.setData([
			{id: 1, text: 'Planning', startDate: new Date('2020-01-01'), days: 1},
			{id: 2, text: 'Analysis', startDate: new Date('2020-01-02'), days: 1, dependencies: [1]},
			{id: 3, text: 'Design', startDate: new Date('2020-01-04'), days: 2, dependencies: [2]},
			{id: 4, text: 'Implementation', startDate: new Date('2020-01-07'), days: 2, dependencies: [3]},
			{id: 5, text: 'Testing', startDate: new Date('2020-01-07'), days: 2, dependencies: [3]},
			{id: 6, text: 'Deployment', startDate: new Date('2020-01-10'), days: 2, dependencies: [4, 5]},
		]);

		gantt.render(document.getElementById('gantt_here'));
	</script>
</body>
```


# Release History

See the [changelog](https://github.com/doberkofler/simple-gantt-chart/blob/master/CHANGELOG.md).


# License

[MIT](LICENSE)
