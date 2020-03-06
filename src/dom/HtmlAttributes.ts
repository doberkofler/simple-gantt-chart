export type attributesType = {[key: string]: string | number};
type _attributesType = {[key: string]: string};

/**
 * Abstraction of the HTML attributes in a tag
 */
export class HtmlAttributes {
	private _attributes: _attributesType;

	/**
	 *	Constructor.
	 *
	 *	@param {attributesType} attributes - A object where each property represents an attribute.
	 *	@example const attributes = new HtmlAttributes({id: 4711, class: 'myClass'});
	 */
	public constructor(attributes: HtmlAttributes|attributesType = {}) {
		this._attributes = {};

		if (attributes instanceof HtmlAttributes) {
			this._attributes = Object.assign({}, attributes._attributes);
		} else {
			for (const attribute in attributes) {
				const name = attribute.toLowerCase();
				const value = attributes[attribute];

				if (typeof value !== 'string' && typeof value !== 'number') {
					throw new TypeError(`Invalid type of value in attribute "${attribute}"`);
				}
				if (this._attributes.hasOwnProperty(name)) {
					throw new TypeError(`Duplicate attribute "${attribute}"`);
				}

				this._attributes[name] = value.toString();
			}
		}
	}

	/**
	 *	Get attribute.
	 *
	 *	@param {string} name - The attribute name.
	 *	@returns {string | null} - The attribute value or null if not found.
	 */
	public getAttribute(name: string): string | null {
		const n = name.toLowerCase();

		return this._attributes.hasOwnProperty(n) ? this._attributes[n] : null;
	}

	/**
	 *	Set attribute.
	 *
	 *	@param {string} name - The attribute name.
	 *	@param {string | number} value - The attribute value.
	 */
	public setAttribute(name: string, value: string | number): void {
		this._attributes[name.toLowerCase()] = value.toString();
	}
	/**
	 *	Is the given attributes in the current list of attributes.
	 *
	 *	@param {string} name - The attribute name.
	 *	@returns {boolean} - Return true if attribute is found or else false.
	 */
	public hasAttribute(name: string): boolean {
		return this.getAttribute(name) !== null;
	}

	/**
	 *	Add a new value to the attribute if not yet there.
	 *
	 *	@param {string} name - The attribute name.
	 *	@param {string | number} value - The attribute value.
	 */
	public pushValue(name: string, value: string | number): void {
		const valueAsString = value.toString();
		// if there is nothing to push or the attribute already contains the value, we just return
		if (valueAsString.length === 0 || this.hasValue(name, valueAsString)) {
			return;
		}

		const attribute = this.getAttribute(name);

		this.setAttribute(name, appendValue(attribute !== null ? attribute : '', valueAsString));
	}

	/**
	 *	Is the given attributes in the current list of attributes.
	 *
	 *	@param {string} name - The attribute name.
	 *	@param {string | number} value - The value to search for.
	 *	@returns {boolean} - Return true if value if found or else false.
	 */
	public hasValue(name: string, value: string | number): boolean {
		const oldValue = this.getAttribute(name);

		if (oldValue === null || oldValue.length === 0) {
			return false;
		}

		const oldValues = oldValue.split(' ');

		return oldValues.indexOf(value.toString()) !== -1;
	}

	/**
	 *	Convert the attributes toa  string that can be used in the markup.
	 *
	 *	@returns {string} A string representation of all attributes.
	 */
	public toString(): string {
		const attributes = [];

		for (const key in this._attributes) {
			attributes.push(`${key}="${this._attributes[key]}"`);
		}

		return attributes.join(' ');
	}

	/**
	 *	Apply the attributes to an existing DOM Element.
	 *
	 *	@param {HTMLElement} element - The DOM element.
	 */
	public appyAttributes(element: HTMLElement): void {
		for (const key in this._attributes) {
			element.setAttribute(key, this._attributes[key]);
		}
	}
}

/*
 *	Append a value
 */
function appendValue(oldValue: string, value: string): string {
	let newValue = oldValue === null ? '' : oldValue;

	if (value.length > 0) {
		newValue += (newValue.length > 0 ? ' ' : '') + value;
	}

	return newValue;
}
