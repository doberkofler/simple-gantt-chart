import {getClientRect, createElement} from './dom/dom';
import {getContainer} from './dom/tags';
import {classNames} from './classNames';
import {Config} from './config';
import scrollbarSize from 'scrollbar-size';
import {Tree} from './components/Tree';
import {Timeline} from './components/Timeline';
import {TimelineScrollbar} from './components/TimelineScrollbar';

/*
*	Render the basic layout of the gantt chart
*/
export function render(container: Readonly<HTMLElement>, config: Readonly<Config>): void {
	// calculate sizes
	const scrollBarWidth = scrollbarSize();
	const rect = getClientRect(container);
	const containerHeight = rect.height;
	const containerWidth = rect.width;
	const headerHeight = config.lineHeight;
	const bodyHeight = containerHeight - config.lineHeight - scrollBarWidth;
	const treeWidth = Math.round(rect.width * config.treeWidthPercentage / 100);
	const timelineWidth = rect.width - treeWidth - scrollBarWidth;

	// tree
	const tree = new Tree(config, treeWidth);
	const treeHeader = tree.getHeader();
	const treeTable = tree.getTable();

	// timeline
	const timeline = new Timeline(config, timelineWidth);
	const timelineHeader = timeline.getHeader();
	const timelineTable = timeline.getTable();

	// timeline header scrollbar gap
	const timelineHeaderScrollbarGap = getContainer(classNames.timelineHeaderGapView, {
		'box-sizing': 'border-box',
		'height': `${headerHeight}px`,
		'width': `${scrollBarWidth}px`,
	});

	// root header
	const rootHeader = getContainer(classNames.rootHeaderView, {
		'box-sizing': 'border-box',
		'display': 'flex',
		'flex-direction': 'row',
		'height': `${headerHeight}px`,
		'width': `${containerWidth}px`,
	}, treeHeader + timelineHeader + timelineHeaderScrollbarGap);

	// root table
	const rootTable = getContainer(classNames.rootBodyView, {
		'position': 'relative',
		'box-sizing': 'border-box',
		'display': 'flex',
		'flex-direction': 'row',
		'height': `${bodyHeight}px`,
		'width': `${containerWidth}px`,
		'overflow-y': 'scroll',
		'overflow-x': 'hidden',
	}, treeTable + timelineTable);

	// root scrollbar
	const timelineScrollbar = new TimelineScrollbar(config, scrollBarWidth, treeWidth, timelineWidth, timeline.getTimelineWidth());
	const rootScrollbar = getContainer(classNames.rootScrollbarView, {
		'box-sizing': 'border-box',
		'display': 'flex',
		'flex-direction': 'row',
		'height': `${scrollBarWidth}px`,
		'width': `${containerWidth}px`,
	}, timelineScrollbar.getMarkup());

	// container
	createElement(container, 'div', classNames.rootContainerView, {
		'height': `${containerHeight}px`,
		'width': `${containerWidth}px`,
		'box-sizing': 'border-box',
		'margin': 0,
		'padding': 0,
		'overflow': 'hidden',
	}, rootHeader + rootTable + rootScrollbar, {
		id: config.id,
	});

	// attach event handler
	timelineScrollbar.attach();
}
