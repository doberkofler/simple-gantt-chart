import {HtmlStyle} from '../dom/HtmlStyle';

describe('the class HtmlStyle', () => {
	it('should have a default constructor', () => {
		expect.hasAssertions();

		const htmlStyle = new HtmlStyle();
		expect(htmlStyle.hasComponent('color')).toStrictEqual(false);
		expect(htmlStyle.getComponent('color')).toBeNull();
		expect(htmlStyle.toString()).toStrictEqual('');
	});

	it('should have a custom constructor', () => {
		expect.hasAssertions();

		const htmlStyle = new HtmlStyle({'color': 'red'});
		expect(htmlStyle.hasComponent('color')).toStrictEqual(true);
		expect(htmlStyle.getComponent('color')).toStrictEqual('red');
		expect(htmlStyle.toString()).toStrictEqual('color:red;');
	});

	it('should have a copy constructor', () => {
		expect.hasAssertions();

		const htmlStyle = new HtmlStyle(new HtmlStyle({'color': 'red'}));
		expect(htmlStyle.hasComponent('color')).toStrictEqual(true);
		expect(htmlStyle.getComponent('color')).toStrictEqual('red');
		expect(htmlStyle.toString()).toStrictEqual('color:red;');
	});

	it('should throw an error when constructor has duplicate styles', () => {
		expect.hasAssertions();

		expect(() => {
			new HtmlStyle({'color': 'red', 'Color': 'blue'});
		}).toThrow(new TypeError('Duplicate style "color"'));
	});

	it('should have have a method setComponent', () => {
		expect.hasAssertions();

		const htmlStyle = new HtmlStyle({'color': 'red'});
		expect(htmlStyle.hasComponent('color')).toStrictEqual(true);
		expect(htmlStyle.getComponent('color')).toStrictEqual('red');
		expect(htmlStyle.toString()).toStrictEqual('color:red;');

		htmlStyle.setComponent('color', 'blue');
		expect(htmlStyle.hasComponent('color')).toStrictEqual(true);
		expect(htmlStyle.getComponent('color')).toStrictEqual('blue');
		expect(htmlStyle.toString()).toStrictEqual('color:blue;');

		htmlStyle.setComponent('top', 0);
		expect(htmlStyle.hasComponent('color')).toStrictEqual(true);
		expect(htmlStyle.getComponent('color')).toStrictEqual('blue');
		expect(htmlStyle.hasComponent('top')).toStrictEqual(true);
		expect(htmlStyle.getComponent('top')).toStrictEqual(0);
		expect(htmlStyle.toString()).toStrictEqual('color:blue;top:0;');
	});

	it('should have have a method merge', () => {
		expect.hasAssertions();

		const htmlStyle = new HtmlStyle({'color': 'red'});
		htmlStyle.merge({color: 'blue', top: 0});
		expect(htmlStyle.hasComponent('color')).toStrictEqual(true);
		expect(htmlStyle.getComponent('color')).toStrictEqual('blue');
		expect(htmlStyle.hasComponent('top')).toStrictEqual(true);
		expect(htmlStyle.getComponent('top')).toStrictEqual(0);
		expect(htmlStyle.toString()).toStrictEqual('color:blue;top:0;');
	});
});
