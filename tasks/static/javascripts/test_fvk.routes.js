(function () {
  'use strict';

  angular
    .module('test_fvk.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/tasks/create', {
      controller: 'AddTaskController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/create.html'
    })
    .when('/tasks', {
  controller: 'IndexController',
  controllerAs: 'vm',
  templateUrl: '/static/templates/index.html'
})
    .otherwise('/');
  }
})();