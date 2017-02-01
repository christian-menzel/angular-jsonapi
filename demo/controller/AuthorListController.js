(function() {
  'use strict';
  angular.module('DemoApp')
    .controller('AuthorListController', ['JsonApi', AuthorListController]);

  function AuthorListController(JsonApi) {
    var vm = this;

    activate();

    function activate() {
      var repository = JsonApi.repository('http://localhost:8080/authors');
      repository.fetch().then(function(authors) {
        vm.authors = authors;
      });
    }
  }
}());
