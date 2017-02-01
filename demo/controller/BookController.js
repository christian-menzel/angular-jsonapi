(function() {
  'use strict';
  angular.module('DemoApp')
    .controller('BookController', ['JsonApi', '$routeParams', '$location', BookController]);

  function BookController(JsonApi, $routeParams) {
    var vm = this;

    vm.book = null;

    activate();

    function activate() {
      var repository = JsonApi.repository('http://localhost:8080/books/' + $routeParams.id);
      repository.fetch({
        include: ['author', 'stores']
      }).then(function(book) {
        vm.book = book;
      });
    }
  }
}());
