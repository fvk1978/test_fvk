/**
* Tasks
* @namespace test_fvk.tasks.directives
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.directives')
    .directive('tasks', tasks);

  /**
  * @namespace Tasks
  */
     
  function tasks() {
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
        tasks: '='
      },
      templateUrl: '/static/templates/tasks.html'
    };

    return directive;
  }
})();