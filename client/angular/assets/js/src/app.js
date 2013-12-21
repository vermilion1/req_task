;(function () {

  'use strict';

  angular
    .module('testTask', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'views/files.html',
        controller: 'FilesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    }]);

  angular
    .module('testTask')
    .controller('FilesCtrl', ['$scope', '$http', function ($scope, $http) {
      $scope.files = [];
      $scope.makeUrl = function (file) {
        return 'download.html?id=' + file.id + '&name=' + encodeURIComponent(file.filename);
      };

      $http.get('/api/files').then(function(result) {
        return $scope.files = result.data;
      });
    }]);

  angular
    .module('testTask')
    .filter('size', function() {
      return function(bytes, si) {
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
      };
    });

}());
