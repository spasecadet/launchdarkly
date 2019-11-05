import htmlHelper from '../lib/htmlHelper.js';

import LeftMenu from './LeftMenu.js';
import StatsTable from './StatsTable.js';

class AcademyStats {
  constructor() {
    // Html elements and textnodes that we need to be able to access throughout this class.
    this.academyStats = htmlHelper.createDivWithClass('academyStats');
    this.statsTableContainer = htmlHelper.createDivWithClass('statsTableContainer');
    this.tableTitleTextNode = htmlHelper.createTextNode('All Exams');
    this.averageTextNode = htmlHelper.createTextNode('');
    this.error = htmlHelper.createDivWithClass('error');
    this.errorTextNode = htmlHelper.createTextNode('');

    // Bind `this` to class methods used outside class
    this._getAverage = this._getAverage.bind(this);
    this._setContent = this._setContent.bind(this);
    
    // Init child components that we need access to in multiple places
    this.statsTable = new StatsTable(this._setContent, this._getAverage);
    this.leftMenu = new LeftMenu(this._setContent);
    
    // Set the contents of the page.
    this._setContent(window.location.pathname);
    this._render();
    
    // Handle browser navigation (forward/back) actions
    window.addEventListener('popstate', () => {
      this._setContent(window.location.pathname);
    });
  }

  /**
   * Sets the content of the page by getting the details for the page and table 
   * based on the new path and passing them to the setDeta method of the table. 
   * Also sets the title for the page, clears out old errors, and highlights the
   * correct menu button.
   * 
   * @param {String} path 
   */
  _setContent(path) {
    // default to exam data if path is empty
    path = path === '/' ? '/exams' : path;
    const tableArgs = this._getTableArgsByPath(path);
    // Set the title for the table/page.
    this.tableTitleTextNode.nodeValue = tableArgs.title;

    this._clearError();

    if (tableArgs.status && tableArgs.status === 'error') {
      this._setError(tableArgs);
      return;
    }

    // Provides the table with data it needs and tells the table to begin 
    // polling for data
    this.statsTable.setData(tableArgs.headers, path, tableArgs.linksTo);
    this.leftMenu.setActiveMenuLink(path);
  }

  /**
   * Hide the error text and show the table.
   */
  _clearError() {
    this.error.classList.remove('visible');
    this.statsTableContainer.classList.remove('hidden');
  }

  /**
   * Set the error text and show the error, hide the table.
   * 
   * @param {Object} error 
   */
  _setError(error) {
    this.errorTextNode.nodeValue = error.text;
    this.error.classList.add('visible');
    this.averageTextNode.nodeValue = '';
    this.statsTableContainer.classList.add('hidden');
  }

  /**
   * Sets the average value, called inside the table.  If avg is empty then 
   * nothing is displayed.
   * 
   * @param {String} avg 
   */
  _getAverage(avg) {
    this.averageTextNode.nodeValue = avg === '' ? '' : `Average: ${avg}%`;
  }

  /**
   * Based on the current url path set the headers, page/table title, and 
   * determine where this table's links should go.  If the user has tried 
   * to go to a url that isn't supported return the error data.
   * 
   * note: I considered using the data keys to build the headers but I 
   * think that binds the front and back ends too closely.  I also probably 
   * could have inferred where the table links should go too, but it seems 
   * safer to be explicit about it.
   * 
   * @param {*} path 
   */
  _getTableArgsByPath(path) {
    const pathItems = path.split('/');

    // Creates 'exams', 'examsId', 'students', or 'studentsId'.  
    const matchTableOption = pathItems[1] + (pathItems[2] && pathItems[2].length ? 'Id' : '');

    const tableOptions = {
      exams: {
        headers: ['Exam ID', 'Avg Exam Grade', 'Students'],
        linksTo: 'exams',
        title: 'All Exams',
      },
      examsId: {
        headers: ['Student ID', 'Grade'],
        linksTo: 'students',
        title: `Exam ${pathItems[2]}`,
      },
      students: {
        headers: ['Student ID'],
        linksTo: 'students',
        title: `All Students`,
      },
      studentsId: {
        headers: ['Exam ID', 'Grade'],
        linksTo: 'exams',
        title: `${pathItems[2]}`,
      },
      error: {
        title: 'You broke a chip!',
        status: 'error',
        text: 'This data does not exist, please try clicking on one of the links to the left',
      }
    };

    return tableOptions[matchTableOption] ? tableOptions[matchTableOption] : tableOptions.error;
  }

  /**
   * Build the html elements and attach them to the root element of this component.
   * 
   * note: The reason I put the leftMenu in here is both because it takes in 
   * the same callback as the table for clicking on links so I wanted to 
   * minimize how much I had to pass callbacks around, and it seems very 
   * specific to this content, I don't imagine this particular menu would be 
   * used elsewhere.
   */
  _render() {
    // Left hand menu
    const leftMenuContainer = htmlHelper.createDivWithClass('leftMenuContainer');
    leftMenuContainer.appendChild(this.leftMenu.getElement());
    // Attach menu to component root
    this.academyStats.appendChild(leftMenuContainer);

    // contentContainer holds all content other than the left menu.
    const contentContainer = htmlHelper.createDivWithClass('contentContainer');

    // Title row with table title and average value
    const titleRowContainer = htmlHelper.createDivWithClass('titleRowContainer');
    const tableTitle = htmlHelper.createTitleWithClass('tableTitle');
    const averageElement = htmlHelper.createParagraphWithClass('average');
    tableTitle.appendChild(this.tableTitleTextNode);
    titleRowContainer.appendChild(tableTitle);averageElement.appendChild(this.averageTextNode);
    titleRowContainer.appendChild(averageElement);

    // Attach title and error to contentContainer
    contentContainer.appendChild(titleRowContainer);
    this.error.appendChild(this.errorTextNode);
    contentContainer.appendChild(this.error);
    
    this.statsTableContainer.appendChild(this.statsTable.getElement());
    contentContainer.appendChild(this.statsTableContainer);

    // Attach content to component root. 
    this.academyStats.appendChild(contentContainer);
  }

  /**
   * Returns the root element for this component.
   *
   * @return {Object} AcademyStats root
   */
  getElement() {
    return this.academyStats;
  }
}

export default AcademyStats;
