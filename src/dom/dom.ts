import {HtmlStyle, stylesType} from './HtmlStyle';
import {HtmlAttributes, attributesType} from './HtmlAttributes';

export type completeRectType = {
	y: number,
	x: number,
	width: number,
	height: number,
	right: number,
	bottom: number,
};

export function getElementByClassName(classNames: string): Element {
	const elements = document.getElementsByClassName(classNames);
	if (elements.length !== 1) {
		throw new Error(`The selector "${classNames}" returns ${elements.length} instead of 1 element`);
	}

	return elements[0];
}

/*
*	Return the element specified by id and class
*/
export function getElementByIdAndClass(id: string, className: string): Element {
	const rootElement = document.getElementById(id);
	if (rootElement === null) {
		throw new Error(`The root element with id "${id}" cannot be found`);
	}

	const element = rootElement.querySelector(`.${className}`);
	if (element === null) {
		throw new Error(`The selector "${className}" cannot be found in the id "${id}"`);
	}

	return element;
}

/*
export function querySelector(selector: string): Element {
	const element = document.querySelector(selector);
	if (element === null) {
		throw new Error(`The selector "${selector}" does not exist`);
	}

	return element;
}
*/

export function getClientRect(element: HTMLElement): completeRectType {
	/* istanbul ignore if */
	if (typeof element.getBoundingClientRect !== 'function') {
		throw new Error('Unsupported browser: getBoundingClientRect is missing on element');
	}

	const box = element.getBoundingClientRect();
	/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition */
	const documentElement = document.documentElement || document.body.parentNode || document.body;
	const scrollTop = window.pageYOffset || documentElement.scrollTop || document.body.scrollTop;
	const scrollLeft = window.pageXOffset || documentElement.scrollLeft || document.body.scrollLeft;
	const clientTop = documentElement.clientTop || document.body.clientTop || 0;
	const clientLeft = documentElement.clientLeft || document.body.clientLeft || 0;
	/* eslint-enable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition */

	return {
		y: Math.round(box.top + scrollTop - clientTop),
		x: Math.round(box.left + scrollLeft - clientLeft),
		width: Math.round(element.offsetWidth),
		height: Math.round(element.offsetHeight),
		right: Math.round(document.body.offsetWidth - box.right),
		bottom: Math.round(document.body.offsetHeight - box.bottom)
	};
}

/*
export function addCustomEventListener(selector: string, event: string, handler: (event: Event) => void): void {
	const rootElement = document.querySelector('body');
	if (rootElement === null) {
		throw new Error('Cannot find body');
	}

	//since the root element is set to be body for our current dealings
	rootElement.addEventListener(event, event => {
		let targetElement: Element|null = event.target as any; // TODO: something is wrong with the types here!!!
		while (targetElement !== null) {
			if (targetElement.matches(selector)) {
				handler(event);
				return;
			}
			targetElement = targetElement.parentElement;
		}
	}, true);
}
*/

/**
 *	Create a new DOM element container.
 *
 *	@param {Node} container - The parent node.
 *	@param {string} tag - The tag name.
 *	@param {string|Array<string>} [classes=[]] - The string in the class attribute.
 *	@param {HtmlStyle|stylesType} [styles={}] - The styles in the style attribute.
 *	@param {string} [content] - The content of the div.
 *	@param {HtmlAttributes|attributesType} [attributes={}] - The optional attributes.
 *	@returns {HTMLElement} - The html markup.
 *	@example const element = createElement(document, 'div', 'cell', {width: 0}, 'hello world', {id: 'id'});
 */
export function createElement(container: Node, tag: string, classes: string|Array<string> = [], styles: HtmlStyle|stylesType = {}, content = '', attributes: HtmlAttributes|attributesType = {}): HTMLElement {
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

	// create the tag
	const element = document.createElement(tag);
	htmlAttributes.appyAttributes(element);

	if (content.length > 0) {
		element.innerHTML = content;
	}

	return container.appendChild(element);
}

/*
export function createAnchor(container: Node, text: string, cb: (event: MouseEvent) => void): void {
	const anchorElement = document.createElement('a');
	const anchorText = document.createTextNode(text);
	anchorElement.appendChild(anchorText);
	anchorElement.setAttribute('href', '#');
	container.appendChild(anchorElement);
	anchorElement.addEventListener('click', event => {
		event.preventDefault();
		event.stopPropagation();
		cb(event);
	});
}
*/
