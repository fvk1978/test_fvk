/**
* IndexController
* @namespace test_fvk.tasks.controllers
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Tasks', 'Users', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Tasks, Users, Snackbar) {
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

      $scope.$on('user.added', function (event, data) {
          data.task.team.unshift(data.user);
//           Tasks.all().then(tasksSuccessFn, tasksErrorFn);
          // FixMe: have to remove that refresh
         Users.all().then(usersSuccessFn, userssErrorFn);
      });

      $scope.$on('user.removed', function (event, data) {
        var index = arrayObjectIndexOf(data.task.team, data.user);
        data.task.team.splice(index, 1);
//         Tasks.all().then(tasksSuccessFn, tasksErrorFn);
//         Users.all().then(usersSuccessFn, userssErrorFn);
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
      
      Users.all().then(usersSuccessFn, userssErrorFn);
      /**
      * @name usersSuccessFn
      * @desc Update users array on view
      */
      function usersSuccessFn(data, status, headers, config) {
        vm.users = data.data;
      }


      /**
      * @name userssErrorFn
      * @desc Show snackbar with error
      */
      function userssErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();