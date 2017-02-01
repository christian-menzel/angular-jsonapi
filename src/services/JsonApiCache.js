(function() {
  'use strict';
  angular.module('JsonApi')
    .factory('JsonApiCache', JsonApiCache);

  function JsonApiCache() {
    var _responsibilities = {};
    var _items = {};

    var service = {
      addItem: addItem,
      getItem: getItem,
      setResponsibility: setResponsibility,
      getResponsibility: getResponsibility
    };

    return service;

    /* public */

    function addItem(item) {
      var storedItem = getItem(item.type(), item.id());
      _items[item.type()][item.id()] = angular.extend(storedItem, item);
    }

    function getItem(type, id) {
      if (angular.isUndefined(_items)) {
        _items = {};
      }
      if (angular.isUndefined(_items[type])) {
        _items[type] = {};
      }
      if (angular.isUndefined(_items[type][id])) {
        _items[type][id] = {};
      }
      return _items[type][id];
    }

    function setResponsibility(item, repository) {
      if (angular.isUndefined(_responsibilities)) {
        _responsibilities = {};
      }
      if (angular.isUndefined(_responsibilities[item.type()])) {
        _responsibilities[item.type()] = {};
      }
      _responsibilities[item.type()][item.id()] = repository;
    }

    function getResponsibility(item) {
      if (angular.isUndefined(item)) {
        throw new Error('Missing Parameter', 'Required parameter item missing.');
      }
      if (!angular.isFunction(item.id)) {
        throw new Error('Missing required Method', 'Required Method item.id() is missing.');
      }
      if (!angular.isFunction(item.type)) {
        throw new Error('Missing required Method', 'Required Method item.type() is missing.');
      }
      if (angular.isUndefined(_responsibilities)) {
        return null;
      }
      if (angular.isUndefined(_responsibilities[item.type()])) {
        return null;
      }
      if (angular.isUndefined(_responsibilities[item.type()][item.id()])) {
        return null;
      }
      return _responsibilities[item.type()][item.id()];
    }
  }
}());
