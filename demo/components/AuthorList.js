(function() {
  'use strict';
  angular.module('DemoApp')
    .component('authorList', {
      templateUrl: 'partials/authors.html',
      bindings: {
        authors: '<'
      }
    });
}());
