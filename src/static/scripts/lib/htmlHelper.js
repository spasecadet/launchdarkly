// htmlHelper removes some of the tedium of creating elements in JS.  I definitely 
// see how you get from where this is to pretty quickly wanting something like JSX.

// Multiple classes can be provided as a space separated string.

const htmlHelper = {
  /**
   * Creates a text node with provided text.
   * 
   * @param {String} text
   * @return {Object} text node
   */
  createTextNode: (text) => {
    return document.createTextNode(text);
  },

  /**
   * Creates a span and sets a class on the span.  Creates and appends a text 
   * node with provided text.
   * 
   * eg:
   * createSpanWithTextAndClass('Some Text', 'left');
   * produces
   * <span class="left">Some Text</span>
   *
   * @param {String} text
   * @param {String} className
   * @return {Object} span element
   */
  createSpanWithTextAndClass: (text, className = '') => {
    const el = document.createElement('span');
    el.className = className;
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
    return el;
  },

  /**
   * Creates a div and sets a class on the div.
   * 
   * eg:
   * createDivWithClass('left');
   * produces
   * <div class="left"></div>
   * 
   * @param {String} className
   * @return {Object} div element
   */
  createDivWithClass: (className = '') => {
    const el = document.createElement('div');
    el.setAttribute('class', className);
    return el;
  },

  /**
   * Creates a div and sets a class on the div. Creates and appends a text
   * node with provided text.
   * 
   * eg: 
   * createDivWithTextAndClass('Floopy Noopers', 'rm');
   * produces
   * <div class="rm">Floopy Noopers</div>
   * 
   * @param {String} text
   * @param {String} className
   * @return {Object} div element
   */
  createDivWithTextAndClass: (text, className = '') => {
    const el = document.createElement('div');
    el.className = className;
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
    return el;
  },

  /**
   * Create an icon and set a class on it.  To make it an icon it needs the 
   * class 'material-icons'.  The text set in the text node determines 
   * which icon will be shown.  
   * 
   * eg: 
   * createIconWithClass('face', 'large');
   * produces
   * <i class="large">face</i>
   * 
   * @param {String} iconName
   * @param {String} className
   * @return {Object} i element
   */
  createIconWithClass: (iconName, className = '') => {
    const el = document.createElement('i');
    el.className = 'material-icons ' + className;
    const textNode = document.createTextNode(iconName);
    el.appendChild(textNode);
    return el;
  },

  /**
   * Creates a button and sets a class on the button.
   *
   * eg:
   * createButtonWithClass('large');
   * produces
   * <button class="large"></button>
   *
   * @param {String} className
   * @return {Object} button element
   */
  createButtonWithClass: (className = '') => {
    const el = document.createElement('button');
    el.setAttribute('class', className);
    return el;
  },

  /**
   * Creates a title and sets a class on the title.
   *
   * eg:
   * createTitleWithClass('large');
   * produces
   * <h1 class="large"></h1>
   *
   * @param {String} className
   * @return {Object} button element
   */
  createTitleWithClass: (className = '') => {
    const el = document.createElement('h1');
    el.className = className;
    return el;
  },

  /**
   * Creates a ul and sets a class on the ul.
   *
   * eg:
   * createListWithClass('large');
   * produces
   * <ul class="large"></ul>
   *
   * @param {String} className
   * @return {Object} ul element
   */
  createListWithClass: (className = '') => {
    const el = document.createElement('ul');
    el.className = className;
    return el;
  },

  /**
   * Creates an li and sets a class on the li.
   *
   * eg:
   * createListItemWithClass('small');
   * produces
   * <li class="small"></li>
   *
   * @param {String} className
   * @return {Object} li element
   */
  createListItemWithClass: (className = '') => {
    const el = document.createElement('li');
    el.className = className;
    return el;
  },

  /**
   * Creates a paragraph and sets a class on the p.
   *
   * eg:
   * createParagraphWithClass('small');
   * produces
   * <p class="small"></p>
   *
   * @param {String} className
   * @return {Object} p element
   */
  createParagraphWithClass: (className = '') => {
    const el = document.createElement('p');
    el.className = className;
    return el;
  },

  /**
   * Creates a link and sets a class on the <a>.  Attaches the provided href 
   * and click listener to the link.
   *
   * eg:
   * createLinkWithClassAndListener('/exams', 'small', listener);
   * produces
   * <a class="small" href="/exams"></a>
   *
   * note: the onclick property won't be visible by looking at the html for this element.
   *
   * @param {String} href
   * @param {String} className
   * @param {Function} listener
   * @return {Object} link element
   */
  createLinkWithClassAndListener: (href, className, listener) => {
    const el = document.createElement('a');
    el.className = className;
    el.href = href;
    el.onclick = listener;
    return el;
  },
};

export default htmlHelper;
