/*global promise, tmpl */
/*jshint expr:true */

;(function (window, document) {

  'use strict';

  /**
   * Application utilities
   */
  window.utils = {

    /**
     * Get single element from the DOM
     * @param name {String} element selector
     * @returns {Node} element
     */
    $ : function (name) {
      return document.querySelector(name);
    },


    /**
     * Fetch JSON from the passed resource url
     * @param url {String} resource url
     * @returns {Promise}
     */
    getJSON : function (url) {
      var deferred = new promise.Promise();
      promise.get(url).then(function (error, response, xhr) {
        try {
          response = JSON.parse(response);
        }
        catch (e) {}
        deferred.done(error ? null : response);
      });
      return deferred;
    },


    /**
     * Convert passed number to the human-readable file size
     * @param bytes {Number} file size
     * @param si {Boolean} true for base 10, false for base 2
     * @returns {String} formatted file size
     */
    humanFileSize : function (bytes, si) {
      var thresh = si ? 1000 : 1024;
      if (bytes < thresh) {
        return bytes + ' B';
      }
      var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
      var u = -1;
      do {
        bytes /= thresh;
        ++u;
      } while (bytes >= thresh);
      return bytes.toFixed(1) + ' ' + units[u];
    },


    /**
     * Format passed date according to project format style
     * @param date {String|Number|Date} date to de formatted
     * @returns {String} formatted date
     */
    formatDate : function (date) {
      var d = new Date(date);
      var currentYear = d.getFullYear();
      var currentMonth = d.getMonth() + 1;
      var currentDate = d.getDate();
      var currentHour = d.getHours();
      var currentMinute = d.getMinutes();
      var currentSecond = d.getSeconds();
      var fix = function (val) {
        return (String(val).length === 1 ? '0' : '') + val;
      };
      return [currentYear, fix(currentMonth), fix(currentDate)].join('-') + ' ' +
        [fix(currentHour), fix(currentMinute), fix(currentSecond)].join(':');
    },


    /**
     * Escape bas HTML characters
     * @param string {String} string to escape
     * @returns {String} escaped string
     */
    escape : function (string) {
      var entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;',
        '/': '&#x2F;'
      };
      return String(string).replace(/[&<>"'\/]/g, function (s) {
        return entityMap[s];
      });
    },


    /**
     * Get template contents
     * @param name {String} template name
     * @returns {String} template contents
     */
    getTemplate : function (name) {
      var element = this.$('[data-template="' + name + '"]');
      return element ? element.innerHTML : '';
    },


    /**
     * Compile template
     * @param name {String} template name
     * @param [data] {Object} template data
     * @returns {String} compiled template
     */
    compileTemplate : function (name, data) {
      return tmpl(this.getTemplate(name), data || {});
    }

  };

}(window, document));
