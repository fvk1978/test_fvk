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
      create_task: create_task,
      get: get,
      update: update,
      partial_update: partial_update,
      destroy: destroy,
      add_user: add_user,
      remove_user: remove_user
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
    * @name create_task
    * @desc Create a new Task
    * @param {string} The content of the new Task
    * @returns {Promise}
    * @memberOf test_fvk.tasks.services.Tasks
    */
    function create_task(title) {
      return $http.post('/tasks/api/v1/tasks/', {
        title: title,
        summary: title,
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
      return $http.get('/tasks/api/v1/tasks/' + id + '/');
    }
    
    /**
     * @name update
     * @desc Update Tasks 
     * @param {string} id The id to update Task
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Tasks
     */
    function update(task) {
      return $http.put('/tasks/api/v1/tasks/' + task.id + '/', {
        title: task.title,
        summary: task.summary,
        status: task.status,
        index: task.index,
        end_date: task.end_date,
      });
    }
    
    /**
     * @name partial_update
     * @desc Update some fields in the Tasks 
     * @param {string} id The id to update Task
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Tasks
     */
    function partial_update(task, attr, data) {
        var out = {};
        out[attr] = data;
      return $http.patch('/tasks/api/v1/tasks/' + task.id + '/', out);
    }
    
    /**
     * @name add_user
     * @desc Update Tasks 
     * @param {string} id 
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Tasks
     */
    function add_user(task, user) {
      return $http.post('/tasks/api/v1/tasks/' + task.id + '/team/', user);
    }
    
    /**
     * @name remove_user
     * @desc Remove User from Task
     * @param {string} id 
     * @returns {Promise}
     * @memberOf test_fvk.tasks.services.Tasks
     */
    function remove_user(task, user) {
      return $http.post('/tasks/api/v1/tasks/' + task.id + '/remove_user/', user);
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
