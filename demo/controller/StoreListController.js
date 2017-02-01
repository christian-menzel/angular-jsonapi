(function() {
  'use strict';
  angular.module('DemoApp')
    .controller('StoreListController', ['JsonApi', StoreListController]);

  function StoreListController(JsonApi) {
    var vm = this;

    activate();

    function activate() {
      var repository = JsonApi.repository('http://localhost:8080/stores');
      repository.fetch()
        .then(function(stores) {
          vm.stores = stores;
        });
    }
  }
}());
