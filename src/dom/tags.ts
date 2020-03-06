import {HtmlStyle, stylesType} from './HtmlStyle';
import {HtmlAttributes, attributesType} from './HtmlAttributes';

/**
 *	Create the markup for a tag.
 *
 *	@param {string} tag - The tag.
 *	@param {HtmlAttributes|attributesType} [attributes] - The optional attributes.
 *	@returns {string} - The html markup.
 *	@example const html = getTag('p', {id: 'id'});
 */
export function getOpenTag(tag: string, attributes?: HtmlAttributes|attributesType): string {
	const attr = getAttributes(attributes);

	return `<${tag}${attr.length > 0 ? ' ' + attr : ''}>`;
}

/**
 *	Create the markup to open a div container.
 *
 *	@param {string|Array<string>} classes - The string in the class attribute.
 *	@param {HtmlStyle|stylesType} [styles={}] - The styles in the style attribute.
 *	@param {HtmlAttributes|attributesType} [attributes={}] - The optional attributes.
 *	@returns {string} - The html markup.
 *	@example const html = getContainerOpen('cell', {width: 0}, {id: 'id'});
 */
export function getContainerOpen(classes: string|Array<string>, styles: HtmlStyle|stylesType = {}, attributes: HtmlAttributes|attributesType = {}): string {
	const htmlAttributes = new HtmlAttributes(attributes);
	const htmlStyle = new HtmlStyle(styles).toString();

	if (htmlAttributes.hasAttribute('class') || htmlAttributes.hasAttribute('style')) {
		throw new Error('The parameter "attributes" cannot contain a "class" or "style" attribute');
	}

	if (typeof classes === 'string') {
		htmlAttributes.setAttribute('class', classes);
	} else if (classes.length > 0) {
		htmlAttributes.setAttribute('class', classes.join(' '));
	}

	if (htmlStyle.length > 0) {
		htmlAttributes.setAttribute('style', htmlStyle);
	}

	return getOpenTag('div', htmlAttributes);
}

/**
 *	Create the markup for a div container.
 *
 *	@param {string|Array<string>} classes - The string in the class attribute.
 *	@param {HtmlStyle|stylesType} [styles={}] - The styles in the style attribute.
 *	@param {string} [content] - The content of the div.
 *	@param {HtmlAttributes|attributesType} [attributes={}] - The optional attributes.
 *	@returns {string} - The html markup.
 *	@example const html = getContainerOpen('cell', {width: 0}, 'hello world', {id: 'id'});
 */
export function getContainer(classes: string|Array<string>, styles: HtmlStyle|stylesType = {}, content = '', attributes: HtmlAttributes|attributesType = {}): string {
	return getContainerOpen(classes, styles, attributes) + content + '</div>';
}

function getAttributes(attributes?: HtmlAttributes|attributesType): string {
	if (attributes instanceof HtmlAttributes) {
		return attributes.toString();
	} else if (typeof attributes === 'object' && attributes !== null) {
		const htmlAttributes = new HtmlAttributes(attributes);
		return htmlAttributes.toString();
	} else {
		return '';
	}
}
