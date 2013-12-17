/*global Backbone, _, $, moment, utils */
/*jshint expr:true */

;(function (window, document) {

  'use strict';

  /**
   * File model
   */
  var FileModel = Backbone.Model.extend({

    /**
     * Get a download url string
     * @returns {String} download url
     */
    getDownloadURL : function () {
      return 'download.html?id=' + this.id + '&name=' + encodeURIComponent(this.getFilename());
    },


    /**
     * Get file created date
     * @returns {String} created date
     */
    getDate : function () {
      return this.get('date');
    },


    /**
     * Get file size
     * @returns {Number} file size
     */
    getSize : function () {
      return this.get('size');
    },


    /**
     * Get file name
     * @returns {String} file name
     */
    getFilename : function () {
      return this.get('filename');
    }

  });


  /**
   * Files collection.
   * Define url and model type
   */
  var FilesCollection = Backbone.Collection.extend({
    url : '/api/files',
    model : FileModel
  });


  /**
   * Base view.
   * Plays the role of a container for files
   */
  var BaseView = Backbone.View.extend({
    el : '[data-view]'
  });


  /**
   * Files view
   */
  var FilesView = Backbone.View.extend({
    tagName : 'ul',
    className : 'files clear',

    /**
     * Listen to collection reset and render the view
     */
    initialize : function () {
      this.listenTo(this.collection, 'reset', this.render);
    },


    /**
     * Render the view.
     * Generate document fragment and replace the content of the current element with it
     * @returns {FilesView} current view instance
     */
    render : function () {
      this.$el.html(this.getFragment());
      return this;
    },


    /**
     * Generate a document fragment with all available files.
     * Go through the collection, render each file and append it to the document fragment
     * @returns {DocumentFragment} document fragment
     */
    getFragment : function () {
      var fragment = document.createDocumentFragment();
      this.collection.each(function (model) {
        fragment.appendChild(new FileView({model:model}).render().$el[0]);
      });
      return fragment;
    }

  });


  /**
   * Single file view
   */
  var FileView = Backbone.View.extend({
    tagName : 'li',
    className : 'file clear',
    template : $('[data-template="file"]').html(),


    /**
     * Render the view.
     * Compile the template with the proper data
     * @returns {FileView} current view instance
     */
    render : function () {
      this.$el.html(_.template(this.template)(this.serializeData()));
      return this;
    },


    /**
     * Generate the data that should be passed to the template
     * @returns {Object} template data
     */
    serializeData : function () {
      return _.extend(this.model.toJSON(), {
        date : moment(this.model.getDate()).format('YYYY-MM-DD HH:mm:ss'),
        size : utils.humanFileSize(this.model.getSize(), true),
        downloadUrl : this.model.getDownloadURL()
      });
    }

  });


  /**
   * Initialize application.
   * Create an instance of FilesCollection, BaseView, FilesView
   * Fetch collection data from the server.
   * Render files view and append it to the base view
   */
  var filesCollection = new FilesCollection();
  var baseView = new BaseView();
  var filesView = new FilesView({collection:filesCollection});
  filesCollection.fetch({reset:true});
  filesView.render().$el.appendTo(baseView.$el);

}(window, document));
