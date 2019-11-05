import htmlHelper from '../lib/htmlHelper.js';

import ContentSelectorLink from './ContentSelectorLink.js';

class LeftMenu {
  constructor(linkCb) {
    // Make constructor arg available to the class.
    this.linkCb = linkCb;

    // Root element of component
    this.leftMenu = htmlHelper.createDivWithClass('leftMenu');

    // used to build all links for the menu
    this.linksDetails = [
      {text: 'Exams', icon: 'check_circle_outline', href: '/exams'},
      {text: 'Students', icon: 'face', href: '/students'},
    ];

    // Hold the link elements.  Used later to toggle a link as active or not.
    this.links = [];

    this._render();
  }

  /**
   * Based on the current path set the active button.
   * 
   * @param {String} path 
   */
  setActiveMenuLink(path) {
    this.links.forEach((link) => {
      link.setInactive();
      if (path.indexOf(link.href) > -1) {
        link.setActive();
      }
    });
  }

  /**
   * Create all the links in this menu.  Store them in this.links for later 
   * use and append them to the root of this component.
   */
  _render() {
    this.linksDetails.forEach((s) => {
      const link = new ContentSelectorLink(s.href, s.text, s.icon, this.linkCb);
      this.links.push(link);
      this.leftMenu.appendChild(link.getElement());
    });
  }

  /**
  * Returns the root element for this component.
  *
  * @return {Object} LeftMenu root
  */
  getElement() {
    return this.leftMenu;
  }
}

export default LeftMenu;
