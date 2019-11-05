import htmlHelper from '../lib/htmlHelper.js';
import nav from '../lib/nav.js';
import objHelper from '../lib/objHelper.js';

import Loader from './Loader.js';

class StatsTable {
  constructor(linkCb, getAverage) {
    // Make constructor args available to the class.
    this.linkCb = linkCb;
    this.getAverage = getAverage;

    // Used to determine if the table is currently attached to the DOM - don't 
    // want to perform operations on the table if it is attached.
    this.isAttached = false;
    // Value assigned in this._pollForData, used to cancel a current poll.
    this.poll;
    // Used to help determine polling delay.  If we know there's already 
    // data in the DB then we can poll slower since we're able to show 
    // data to the user immediately.
    this.dataPresentInDb = false;
    // Assigned values in this.setData, used to get data and create table.
    this.header;
    this.endpoint;
    this.linksTo;

    // Create elements that need to be available throughout the class.
    this.loader = new Loader();
    this.statsTableInnerContainer = htmlHelper.createDivWithClass('statsTableInnerContainer');
    this.statsTable = htmlHelper.createListWithClass('listAsTable');
    this.errorTextNode = htmlHelper.createTextNode('This is an error');
    this.error = htmlHelper.createDivWithClass('tableError');
    
    // Bind `this` to class methods used outside class
    this._clickHandler = this._clickHandler.bind(this);
    this._render();
  }

  /**
   * Controls what data the table should poll for and display.  This is 
   * called on the instantiated class from a parent.
   * 
   * eg: new StatsTable(cb, getAverage).setData(['header1', 'header2'], '/exams/', '/exams/');
   * 
   * Clears the current poll, empties the table of its current children (if any), 
   * creates the table header, then begins polling for data.
   * 
   * @param {Array} headers 
   * @param {String} endpoint 
   * @param {String} linksTo 
   */
  setData(headers, endpoint, linksTo) {
    this.endpoint = endpoint;
    this.linksTo = linksTo;

    clearTimeout(this.poll);
    this._hideError();

    this._createTableHeader(headers);
    this._pollForData();
  }

  /**
   * Passes both the click event and the callback to nav.linkHandler.
   * 
   * @param {Event} e 
   */
  _clickHandler(e) {
    nav.linkHandler(e, this.linkCb);
  }

  /**
   * Poll for data for the current endpoint.  Because there may not be events 
   * immediately the polling is a bit more complicated than it might otherwise 
   * be.  
   * 
   * A request is fired off immediately for data, if the response contains 
   * data then the server has NOT just restarted and the polling interval is 
   * longer.
   * 
   * If the server has just restarted (or the db is not populated for some 
   * reason) then after the initial request for data the polling interval is 
   * much shorter because we still haven't shown data to the user and we want 
   * to try to have something to show them as soon as possible.
   */
  _pollForData() {
    let cachedData = {};
    const initialPollingInterval = 1000;
    const finalPollingInterval = 10000;
    
    // Show the loader and hide the table until there is data.
    this._toggleTableAndLoaderVisibility('hideTable');

    /**
     * Polls recursively.  Using setTimeout instead of setInterval allows for 
     * changing the interval between requests.  Also there's no risk of a request 
     * taking too long and returning after the next interval has begun.
     */
    const poll = () => {
      const pollingCb = (newData) => {
        cachedData = newData;
        if (this.dataPresentInDb) {
          // Once there is actual data to show, hide the loader and show the table.
          this._toggleTableAndLoaderVisibility('showTable');
        }
        this.poll = setTimeout(poll, this.dataPresentInDb ? finalPollingInterval : initialPollingInterval);
      };
      this._getData(cachedData, pollingCb);
    };

    // Initial request for data happens immediately
    this.poll = setTimeout(poll, 0);
  }

  /**
   * Requests data from backend.  If the data is different than the cachedData 
   * then populate the table with the new data.  Table will not actually be 
   * visible until we've gotten data for the table rows (handled in the polling 
   * cb). 
   * 
   * If a request is made for a specific exam or student that doesn't appear 
   * to exist in the DB then instead of letting the loader spin forever cancel 
   * polling and show a message to the user.
   *  
   * @param {Object} cachedData   Allows us to determine wether the data has 
   *                                changed since last poll.
   * @param {Function} cb         A callback used to cache data, and set the 
   *                                next poll.
   */
  async _getData(cachedData, cb) {
    try {
      const response = await fetch(`http://localhost:4000/api/v1${this.endpoint}`);
      const result = await response.json();
      
      if (response.ok) {
        const dataKeys = Object.keys(result);
        const rowsData = result[dataKeys[0]];

        this.dataPresentInDb = this.dataPresentInDb || !!rowsData.length;
        // check if new data is different from previous data, and wether the DB has real data to give us.
        if (!objHelper.isJsonEqual(result, cachedData) && this.dataPresentInDb) {
          // If data contains 'average' pass the value to parent, otherwise pass empty string.
          const averageVal = result.average ? Math.round(result.average * 100) : '';
          this.getAverage(averageVal);

          this._populateTable(rowsData);
        }

        cb(result);
      } else {
        throw new Error(result.message ? result.message 
          : 'There was an error, please try returning to the exams or students page.');
      }
    } catch (err) {
      this._setError(err);
    }
  }

