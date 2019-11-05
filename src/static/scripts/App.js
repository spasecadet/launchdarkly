import htmlHelper from './lib/htmlHelper.js';

import Header from './components/Header.js';
import AcademyStats from './components/AcademyStats.js';

class App {
  constructor() {
    // Root element of component
    this.app = htmlHelper.createDivWithClass('app');

    this._render();
  }

  /**
   * Build the child elements (Header and AcademyStats) and attach them 
   * to the root of the component.
   */
  _render() {
    this.app.appendChild(new Header().getElement());
    const academyStatsContainer = htmlHelper.createDivWithClass('academyStatsContainer');
    academyStatsContainer.appendChild(new AcademyStats().getElement());
    this.app.appendChild(academyStatsContainer);
  }

  /**
  * Returns the root element for this component.
  *
  * @return {Object} App root
  */
  getElement() {
    return this.app;
  }
}

export default App;
