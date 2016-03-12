/**
* Tasks
* @namespace test_fvk.tasks.services
*/
(function () {
  'use strict';

  angular
    .module('test_fvk.tasks.services')
    .factory('Tasks', Tasks);

  Tasks.$inject = ['$http'];

  /**
  * @namespace Tasks
  * @returns {Factory}
  */
  function Tasks($http) {
    var Tasks = {
      all: all,
      create: create,
      get: get,
      update: update,
      destroy: destroy
    };
    

    return Tasks;

    ////////////////////

    /**
    * @name all
    * @desc Get all Tasks
    * @returns {Promise}
    * @memberOf test_fvk.tasks.services.Tasks
    */
    function all() {
      return $http.get('/tasks/api/v1/tasks/');
    }


    /**
    * @name create
    * @desc Create a new Task
    * @param {string} The content of the new Task
    * @returns {Promise}
    * @memberOf test_fvk.tasks.services.Tasks
    */
    function create(title, summary, end_date) {
      return $http.post('/tasks/api/v1/tasks/', {
        title: title,
        summary: summary,
        end_date: end_date,
      });
    }

    /**
     * @name get
     * @desc Get the Task
     * @param {string} username The username to get Tasks for
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Tasks
     */
    function get(id) {
      return $http.get('/tasks/api/v1/tasks/' + id);
    }
    
    /**
     * @name update
     * @desc Update Tasks 
     * @param {string} id The id to update Task
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Tasks
     */
    function update(id, title, summary, end_date) {
      return $http.put('/tasks/api/v1/tasks/' + id + '/', {
        title: title,
        summary: summary,
        end_date: end_date,
      });
    }
    
    /**
     * @name destroy
     * @desc Delete Tasks 
     * @param {string} id The id to get Task
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Tasks
     */
    function destroy(task) {
      return $http.delete('/tasks/api/v1/tasks/' + task.id + '/');
    }
  }
})();
