const nav = {
  /**
   * Prevents a link click from going to another page.  Pushes the new url 
   * into the history and calls the provided callback with the new path.
   * 
   * note: Because this project is of limited scope I didn't try to over 
   * engineer this mini SPA, but if there were going to be other pages 
   * with different kinds of content I'd definitely need to add in some 
   * real routing, and then probably make links their own component.
   * 
   * @param {Event} e
   * @param {Function} cb
   */
  linkHandler: (e, cb) => {
    e.preventDefault();
    const path = e.currentTarget.getAttribute('href');
    history.pushState(null, null, path);
    cb(path);
    e.stopPropagation();
  },
};

export default nav;