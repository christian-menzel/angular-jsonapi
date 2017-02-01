(function() {
  'use strict';
  angular.module('DemoApp')
    .controller('MainController', ['$location', MainController]);

  function MainController($location) {
    var vm = this;

    vm.showBookList = showBookList;
    vm.showAuthorList = showAuthorList;
    vm.showStoreList = showStoreList;
    vm.showBook = showBook;
    vm.showAuthor = showAuthor;
    vm.showStore = showStore;

    /* public */

    function showBookList() {
      $location.path('/books');
    }

    function showAuthorList() {
      $location.path('/authors');
    }

    function showStoreList() {
      $location.path('/stores');
    }

    function showAuthor(author) {
      $location.path('/authors/' + author.id());
    }

    function showBook(book) {
      $location.path('/books/' + book.id());
    }

    function showStore(store) {
      $location.path('/stores/' + store.id());
    }
  }
}());
