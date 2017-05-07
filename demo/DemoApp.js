(function() {
  'use strict';
  angular.module('DemoApp', ['ngRoute', 'JsonApi'])
    .config(config);

  function config($routeProvider) {
    $routeProvider
      .when('/books', {
        template: '<book-list books="$resolve.books"></book-list>',
        resolve: {
            books: function(JsonApi) {
              return JsonApi.repository('http://localhost:8080/books')
                .get({
                  include: ['author', 'stores']
                });
            }
        }
      }).when('/authors', {
        template: '<author-list authors="$resolve.authors"></author-list>',
        resolve: {
          authors: function(JsonApi) {
            return JsonApi.repository('http://localhost:8080/authors')
              .get();
          }
        }
      }).when('/stores', {
        template: '<store-list stores="$resolve.stores"></store-list>',
        resolve: {
          stores: function(JsonApi) {
            return JsonApi.repository('http://localhost:8080/stores')
              .get();
          }
        }
      }).when('/books/:id', {
        template: '<book book="$resolve.book"></book>',
        resolve: {
          book: function(JsonApi, $route) {
            return JsonApi.repository('http://localhost:8080/books/' + $route.current.params.id)
              .get({
                include: ['author', 'stores']
              });
          }
        }
      }).when('/authors/:id', {
        template: '<author author="$resolve.author"></author>',
        resolve: {
          author: function(JsonApi, $route) {
            return JsonApi.repository('http://localhost:8080/authors/' + $route.current.params.id)
              .get({
                include: ['books']
              });
          }
        }
      }).when('/stores/:id', {
        templateUrl: 'partials/store.html',
        controller: 'StoreController',
        controllerAs: 'vm'
      }).otherwise({redirectTo: '/books'});
  }
}());
