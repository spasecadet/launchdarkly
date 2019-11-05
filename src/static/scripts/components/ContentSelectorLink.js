import htmlHelper from '../lib/htmlHelper.js';
import nav from '../lib/nav.js';

class ContentSelectorLink {
  constructor(href, text, icon, linkCb) {
    // Make args available to the class that will be used outside constructor.
    this.href = href;
    this.text = text;
    this.icon = icon;
    this.linkCb = linkCb;

    // Bind `this` to class methods used outside class
    this._clickHandler = this._clickHandler.bind(this);

    // Root element of component
    this.contentSelector = htmlHelper.createLinkWithClassAndListener(href, 'contentSelector', this._clickHandler);

    this._render();
  }

  /**
   * Listener that is added to this link.  Calls nav.linkHandler which needs 
   * the click event and the callback that updates the page's data.
   * 
   * @param {Event} e 
   */
  _clickHandler(e) {
    nav.linkHandler(e, this.linkCb);
  }

  /**
   * Build the html elements and attach them to the root element of this component.
   */
  _render() {
    // Text and icon are inside selectorDetails
    const selectorDetails = htmlHelper.createDivWithClass('selectorDetails');
    const i = htmlHelper.createIconWithClass(this.icon, '');
    const text = htmlHelper.createDivWithTextAndClass(this.text, 'description');
    
    selectorDetails.appendChild(i);
    selectorDetails.appendChild(text);

    this.contentSelector.appendChild(selectorDetails);
  }

  /**
   * Set this link as active - apply the class 'active'.
   */
  setActive() {
    this.contentSelector.classList.add('active');
  }

  /**
   * Set this link as inactive - remove the class 'active'.
   */
  setInactive() {
    this.contentSelector.classList.remove('active');
  }

  /**
  * Returns the root element for this component.
  *
  * @return {Object} ContentSelectorLink root
  */
  getElement() {
    return this.contentSelector;
  }
}

export default ContentSelectorLink;
