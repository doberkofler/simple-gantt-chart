import {VectorDraw, pointType, vectorType, Direction} from '../dom/VectorDraw';
import {getContainer} from '../dom/tags';
import {linkType, computedTaskType} from '../internalTypes';

type renderLinkPara = {
	lineHeight: number,
	link: linkType,
	source: computedTaskType,
	target: computedTaskType,
};

type wrapperSizesType = {
	top: number,
	height: number,
	lineHeight: number,
	left: number,
	width: number,
}

export function getLinkMarkup(para: renderLinkPara): string {
	const arrowSize = 6;
	const lineWidth = 2;

	// calculate the required vectors for the individual path lines the link consists of
	const linkPath = calculateVectors(
		para.source,			// source task
		para.target,			// target task
		para.lineHeight,		// row height
	);

	// generate the markup for each line
	const linesMarkup = linkPath.vectors.map((vector, index) => {
		// the last line must be shortened by the width of the array
		if (index === linkPath.vectors.length - 1) {
			vector.size -= arrowSize;
		}

		return getLineMarkup(
			vector,
			para.lineHeight,	// cell height
			lineWidth,			// line width
			para.lineHeight,	// container width
		);
	}).join('');

	// get the direction of the last vector
	const direction = linkPath.vectors[linkPath.vectors.length - 1].direction;
	const arrowMarkup = getArrowMarkup(linkPath.lastPoint, direction, para.lineHeight, arrowSize);

	return linesMarkup + arrowMarkup;
}

/*
*	calculate the required vectors for the individual path lines the link consists of
*/
function calculateVectors(sourceTask: computedTaskType, targetTask: computedTaskType, rowHeight: number): {vectors: Array<vectorType>, lastPoint: pointType} {
	const fromPoint = {x: sourceTask.left + sourceTask.width, y: sourceTask.top};
	const toPoint = {x: targetTask.left, y: targetTask.top};

	// TODO: find out, why we must adjust the coordinates!
	fromPoint.x += 1;
	fromPoint.y -= 2;
	toPoint.y -= 2;

	const horizontalGap = 12;

	const vectorDraw = new VectorDraw({x: fromPoint.x, y: fromPoint.y}); // we start te end right margin of the from task
	const horizontalDistance = toPoint.x - fromPoint.x;

	if (horizontalDistance > 2 * horizontalGap) {
		// the target task is in front of us
		vectorDraw.addVector(Direction.right, horizontalDistance / 2); // we move a bit to the right
		vectorDraw.addVector(Direction.down, toPoint.y - fromPoint.y); // we move down to the target task
		vectorDraw.addVector(Direction.right, horizontalDistance / 2); // we move to the right until we reach the target task
	} else {
		// the target task is behind us
		const verticalDistance = toPoint.y - fromPoint.y;
		const sign = verticalDistance > 0 ? 1 : -1;
		vectorDraw.addVector(Direction.right, horizontalGap); // we move a bit to the right
		vectorDraw.addVector(Direction.down, sign * (rowHeight / 2)); // we move down in the vertical gap between the source task and the target task
		vectorDraw.addVector(Direction.right, toPoint.x - fromPoint.x - horizontalGap * 2); // we move to the left until we are before the target task
		vectorDraw.addVector(Direction.down, sign * (Math.abs(verticalDistance) - rowHeight / 2)); // we move down to the target task
		vectorDraw.addVector(Direction.right, horizontalGap); // we move to the right until we reach the target task
	}

	return {
		vectors: vectorDraw.getVectors(),
		lastPoint: vectorDraw.getLastPosition(),
	};
}


/*
*	get the markup for a line vector
*/
function getLineMarkup(vector: vectorType, cellHeight: number, lineWidth: number, containerWidth: number): string {
	const lineRect = getLineSize(vector, lineWidth, containerWidth);
	const inner = getContainer(`gc_link_line_${vector.direction}`, {
		'position': 'absolute',
		'margin-top': `${lineRect.top}px`,
		'margin-left': `${lineRect.left}px`,
		'height': `${lineRect.height}px`,
		'width': `${lineRect.width}px`,
	});

	const wrapperRect = getLineContainerSize(vector, cellHeight, containerWidth);
	return getContainer('gc_link_container_view', {
		position: 'absolute',
		top: `${wrapperRect.top}px`,
		left: `${wrapperRect.left}px`,
		height: `${wrapperRect.height}px`,
		width: `${wrapperRect.width}px`,
	}, inner);
}

/*
*	create the markup for an arrow
*/
function getArrowMarkup(point: pointType, direction: Direction, lineHeight: number, arrowSize: number): string {
	let top = point.y;
	let left = point.x;

	switch (direction) {
		case Direction.right:
			top -= (arrowSize - lineHeight) / 2;
			left -= arrowSize;
			break;

		/* istanbul ignore next */
		case Direction.left:
			top -= (arrowSize - lineHeight) / 2;
			break;

		/* istanbul ignore next */
		case Direction.up:
			left -= arrowSize;
			break;

		/* istanbul ignore next */
		case Direction.down:
			top += arrowSize * 2;
			left -= arrowSize;
			break;

		default:
			/* istanbul ignore next */
			throw new Error(`Invalid direction "${direction}"`);
	}

	return getContainer(`gc_link_arrow_${direction}`, {
		'position': 'absolute',
		'margin-top': '-3px',
		'top': `${top}px`,
		'left': `${left}px`,
	});
}

function getLineSize(vector: vectorType, lineWidth: number, containerWidth: number): {height: number, width: number, top: number, left: number} {
	const size = vector.size + lineWidth;

	switch (vector.direction) {
		case Direction.left:
		case Direction.right:
			return {
				height: lineWidth,
				width: size,
				top: (containerWidth - lineWidth) / 2,
				left: (containerWidth - lineWidth) / 2
			};

		case Direction.up:
		case Direction.down:
			return {
				height: size,
				width: lineWidth,
				top: (containerWidth - lineWidth) / 2,
				left: (containerWidth - lineWidth) / 2
			};

		default:
			/* istanbul ignore next */
			throw new Error(`Invalid direction "${vector.direction}"`);
	}
}

function getLineContainerSize(vector: vectorType, cellHeight: number, wrapperWidth: number): wrapperSizesType {
	const y = vector.y + (cellHeight - wrapperWidth) / 2;

	switch (vector.direction) {
		case Direction.left:
			return {
				top: y,
				height: wrapperWidth,
				lineHeight: wrapperWidth,
				left: vector.x - vector.size - wrapperWidth / 2,
				width: vector.size + wrapperWidth
			};

		case Direction.right:
			return {
				top: y,
				lineHeight: wrapperWidth,
				height: wrapperWidth,
				left: vector.x - wrapperWidth / 2,
				width: vector.size + wrapperWidth
			};

		/* istanbul ignore next */
		case Direction.up:
			return {
				top: y - vector.size,
				lineHeight: vector.size + wrapperWidth,
				height: vector.size + wrapperWidth,
				left: vector.x - wrapperWidth / 2,
				width: wrapperWidth
			};

		case Direction.down:
			return {
				top: y,
				lineHeight: vector.size + wrapperWidth,
				height: vector.size + wrapperWidth,
				left: vector.x - wrapperWidth / 2,
				width: wrapperWidth
			};

		default:
			/* istanbul ignore next */
			throw new TypeError(`Invalid direction "${vector.direction}"`);
	}
}
