/**
* IndexController
* @namespace test_fvk.tasks.controllers
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Tasks', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Tasks, Snackbar) {
    var vm = this;

    vm.tasks = [];

    activate();

    function arrayObjectIndexOf(arr, obj){
        for(var i = 0; i < arr.length; i++){
            if(angular.equals(arr[i], obj)){
                return i;
            }
            if(arr.id == obj.id){
                return i;
            }
        };
        return -1;
    }    
    
    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf test_fvk.controllers.IndexController
    */
    function activate() {
      Tasks.all().then(tasksSuccessFn, tasksErrorFn);

      $scope.$on('task.created', function (event, task) {
        vm.tasks.unshift(task);
      });

      $scope.$on('task.created.error', function () {
        vm.tasks.shift();
      });

      $scope.$on('task.deleted', function (event, task) {
        var index = arrayObjectIndexOf(vm.tasks, task);
        vm.tasks.splice(index, 1);
      });


      /**
      * @name tasksSuccessFn
      * @desc Update tasks array on view
      */
      function tasksSuccessFn(data, status, headers, config) {
        vm.tasks = data.data;
      }


      /**
      * @name tasksErrorFn
      * @desc Show snackbar with error
      */
      function tasksErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();