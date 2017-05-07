(function() {
  'use strict';
  angular.module('DemoApp')
    .component('mainApp', {
        templateUrl: 'partials/app.html',
        controller: Main
  });

  function Main($location) {
    this.showBookList = function() {
      $location.path('/books');
    };

    this.showAuthorList = function() {
      $location.path('/authors');
    };

    this.showStoreList = function() {
      $location.path('/stores');
    };

    this.showStore = function(store) {
      $location.path('/stores/' + store.id());
    };
  }
}());
