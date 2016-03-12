/**
* TasksController
* @namespace test_fvk.tasks.controllers
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$location', '$rootScope', '$scope', 'Snackbar', 'Tasks'];

  /**
  * @namespace TasksController
  */
  function TasksController($location, $rootScope, $scope, Snackbar, Tasks) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;
    
    vm.columns = [];

    activate();
    


    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf test_fvk.tasks.controllers.TasksController
    */
    function activate() {
      $scope.$watchCollection(function () { return $scope.tasks; }, render);
      $scope.$watch(function () { return $(window).width(); }, render);
    }


    /**
    * @name calculateNumberOfColumns
    * @desc Calculate number of columns based on screen width
    * @returns {Number} The number of columns containing Tasks
    * @memberOf test_fvk.tasks.controllers.TasksControllers
    */
    function calculateNumberOfColumns() {
      var width = $(window).width();
      
      if (width >= 1200) {
        return 4;
      } else if (width >= 992) {
        return 3;
      } else if (width >= 768) {
        return 2;
      } else {
        return 1;
      }
    }


    /**
    * @name approximateShortestColumn
    * @desc An algorithm for approximating which column is shortest
    * @returns The index of the shortest column
    * @memberOf test_fvk.tasks.controllers.TasksController
    */
    function approximateShortestColumn() {
      var scores = vm.columns.map(columnMapFn);

      return scores.indexOf(Math.min.apply(this, scores));


      /**
      * @name columnMapFn
      * @desc A map function for scoring column heights
      * @returns The approximately normalized height of a given column
      */
      function columnMapFn(column) {
        var lengths = column.map(function (element) {
          return element.summary.length * 3;
        });

        return lengths.reduce(sum, 0) * column.length;
      }


      /**
      * @name sum
      * @desc Sums two numbers
      * @params {Number} m The first number to be summed
      * @params {Number} n The second number to be summed
      * @returns The sum of two numbers
      */
      function sum(m, n) {
        return m + n;
      }
    }


    /**
    * @name render
    * @desc Renders Tasks into columns of approximately equal height
    * @param {Array} current The current value of `vm.tasks`
    * @param {Array} original The value of `vm.tasks` before it was updated
    * @memberOf test_fvk.tasks.controllers.TasksController
    */
    function render(current, original) {
      if (current !== original) {
        vm.columns = [];

        for (var i = 0; i < calculateNumberOfColumns(); ++i) {
          vm.columns.push([]);
        }

        for (var i = 0; i < current.length; ++i) {
          var column = approximateShortestColumn();

          vm.columns[column].push(current[i]);
        }
      }
    }
    
        /**
     * @name destroy
     * @desc Destroy this task
     * @memberOf test_fvk.controllers.TaskController
     */
    function destroy(task) {
      $rootScope.$broadcast('task.deleted', {
        task: task,
//         author: {
//           username: Authentication.getAuthenticatedAccount().username
//         }
      });        
      Tasks.destroy(task).then(taskSuccessFn, taskErrorFn);

      /**
       * @name taskSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function taskSuccessFn(data, status, headers, config) {
        Snackbar.show('Your task has been deleted.');
      }


      /**
       * @name taskErrorFn
       * @desc Display error snackbar
       */
      function taskErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }


    /**
     * @name update
     * @desc Update this task
     * @memberOf test_fvk.controllers.TaskController
     */
    function update() {
      var username = $routeParams.username.substr(1);

      Task.update(username, vm.account).then(taskSuccessFn, taskErrorFn);

      /**
       * @name taskSuccessFn
       * @desc Show success snackbar
       */
      function taskSuccessFn(data, status, headers, config) {
        Snackbar.show('Your task has been updated.');
      }


      /**
       * @name taskErrorFn
       * @desc Show error snackbar
       */
      function taskErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  
  
  }
})();