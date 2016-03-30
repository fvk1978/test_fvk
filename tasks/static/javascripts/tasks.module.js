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
    .module('test_fvk.tasks.controllers', ["xeditable", "ui.bootstrap", 'doowb.angular-pusher']).
    config(['PusherServiceProvider',
        function(PusherServiceProvider) {
            PusherServiceProvider
            .setToken('your_app_key')
            .setOptions({});
        }
    ]);

  angular
    .module('test_fvk.tasks.directives', ['ngDialog', 'ngAnimate', 'ngDragDrop', 'dndLists']);

  angular
    .module('test_fvk.tasks.services', []);
    
  angular
    .module('test_fvk.tasks.filters', []);
})();