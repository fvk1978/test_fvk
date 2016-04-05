(function () {
  'use strict';

  angular
    .module('test_fvk.tasks', [
      'test_fvk.tasks.controllers',
      'test_fvk.tasks.directives',
      'test_fvk.tasks.services',
      'test_fvk.tasks.filters'
    ]);

  angular
    .module('test_fvk.tasks.controllers', ["xeditable", "ui.bootstrap"]);

  angular
    .module('test_fvk.tasks.directives', ['ngDialog', 'ngAnimate', 'ngDragDrop', 'dndLists']);

  angular
    .module('test_fvk.tasks.services', []);
    
  angular
    .module('test_fvk.tasks.filters', []);
})();