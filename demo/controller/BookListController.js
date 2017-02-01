(function() {
  'use strict';
  angular.module('DemoApp')
    .controller('BookListController', ['JsonApi', BookListController]);

  function BookListController(JsonApi) {
    var vm = this;

    activate();

    function activate() {
      var repository = JsonApi.repository('http://localhost:8080/books');
      repository.fetch({
        include: ['author', 'stores']
      }).then(function(books) {
        vm.books = books;
      });
    }
  }
}());
