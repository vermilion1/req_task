;(function (window) {

  'use strict';

  /**
   * Application utilities
   */
  window.utils = {

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
    }

  };

}(window));
