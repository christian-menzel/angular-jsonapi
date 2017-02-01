(function() {
  'use strict';
  angular.module('DemoApp')
    .controller('AuthorController', ['JsonApi', '$routeParams', '$location', AuthorController]);

  function AuthorController(JsonApi, $routeParams) {
    var vm = this;

    vm.author = null;

    activate();

    function activate() {
      var repository = JsonApi.repository('http://localhost:8080/authors/' + $routeParams.id);
      repository.fetch({
        include: ['books']
      }).then(function(author) {
        vm.author = author;
      });
    }
  }
}());
