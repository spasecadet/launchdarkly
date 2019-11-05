import htmlHelper from '../lib/htmlHelper.js';

class Header {
  constructor() {
    // Root element of component
    this.header = htmlHelper.createDivWithClass('header');
    
    this._render();
  }

  /**
   * Creates the logo.
   * 
   * note: I'd move this to a separate component if I needed the logo anywhere else.
   */
  _createLogo() {
    const logo = htmlHelper.createDivWithClass('logo');
    
    logo.appendChild(htmlHelper.createSpanWithTextAndClass('N', 'nO'));
    logo.appendChild(htmlHelper.createSpanWithTextAndClass('a', 'a'));
    logo.appendChild(htmlHelper.createSpanWithTextAndClass('c', 'c'));
    logo.appendChild(htmlHelper.createSpanWithTextAndClass('h', 'h'));
    logo.appendChild(htmlHelper.createSpanWithTextAndClass('o', 'nO'));
    logo.appendChild(htmlHelper.createSpanWithTextAndClass(' Academy', 'academy'));

    return logo;
  }

  /**
   * Attach all header elements to the header root (just the logo in this case);
   */
  _render() {
    this.header.appendChild(this._createLogo());
  }

  /**
  * Returns the root element for this component.
  *
  * @return {Object} Header root
  */
  getElement() {
    return this.header;
  }
}

export default Header;
