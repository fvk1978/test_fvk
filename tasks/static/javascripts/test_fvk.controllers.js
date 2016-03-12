/**
 * NewPostController
 * @namespace test_fvk.tasks.controllers
 */
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('AddTaskController', AddTaskController);

  AddTaskController.$inject = ['$location', '$rootScope', '$scope', 'Snackbar', 'Tasks'];

  /**
   * @namespace AddTaskController
   */
  function AddTaskController($location, $rootScope, $scope, Snackbar, Tasks) {
    var vm = this;

    vm.create = create;

    /**
     * @name create
     * @desc Create a new Task
     * @memberOf test_fvk.tasks.controllers.AddTaskController
     */
    function create() {
      $rootScope.$broadcast('task.created', {
        title: vm.title,
        summary: vm.summary,
        end_date: vm.end_date,
//         author: {
//           username: Authentication.getAuthenticatedAccount().username
//         }
      });

      $scope.closeThisDialog();

      Tasks.create(vm.title, vm.summary, vm.end_date).then(addTaskSuccessFn, addTaskErrorFn);


      /**
       * @name addTaskSuccessFn
       * @desc Show snackbar with success message
       */
      function addTaskSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Task created.');
      }

      
      /**
       * @name addTaskErrorFn
       * @desc Propogate error event and show snackbar with error message
       */
      function addTaskErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('task.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();