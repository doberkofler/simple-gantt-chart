export type stylesType = {[key: string]: string|number};

/**
 * Abstraction of a CSS style
 */
export class HtmlStyle {
	private _styles: stylesType;

	/**
	 *	Constructor.
	 *
	 *	@param {HtmlStyle|stylesType} styles - A object where each property represents a style component.
	 *	@example const style = new HtmlStyle({'color': black, 'background-color': 'white'});
	 */
	public constructor(styles: HtmlStyle|stylesType = {}) {
		this._styles = {};

		if (styles instanceof HtmlStyle) {
			this._styles = Object.assign({}, styles._styles);
		} else {
			for (const e in styles) {
				const name = e.toLocaleLowerCase();
				if (this._styles.hasOwnProperty(name)) {
					throw new TypeError(`Duplicate style "${name}"`);
				}
				this._styles[name] = styles[e];
			}
		}
	}

	/**
	 *	Merge additional style components by eventually overwriting the existing ones.
	 *
	 *	@param {stylesType} styles - A object where each property represents a style component.
	 *	@example style.merge({'color': black, 'background-color': 'white'});
	 */
	public merge(styles: stylesType): void {
		for (const e in styles) {
			const name = e.toLocaleLowerCase();
			this._styles[name] = styles[e];
		}
	}

	/**
	 *	Get style component.
	 *
	 *	@param {string} name - The component name.
	 *	@returns {string | null} - The component value or null if not found.
	 */
	public getComponent(name: string): string|number|null {
		const n = name.toLowerCase();

		return this._styles.hasOwnProperty(n) ? this._styles[n] : null;
	}

	/**
	 *	Set style component.
	 *
	 *	@param {string} name - The component name.
	 *	@param {string|number} value - The component value.
	 */
	public setComponent(name: string, value: string|number): void {
		this._styles[name.toLowerCase()] = value;
	}

	/**
	 *	Is the given style component in the current list of component.
	 *
	 *	@param {string} name - The component name.
	 *	@returns {boolean} - Return true if component is found or else false.
	 */
	public hasComponent(name: string): boolean {
		return this.getComponent(name) !== null;
	}

	/**
	 *	Convert the style components to a style attribute.
	 *
	 *	@returns {string} A string representation of the style.
	 */
	public toString(): string {
		const styles = [];

		for (const key in this._styles) {
			styles.push(`${key}:${this._styles[key]};`);
		}

		return styles.join('');
	}
}
