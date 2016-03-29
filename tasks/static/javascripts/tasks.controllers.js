/**
* TasksController
* @namespace test_fvk.tasks.controllers
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$location', '$rootScope', '$scope', 'Snackbar', 'Tasks', 'ngDialog'];

  /**
  * @namespace TasksController
  */
  function TasksController($location, $rootScope, $scope, Snackbar, Tasks, ngDialog) {
    var vm = this;

    vm.destroy = destroy;
    vm.update = update;
    $scope.partial_update = partial_update;
    $scope.statuses = [
                                    {value: 'open', text: 'open'},
                                    {value: 'done', text: 'done'},
                                ]; 
    
    $scope.opened = {};

    $scope.open = function($event, elementOpened) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened[elementOpened] = !$scope.opened[elementOpened];
    };

    vm.remove_user = remove_user;
    
    vm.columns = [];

    activate();

    
      $scope.startCallback = function(event, ui, user, index) {
          $rootScope.dragged_user = user;
        };
        $scope.dropCallback = function(event, ui, item) {
          add_user($rootScope.target_task, $rootScope.dragged_user);
        };
        $scope.overCallback = function(event, ui, task) {
            $rootScope.target_task = task;
        };
        
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
          return element.summary.length;
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
      if (current && current.length && current !== original) {
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
    function update(task) {

        $scope.task = task;
        ngDialog.openConfirm({            
            templateUrl: '/static/templates/edit_task.html',
            scope: $scope           
        }).then(function(value){
            save(value);
        },function(reject){
            Snackbar.error(reject);
         });           
  
    }
    
        /**
     * @name partial_update
     * @desc Update some task's field task
     * @memberOf test_fvk.controllers.TaskController
     */
    function partial_update(task, attr, data) {
      $rootScope.$broadcast('task.updated', {
        task: task,
      });        
      Tasks.partial_update(task, attr, data).then(taskSuccessFn, taskErrorFn);

      /**
       * @name taskSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function taskSuccessFn(data, status, headers, config) {
        Snackbar.show('Your task has been updated.');
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
     * @name save
     * @desc Save edited task
     * @memberOf test_fvk.controllers.TaskController
     */
    function save(task) {
      $rootScope.$broadcast('task.saved', {
        task: task,
      });        
      Tasks.update(task).then(taskSuccessFn, taskErrorFn);

      /**
       * @name taskSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function taskSuccessFn(data, status, headers, config) {
        Snackbar.show('Your task has been saved.');
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
     * @name add_user
     * @desc Add user to task
     * @memberOf test_fvk.controllers.TaskController
     */
    function add_user(task, user) {
      Tasks.add_user(task, user).then(taskSuccessFn, taskErrorFn);

      /**
       * @name taskSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function taskSuccessFn(data, status, headers, config) {
        Snackbar.show('User has been saved.');
        $rootScope.$broadcast('user.added', {
            task: task,
            user: user,
        });        
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
     * @name remove_user
     * @desc Remove user from task
     * @memberOf test_fvk.controllers.TaskController
     */
    function remove_user(task, user) {
      Tasks.remove_user(task, user).then(taskSuccessFn, taskErrorFn);

      /**
       * @name taskSuccessFn
       * @desc Redirect to index and display success snackbar
       */
      function taskSuccessFn(data, status, headers, config) {
        Snackbar.show('User has been removed.');
        $rootScope.$broadcast('user.removed', {
            task: task,
            user: user,
        });        
      }


      /**
       * @name taskErrorFn
       * @desc Display error snackbar
       */
      function taskErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }

    
    
    
  }
})();