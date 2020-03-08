import {getOpenTag, getContainerOpen, getContainer} from '../dom/tags';

describe('tags', () => {
	it('getOpenTag', () => {
		expect.hasAssertions();

		expect(getOpenTag('div')).toStrictEqual('<div>');
		expect(getOpenTag('div', {'id': 'content', 'class': 'big'})).toStrictEqual('<div id="content" class="big">');
	});

	it('getContainerOpen', () => {
		expect.hasAssertions();

		expect(getContainerOpen([])).toStrictEqual('<div>');
		expect(getContainerOpen([], {})).toStrictEqual('<div>');
		expect(getContainerOpen('big', {color: 'red', top: 0}, {id: 'content'})).toStrictEqual('<div id="content" class="big" style="color:red;top:0;">');
		expect(getContainerOpen(['big', 'small'], {color: 'red', top: 0}, {id: 'content'})).toStrictEqual('<div id="content" class="big small" style="color:red;top:0;">');

		expect(() => {
			getContainerOpen(['big', 'small'], {color: 'red', top: 0}, {'class': ''});
		}).toThrow('The parameter "attributes" cannot contain a "class" or "style" attribute');
		expect(() => {
			getContainerOpen(['big', 'small'], {color: 'red', top: 0}, {'style': ''});
		}).toThrow('The parameter "attributes" cannot contain a "class" or "style" attribute');
	});

	it('getContainer', () => {
		expect.hasAssertions();

		expect(getContainer([])).toStrictEqual('<div></div>');
		expect(getContainer(['big', 'small'], {color: 'red', top: 0}, 'text', {id: 'content'})).toStrictEqual('<div id="content" class="big small" style="color:red;top:0;">text</div>');
	});
});
