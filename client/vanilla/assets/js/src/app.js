/*global utils */
/*jshint expr:true */

;(function (window, document) {

  'use strict';

  /**
   * Files list constructor.
   * Cache the parent element
   * @constructor
   */
  var Files = function () {
    this.$files = null;
    this.$parent = utils.$('[data-view]');
  };


  Files.prototype = {

    /**
     * Start fetching data.
     * Render the view when request will be done
     */
    start : function () {
      this.fetch().then(this.render.bind(this));
    },


    /**
     * Remove current element if it is already exists.
     */
    checkEl : function () {
      this.$files && this.remove();
    },


    /**
     * Create and cache an element
     * @param [html] {String} contents of the element
     * @returns {HTMLElement} generated element
     */
    createEl : function (html) {
      var $files = this.$files = document.createElement('ul');
      $files.className = 'files clear';
      $files.innerHTML = html || '';
      return $files;
    },


    /**
     * Get current view template.
     * Concatenate and return the template of each file
     * @param files {Array} list of files that should be added to the template
     * @returns {String} generated template
     */
    getTemplate : function (files) {
      return files.map(this.getFileTemplate).join('');
    },


    /**
     * Get file template
     * @param file {Object} file data
     * @returns {String} generated template
     */
    getFileTemplate : function (file) {
      return utils.compileTemplate('file', {
        id : file.id,
        filename : utils.escape(file.filename),
        date : utils.formatDate(file.date),
        size : utils.humanFileSize(file.size, true),
        downloadUrl : 'download.html?id=' + file.id + '&name=' + encodeURIComponent(file.filename)
      });
    },


    /**
     * Append passed element to the parent element
     * @param $el {HTMLElement} element that should be added
     */
    append : function ($el) {
      this.$parent.appendChild($el);
    },


    /**
     * Remove the view
     */
    remove : function () {
      this.$files.parentNode().removeChild(this.$files);
    },


    /**
     * Render the view.
     * Check the element.
     * Generate and append a new element
     * @param files
     */
    render : function (files) {
      this.checkEl();
      this.append(this.createEl(this.getTemplate(files)));
    },


    /**
     * Fetch data from the server
     * @returns {Promise}
     */
    fetch : function () {
      return utils.getJSON('/api/files');
    }

  };


  /**
   * Create new instance of files and show it
   */
  new Files().start();

}(window, document));
