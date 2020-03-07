import {HtmlAttributes, attributesType} from '../dom/HtmlAttributes';

describe('the class HtmlAttributes', () => {
	it('should have a default constructor', () => {
		expect.hasAssertions();

		const htmlAttributes = new HtmlAttributes();
		expect(htmlAttributes.hasAttribute('class')).toStrictEqual(false);
		expect(htmlAttributes.getAttribute('class')).toBeNull();
		expect(htmlAttributes.toString()).toStrictEqual('');
	});

	it('should have a custom constructor', () => {
		expect.hasAssertions();

		const htmlAttributes = new HtmlAttributes({'class': 'big'});
		expect(htmlAttributes.hasAttribute('class')).toStrictEqual(true);
		expect(htmlAttributes.getAttribute('class')).toStrictEqual('big');
		expect(htmlAttributes.toString()).toStrictEqual('class="big"');

		expect(() => new HtmlAttributes({'class': true} as unknown as attributesType)).toThrow('Invalid type of value in attribute "class"');
		expect(() => new HtmlAttributes({'class': 'big', 'Class': 'big'} as unknown as attributesType)).toThrow('Duplicate attribute "Class"');
	});

	it('should have a copy constructor', () => {
		expect.hasAssertions();

		const htmlAttributes = new HtmlAttributes(new HtmlAttributes({'class': 'big'}));
		expect(htmlAttributes.hasAttribute('class')).toStrictEqual(true);
		expect(htmlAttributes.getAttribute('class')).toStrictEqual('big');
		expect(htmlAttributes.toString()).toStrictEqual('class="big"');
	});

	it('should have have a method setComponent', () => {
		expect.hasAssertions();

		const htmlAttributes = new HtmlAttributes({'class': 'big'});
		expect(htmlAttributes.hasAttribute('class')).toStrictEqual(true);
		expect(htmlAttributes.getAttribute('class')).toStrictEqual('big');
		expect(htmlAttributes.toString()).toStrictEqual('class="big"');

		htmlAttributes.setAttribute('class', 'small');
		expect(htmlAttributes.hasAttribute('class')).toStrictEqual(true);
		expect(htmlAttributes.getAttribute('class')).toStrictEqual('small');
		expect(htmlAttributes.toString()).toStrictEqual('class="small"');

		htmlAttributes.setAttribute('id', 1);
		expect(htmlAttributes.hasAttribute('class')).toStrictEqual(true);
		expect(htmlAttributes.getAttribute('class')).toStrictEqual('small');
		expect(htmlAttributes.hasAttribute('id')).toStrictEqual(true);
		expect(htmlAttributes.getAttribute('id')).toStrictEqual('1');
		expect(htmlAttributes.toString()).toStrictEqual('class="small" id="1"');
	});

	it('should have have a pushValue method', () => {
		expect.hasAssertions();

		const htmlAttributes = new HtmlAttributes({'class': 'big'});
		htmlAttributes.pushValue('class', 'small');
		htmlAttributes.pushValue('class', 'small');
		expect(htmlAttributes.hasValue('id', '1')).toStrictEqual(false);
		expect(htmlAttributes.hasValue('class', 'medium')).toStrictEqual(false);
		expect(htmlAttributes.hasValue('class', 'big')).toStrictEqual(true);
		expect(htmlAttributes.hasValue('class', 'small')).toStrictEqual(true);
		expect(htmlAttributes.toString()).toStrictEqual('class="big small"');
	});
});
