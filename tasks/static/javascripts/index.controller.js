/**
* IndexController
* @namespace test_fvk.tasks.controllers
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', '$timeout', 'Tasks', 'Users', 'Snackbar'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, $timeout, Tasks, Users, Snackbar, Pusher) {
    var vm = this;

    vm.tasks = [];

    activate();

    function arraysEqual(arr1, arr2) {
        if(arr1.length !== arr2.length)
            return false;
        for(var i = arr1.length; i--;) {
            if(arr1[i].id !== arr2[i].id)
                return false;
            if(arr1[i].modified !== arr2[i].modified)
                return false;
        }
        return true;
    }
    
    function arrayObjectIndexOf(arr, obj){
        for(var i = 0; i < arr.length; i++){
            if(angular.equals(arr[i], obj)){
                return i;
            }
            if(arr[i].id == obj.id){
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
          if (arrayObjectIndexOf(data.task.team, data.user) == -1) {
            data.task.team.unshift(data.user);
          }
//           Tasks.all().then(tasksSuccessFn, tasksErrorFn);
          // FixMe: have to remove that refresh
         Users.all().then(usersSuccessFn, userssErrorFn);
      });

      $scope.$on('user.removed', function (event, data) {
        var index = arrayObjectIndexOf(data.task.team, data.user);
        data.task.team.splice(index, 1);
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
        if (!(typeof vm.tasks !== "undefined" && vm.tasks.length > 0 && arraysEqual(vm.tasks, data.data))) {
            vm.tasks = data.data;
            console.log("vm.tasks updated", vm.tasks);
        }
//         $timeout(activate, 1000);
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