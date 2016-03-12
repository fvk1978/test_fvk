/**
* Task
* @namespace test_fvk.tasks.directives
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.directives')
    .directive('task', task);

  /**
  * @namespace Task
  */
  function task() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf test_fvk.tasks.directives.Task
    */
    var directive = {
      controller: 'TasksController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        task: '='
      },
      templateUrl: '/static/templates/task.html'
    };

    return directive;
  }
})();