(function() {
  'use strict';
  angular.module('DemoApp')
    .component('book', {
      templateUrl: 'partials/book.html',
      bindings: {
        book: '<'
      }
    });
}());
