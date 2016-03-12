(function () {
  'use strict';

  angular
    .module('test_fvk', [
    'test_fvk.config',
    'test_fvk.routes',
    'test_fvk.tasks',
    'test_fvk.utils',
    ]);

  angular
    .module('test_fvk.routes', ['ngRoute']);
    
  angular
    .module('test_fvk.config', []);
    
    angular
  .module('test_fvk')
  .run(run);

run.$inject = ['$http'];

/**
* @name run
* @desc Update xsrf $http headers to align with Django's defaults
*/
function run($http) {
  $http.defaults.xsrfHeaderName = 'X-CSRFToken';
  $http.defaults.xsrfCookieName = 'csrftoken';
}

})();