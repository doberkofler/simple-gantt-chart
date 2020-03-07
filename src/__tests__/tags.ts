import {getOpenTag, getContainerOpen, getContainer} from '../dom/tags';

describe('tags', () => {
	it('getOpenTag', () => {
		expect.hasAssertions();

		expect(getOpenTag('div', {'id': 'content', 'class': 'big'})).toStrictEqual('<div id="content" class="big">');
	});

	it('getContainerOpen', () => {
		expect.hasAssertions();

		expect(getContainerOpen(['big', 'small'], {color: 'red', top: 0}, {id: 'content'})).toStrictEqual('<div id="content" class="big small" style="color:red;top:0;">');
	});

	it('getContainer', () => {
		expect.hasAssertions();

		expect(getContainer(['big', 'small'], {color: 'red', top: 0}, 'text', {id: 'content'})).toStrictEqual('<div id="content" class="big small" style="color:red;top:0;">text</div>');
	});
});
