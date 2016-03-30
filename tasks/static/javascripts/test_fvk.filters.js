/**
 * NewPostController
 * @namespace test_fvk.tasks.filters
 */
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.filters')
    .filter('orderObjectBy', function() {
    return function(items, field, reverse) {
        console.log(items, field, reverse);
        var filtered = [];
        angular.forEach(items, function(item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if(reverse) filtered.reverse();
        console.log(filtered);
        return filtered;
    };
    })

})();