(function() {
  'use strict';
  angular.module('DemoApp')
    .component('author', {
      templateUrl: 'partials/author.html',
      bindings: {
        author: '<'
      }
    });
}());
