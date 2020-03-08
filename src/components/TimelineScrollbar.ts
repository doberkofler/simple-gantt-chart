import {Config} from '../config';
import {classNames} from '../classNames';
import {getContainer} from '../dom/tags';

export class TimelineScrollbar {
	private readonly _config: Config;
	private readonly _scrollbarHeight: number;
	private readonly _treeContainerWidth: number;
	private readonly _timelineContainerWidth: number;
	private readonly _timelineWidth: number;

	public constructor(config: Config, scrollbarHeight: number, treeContainerWidth: number, timelineContainerWidth: number, timelineWidth: number) {
		this._config = config;
		this._scrollbarHeight = scrollbarHeight;
		this._treeContainerWidth = treeContainerWidth;
		this._timelineContainerWidth = timelineContainerWidth;
		this._timelineWidth = timelineWidth;
	}

	public getMarkup(): string {
		const treeScrollbar = getContainer(classNames.treeScrollbarView, {
			'box-sizing': 'border-box',
			'height': `${this._scrollbarHeight}px`,
			'width': `${this._treeContainerWidth}px`,
		});

		const timelineScrollbarContent = getContainer('', {
			'box-sizing': 'border-box',
			'height': `${this._scrollbarHeight}px`,
			'width': `${this._timelineWidth}px`,
		});

		const timelineScrollbar = getContainer(classNames.timelineScrollbarView, {
			'box-sizing': 'border-box',
			'height': `${this._scrollbarHeight}px`,
			'width': `${this._timelineContainerWidth}px`,
			'overflow-y': 'hidden',
			'overflow-x': 'scroll',
		}, timelineScrollbarContent);

		const timelineScrollbarGap = getContainer(classNames.timelineScrollbarGapView, {
			'box-sizing': 'border-box',
			'display': 'flex',
			'flex-direction': 'row',
			'height': `${this._scrollbarHeight}px`,
			'width': `${this._scrollbarHeight}px`,
		});

		return treeScrollbar + timelineScrollbar + timelineScrollbarGap;
	}

	/*
	*	Attach event handler for the horizontal scrollbar
	*/
	public attach(): void {
		const scrollbarElement = this._config.getElementByClassName(classNames.timelineScrollbarView);
		const timelineHeader = this._config.getElementByClassName(classNames.timelineHeaderView);
		const timelineTable = this._config.getElementByClassName(classNames.timelineTableView);

		let lastKnownScrollPosition = 0;
		let ticking = false;

		scrollbarElement.addEventListener('scroll', event => {
			const scrollLeft = getScrollLeft(event);
			if (scrollLeft !== null) {
				lastKnownScrollPosition = scrollLeft;
				if (!ticking) {
					window.requestAnimationFrame(() => {
						timelineHeader.scrollLeft = lastKnownScrollPosition;
						timelineTable.scrollLeft = lastKnownScrollPosition;
						ticking = false;
					});
					ticking = true;
				}
			}
		});
	}
}

function getScrollLeft(event: Event): number|null {
	/* istanbul ignore if */
	if (event === null || event.target === null) {
		return null;
	} else {
		const target: EventTarget & {scrollLeft?: number} = event.target;
		return typeof target.scrollLeft === 'number' ? target.scrollLeft : null;
	}
}
