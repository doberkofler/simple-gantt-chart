import {getElementByClassName, getElementByIdAndClass, getClientRect, createElement} from '../dom/dom';

describe('getElementByClassName', () => {
	it('should find an element by class name', () => {
		expect.hasAssertions();

		document.body.innerHTML = '<div class="big">text</div>';
		expect(getElementByClassName('big').innerHTML).toStrictEqual('text');

		expect(() => getElementByClassName('small')).toThrow('The selector "small" returns 0 instead of 1 element');
	});
});

describe('getElementByIdAndClass', () => {
	it('should find an element by id and then class name', () => {
		expect.hasAssertions();

		document.body.innerHTML = '<div id="1"><div class="big">text</div></div>';
		expect(getElementByIdAndClass('1', 'big').innerHTML).toStrictEqual('text');

		expect(() => getElementByIdAndClass('nope', 'big')).toThrow('The root element with id "nope" cannot be found');
		expect(() => getElementByIdAndClass('1', 'small')).toThrow('The selector "small" cannot be found in the id "1"');
	});
});

describe('getClientRect', () => {
	it('should return the client rectangle', () => {
		expect.hasAssertions();

		document.body.innerHTML = '<div class="big"><br><br><br></div>';

		const element = getElementByClassName('big') as HTMLElement;

		expect(getClientRect(element)).toStrictEqual({
			y: 0,
			x: 0,
			width: 0,
			height: 0,
			right: 0,
			bottom: 0,
		});
	});
});

describe('createElement', () => {
	it('should create an element in the DOM', () => {
		expect.hasAssertions();

		createElement(document.body, 'div');

		createElement(document.body, 'div', 'big', {color: 'red'}, 'text', {id: '1'});
		expect(document.getElementById('1')).not.toBeNull();

		createElement(document.body, 'div', ['big', 'small'], {color: 'red'}, 'text', {id: '2'});
		expect(document.getElementById('2')).not.toBeNull();

		expect(() => createElement(document.body, 'div', 'big', {}, 'text', {class: 'big'})).toThrow('The parameter "attributes" cannot contain a "class" or "style" attribute');
		expect(() => createElement(document.body, 'div', 'big', {}, 'text', {style: 'big'})).toThrow('The parameter "attributes" cannot contain a "class" or "style" attribute');
	});
});


