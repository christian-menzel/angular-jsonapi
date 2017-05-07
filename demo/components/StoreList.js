(function() {
  'use strict';
  angular.module('DemoApp')
    .component('storeList', {
        templateUrl: 'partials/stores.html',
        bindings: {
            stores: '<'
        }
    });
}());
