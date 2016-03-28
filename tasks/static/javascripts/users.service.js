/**
* Users
* @namespace test_fvk.tasks.services
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.services')
    .factory('Users', Users);

  Users.$inject = ['$http'];

  /**
  * @namespace Users
  * @returns {Factory}
  */
  function Users($http) {
    var Users = {
      all: all,
      get: get,
    };
    

    return Users;

    ////////////////////

    /**
    * @name all
    * @desc Get all Users
    * @returns {Promise}
    * @memberOf test_fvk.tasks.services.Users
    */
    function all() {
      return $http.get('/tasks/api/v1/accounts/');
    }


    /**
     * @name get
     * @desc Get the Task
     * @param {string} username The username to get Users for
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Users
     */
    function get(id) {
      return $http.get('/tasks/api/v1/tasks/' + id + '/');
    }
    
  }
})();
