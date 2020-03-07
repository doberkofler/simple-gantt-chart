export type pointType = {
	x: number,
	y: number,
}

export type vectorType = {
	x: number,
	y: number,
	direction: Direction,
	size: number,
}

export const enum Direction {
	left = 'left',
	right = 'right',
	up = 'up',
	down = 'down',
}

export class VectorDraw {
	private _lastPosition: pointType;
	private readonly _vectors: Array<vectorType>;

	public constructor(point: pointType) {
		this._lastPosition = {...point};
		this._vectors = [];
	}

	public getVectors(): Array<vectorType> {
		return this._vectors;
	}

	public getLastPosition(): pointType {
		return this._lastPosition;
	}

	public addVector(direction: Direction, size: number): void {
		let {x, y} = this._lastPosition;

		switch (direction) {
			case Direction.left:
				x -= size;
				break;

			case Direction.right:
				x += size;
				break;

			case Direction.up:
				y -= size;
				break;

			case Direction.down:
				y += size;
				break;

			default:
				throw new TypeError(`Invalid direction "${direction}"`);
		}

		this.addLineToPoint({x, y});
	}

	public addLineToPoint(point: pointType): void {
		const from = this._lastPosition;
		const to = {...point};
		const direction = VectorDraw._getDirection(from, to);

		this._vectors.push({
			x: from.x,
			y: from.y,
			direction,
			size: Math.abs(direction === Direction.left || direction === Direction.right ? from.x - to.x : from.y - to.y),
		});

		this._lastPosition = to;
	}

	private static _getDirection(from: pointType, to: pointType): Direction {
		if (to.x < from.x) {
			return Direction.left;
		} else if (to.x > from.x) {
			return Direction.right;
		} else if (to.y > from.y) {
			return Direction.down;
		} else {
			return Direction.up;
		}
	}
}
