(function () {
  'use strict';

  angular
    .module('test_fvk.tasks', [
      'test_fvk.tasks.controllers',
      'test_fvk.tasks.directives',
      'test_fvk.tasks.services'
    ]);

  angular
    .module('test_fvk.tasks.controllers', []);

  angular
    .module('test_fvk.tasks.directives', ['ngDialog', 'ngAnimate', 'ngDragDrop']);

  angular
    .module('test_fvk.tasks.services', []);
})();