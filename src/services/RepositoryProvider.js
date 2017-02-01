(function() {
  'use strict';
  angular.module('JsonApi')
    .factory('RepositoryProvider', ['$http', 'JsonApiCache', 'ItemProvider', RepositoryProvider]);

  function RepositoryProvider($http, JsonApiCache, ItemProvider) {
    var provider = {
      create: create
    };
    return provider;

    function create(path) {
      var _path = path;

      var repository = {
        fetch: fetch
      };

      activate(path);

      return repository;

      function activate() {
        _path = path;
      }

      /* public */

      function fetch(options) {
        return _findResource(_path, options).then(function(resource) {
          return _parse(resource);
        });
      }

      /* private */

      function _findResource(resourceUri, options) {
        var opt = angular.extend({}, options);
        var params = {};
        if (angular.isDefined(opt.include)) {
          params.include = opt.include.join(',');
        }
        return $http.get(resourceUri, {
          params: params
        }).then(function(response) {
          return response.data;
        });
      }

      function _parse(resource) {
        _parseIncluded(resource.included);
        if (angular.isArray(resource.data)) {
          return _parseCollection(resource.data);
        }
        return _parseItem(resource.data);
      }

      function _parseIncluded(resources) {
        angular.forEach(resources, function(resource) {
          _parseItem(resource);
        });
      }

      function _parseItem(resource) {
        var item = ItemProvider.create(resource);
        JsonApiCache.setResponsibility(item, resource);
        JsonApiCache.addItem(item);
        return item;
      }

      function _parseCollection(resources) {
        var collection = [];
        angular.forEach(resources, function(resource) {
          collection.push(_parseItem(resource));
        });
        return collection;
      }
    }
  }
}());
