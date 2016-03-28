/**
* DnDController
* @namespace test_fvk.tasks.controllers
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.controllers')
    .controller('DnDController', DnDController);

  DnDController.$inject = ['$location', '$rootScope', '$scope', 'Snackbar', 'Tasks', 'ngDialog', '$animate', '$timeout'];

  /**
  * @namespace DnDController
  */
  function DnDController($location, $rootScope, $scope, Snackbar, Tasks, ngDialog, $animate, $timeout) {

//       console.log('You started draggin: ', $scope);
      $scope.startCallback = function(event, ui, task) {
          console.log('You started draggin: ' + task);
          $scope.draggedTitle = task;
        };
      $scope.dragCallback = function(event, ui, task) {
          console.log('You started draggin: ' + task);
          $scope.draggedTitle = task;
        };
  }


})();
