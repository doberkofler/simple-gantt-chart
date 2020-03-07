import {VectorDraw, Direction} from '../dom/VectorDraw';

describe('the class VectorDraw', () => {
	it('should draw a rectangle with points', () => {
		expect.hasAssertions();

		const vectorDraw = new VectorDraw({x: 10, y: 10});
		vectorDraw.addVector(Direction.right, 10);
		vectorDraw.addVector(Direction.down, 10);
		vectorDraw.addVector(Direction.left, 10);
		vectorDraw.addVector(Direction.up, 10);

		expect(vectorDraw.getLastPosition()).toStrictEqual({x: 10, y: 10});
		expect(vectorDraw.getVectors()).toStrictEqual([
			{x: 10, y: 10, direction: Direction.right, size: 10},
			{x: 20, y: 10, direction: Direction.down, size: 10},
			{x: 20, y: 20, direction: Direction.left, size: 10},
			{x: 10, y: 20, direction: Direction.up, size: 10},
		]);
	});

	it('should throw an error on an invalid vector direction', () => {
		expect.hasAssertions();

		const vectorDraw = new VectorDraw({x: 10, y: 10});
		expect(() => vectorDraw.addVector('center' as unknown as Direction, 10)).toThrow('Invalid direction "center"');
	});

	it('should draw a rectangle with vectors', () => {
		expect.hasAssertions();

		const vectorDraw = new VectorDraw({x: 10, y: 10});
		vectorDraw.addLineToPoint({x: 20, y: 10});
		vectorDraw.addLineToPoint({x: 20, y: 20});
		vectorDraw.addLineToPoint({x: 10, y: 20});
		vectorDraw.addLineToPoint({x: 10, y: 10});

		expect(vectorDraw.getLastPosition()).toStrictEqual({x: 10, y: 10});
		expect(vectorDraw.getVectors()).toStrictEqual([
			{x: 10, y: 10, direction: Direction.right, size: 10},
			{x: 20, y: 10, direction: Direction.down, size: 10},
			{x: 20, y: 20, direction: Direction.left, size: 10},
			{x: 10, y: 20, direction: Direction.up, size: 10},
		]);
	});
});
