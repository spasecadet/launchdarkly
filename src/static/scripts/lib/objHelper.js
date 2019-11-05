const objHelper = {
  /**
   * Compare equivalency of json objects.  This won't work well for other 
   * types of objects because it turns functions to null and doesn't do 
   * deep comparison, but it works well enough for exactly this purpose 
   * of comparing json objects.
   * 
   * @param {Object} obj1
   * @param {Object} obj2
   * @return {Boolean}
   */
  isJsonEqual: (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2),
};

export default objHelper;
