/**
* Tasks
* @namespace test_fvk.tasks.directives
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.directives')
    .directive('users', users);

  /**
  * @namespace Tasks
  */
     
  function users() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf test_fvk.tasks.directives.Tasks
    */
    
    var directive = {
      controller: 'TasksController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        users: '=',
        task: '='
      },
      templateUrl: '/static/templates/users.html'
    };

    return directive;
  }
})();