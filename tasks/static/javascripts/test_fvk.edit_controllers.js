/**
 * NewPostController
 * @namespace test_fvk.tasks.controllers
 */
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('EditTaskController', EditTaskController);

  EditTaskController.$inject = ['$location', '$rootScope', '$scope', 'Snackbar', 'Tasks'];

  /**
   * @namespace EditTaskController
   */
  function EditTaskController($location, $rootScope, $scope, Snackbar, Tasks) {
    var vm = this;
    
    $scope.init = function(task)
    {
    //This function is sort of private constructor for controller
    vm.id = task.id;
    vm.title = task.title; 
    vm.summary = task.summary; 
    vm.end_date = task.end_date; 
    console.log(vm);
    //Based on passed argument you can make a call to resource
    //and initialize more objects
    //$resource.getMeBond(007)
    };

    console.log(vm);
    vm.edit = edit;

    /**
     * @name create
     * @desc Create a new Task
     * @memberOf test_fvk.tasks.controllers.EditTaskController
     */
    function edit() {
      $rootScope.$broadcast('task.edited', {
        title: vm.title,
        summary: vm.summary,
        end_date: vm.end_date,
//         author: {
//           username: Authentication.getAuthenticatedAccount().username
//         }
      });

      $scope.closeThisDialog();
      console.log(vm)

      Tasks.update(vm.title, vm.summary, vm.end_date).then(editTaskSuccessFn, editTaskErrorFn);


      /**
       * @name editTaskSuccessFn
       * @desc Show snackbar with success message
       */
      function editTaskSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! Task edited.');
      }

      
      /**
       * @name editTaskErrorFn
       * @desc Propogate error event and show snackbar with error message
       */
      function editTaskErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('task.edit.error');
        Snackbar.error(data.error);
      }
    }
  }
})();