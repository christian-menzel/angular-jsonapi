(function() {
  'use strict';
  angular.module('DemoApp', ['ngRoute', 'JsonApi'])
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/books', {
        templateUrl: 'partials/books.html',
        controller: 'BookListController',
        controllerAs: 'vm'
      }).when('/authors', {
        templateUrl: 'partials/authors.html',
        controller: 'AuthorListController',
        controllerAs: 'vm'
      }).when('/stores', {
        templateUrl: 'partials/stores.html',
        controller: 'StoreListController',
        controllerAs: 'vm'
      }).when('/books/:id', {
        templateUrl: 'partials/book.html',
        controller: 'BookController',
        controllerAs: 'vm'
      }).when('/authors/:id', {
        templateUrl: 'partials/author.html',
        controller: 'AuthorController',
        controllerAs: 'vm'
      }).when('/stores/:id', {
        templateUrl: 'partials/store.html',
        controller: 'StoreController',
        controllerAs: 'vm'
      }).otherwise({redirectTo: '/books'});
  }
}());
