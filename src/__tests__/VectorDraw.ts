import {VectorDraw, Direction} from '../dom/VectorDraw';

describe('the class VectorDraw', () => {
	it('should draw a rectangle with vectors', () => {
		expect.hasAssertions();

		const vectorDraw = new VectorDraw({x: 10, y: 10});
		vectorDraw.addLineToPoint({x: 20, y: 10});
		vectorDraw.addVector(Direction.down, 10);
		vectorDraw.addLineToPoint({x: 10, y: 20});
		vectorDraw.addVector(Direction.up, 10);

		expect(vectorDraw.getVectors()).toStrictEqual([
			{x: 10, y: 10, direction: Direction.right, size: 10},
			{x: 20, y: 10, direction: Direction.down, size: 10},
			{x: 20, y: 20, direction: Direction.left, size: 10},
			{x: 10, y: 20, direction: Direction.up, size: 10},
		]);
	});
});