  /**
   * Shows loader and hides table, or hides loader and shows table.
   * 
   * @param {String} action 
   */
  _toggleTableAndLoaderVisibility(action) {
    if (action === 'hideTable') {
      this.loader.show();
      this.statsTable.classList.add('hidden');
      return;
    }

    this.loader.hide();
    this.statsTable.classList.remove('hidden');
  }

  /**
   * Hides the loader and shows an error message.  This should only be 
   * called when there's been an error.
   * 
   * @param {Object} err
   */
  _setError(err) {
    this.loader.hide();
    this.errorTextNode.nodeValue = err.message;
    this._showError();
    clearTimeout(this.poll);
  }

  /**
   * Shows the error field by adding a class of 'visible'.
   */
  _showError() {
    this.error.classList.add('visible');
  }

  /**
   * Hides the error field by removing a class of 'visible'.
   */
  _hideError() {
    this.error.classList.remove('visible');
  }
  
  /**
   * Create the header row li element and assign it to this.header so we can 
   * save it and access it later - especially if the table data changes during 
   * polling and we rebuild the table.
   * 
   * @param {Array} headers 
   */
  _createTableHeader(headers) {
    const liElement = htmlHelper.createListItemWithClass('headerRow');
    headers.forEach((header) => {
      const textNode = htmlHelper.createTextNode(header);
      const colHeader = htmlHelper.createDivWithClass('colHeader');
      colHeader.appendChild(textNode);
      liElement.appendChild(colHeader);
    });
    this.header = liElement;
  }

  /**
   * Create all the li rows for the table and append them to the list/table. As
   * opposed to this._createTableHeader here we don't need to store the list of 
   * li elements for later since the table data is always created from scratch.
   * 
   * @param {[Object]} rowsData 
   */
  _createRows(rowsData) {
    rowsData.forEach((row) => {
      const liElement = htmlHelper.createListItemWithClass('row');
      let counter = 0;
      for (let val in row) {
        // Scores represent grades and are always converted to an int.
        const isScore = val.toLowerCase().indexOf('score') > -1;
        const cellValue = isScore ? Math.round(row[val] * 100) : row[val];
        const cellPrefix = val === 'examId' ? 'Exam ' : '';
        const textNode = htmlHelper.createTextNode(`${cellPrefix}${cellValue}${isScore ? '%' : ''}`);
        const rowItem = htmlHelper.createDivWithClass('rowItem');

        if (counter === 0) {
          // Create link for first cell which is always clickable, at least for this particular use case.
          const link = htmlHelper.createLinkWithClassAndListener(`/${this.linksTo}/${cellValue}`, 'statLink', this._clickHandler);
          link.appendChild(textNode);
          rowItem.appendChild(link);
        } else {
          // plain text for following cells
          rowItem.appendChild(textNode);
        }

        liElement.appendChild(rowItem);
        counter++;
      }
      this.statsTable.appendChild(liElement);
    });
  }

  /**
   * Given data for the table rows, remove existing children, append the 
   * header row, create and append all the data rows, then reattach the 
   * table to the DOM.
   * 
   * @param {[Object]} rowsData 
   */
  _populateTable(rowsData) {
    this._emptyTable();
    this.statsTable.appendChild(this.header);
    this._createRows(rowsData);
    this._attachTable();
  }

  /**
   * Remove all child nodes from table.
   */
  _emptyTable() {
    this._detachTable();

    while (this.statsTable.firstChild) {
      this.statsTable.firstChild.remove();
    }
  }

  /**
   * Detach the table from the DOM.  Makes for much faster manipulation.
   * 
   * May need to think about showing the loading icon here if it starts 
   * taking a long time to build the table when there's a ton of data, 
   * though I don't expect it will since everything is happening in JS.
   */
  _detachTable() {
    if (this.isAttached) {
      this.statsTableInnerContainer.removeChild(this.statsTable);
      this.isAttached = false;
    }
  }

  /**
   * Attach the table to the DOM.
   */
  _attachTable() {
    this.statsTableInnerContainer.appendChild(this.statsTable);
    this.isAttached = true;
  }

  /**
   * Attach initial elements to component root
   */
  _render() {
    this.statsTableInnerContainer.appendChild(this.loader.getElement());
    this.error.appendChild(this.errorTextNode);
    this.statsTableInnerContainer.appendChild(this.error);
  }

  /**
   * Returns the root element for this component.
   * 
   * @return {Object} StatsTable root
   */
  getElement() {
    return this.statsTableInnerContainer;
  }
}

export default StatsTable;
