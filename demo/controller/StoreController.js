(function() {
  'use strict';
  angular.module('DemoApp')
      .controller('StoreController', ['JsonApi', '$routeParams', StoreController]);

  function StoreController(JsonApi, $routeParams) {
    var vm = this;

    vm.book = null;

    activate();

    function activate() {
      var repository = JsonApi.repository('http://localhost:8080/stores/' + $routeParams.id);
      repository.fetch({
        include: ['books', 'books.author']
      }).then(function(store) {
        vm.store = store;
      });
    }
  }
}());
