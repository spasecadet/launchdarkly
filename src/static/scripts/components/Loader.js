import htmlHelper from '../lib/htmlHelper.js';

class Loader {
  constructor() {
    // Root element of component
    this.loader = htmlHelper.createDivWithClass('loaderCircle');

    this._render();
  }

  /**
   * Create inner loader div and attach it to the component root.
   */
  _render() {
    const loaderInner = htmlHelper.createDivWithClass('');
    this.loader.appendChild(loaderInner);
  }

  /**
   * Make the loader visible by removing the class 'hidden'.
   */
  show() {
    this.loader.classList.remove('hidden');
  }

  /**
   * Hide the loader by adding the class 'hidden'.
   */
  hide() {
    this.loader.classList.add('hidden');
  }

  /**
  * Returns the root element for this component.
  *
  * @return {Object} Loader root
  */
  getElement() {
    return this.loader;
  }
}

export default Loader;
