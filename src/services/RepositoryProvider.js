(function() {
  'use strict';
  angular.module('JsonApi')
    .factory('RepositoryProvider', ['$http', 'JsonApiCache', 'ItemProvider', RepositoryProvider]);

  function RepositoryProvider($http, JsonApiCache, ItemProvider) {
    var provider = {
      create: create
    };
    return provider;

    function create(path, schema) {
      var _path = path;
      var _schema = schema;

      var repository = {
        fetch: fetch,
        add: add,
        remove: remove
      };

      activate(path, schema);

      return repository;

      function activate() {
        _path = path;
        _schema = schema;
      }

      /* public */

      function fetch(options) {
        return _findResource(_path, options).then(function(resource) {
          return _parse(resource);
        });
      }
      
      function add(data) {
        var resource = _createResource(data, _schema);
        return $http.post(_path, resource)
        .then(function(response) {
          return response;
        })
      }
      
      function remove(id) {
        return $http.delete(_path + '/' + id)
        .then(function(response) {
          return response;
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
      
      function _createResource(data, schema) {        
        var resource = {
          data: {
            type: schema.type,
            attributes: {},
            relationships: {}
          }
        }
        
        angular.forEach(schema.attributes, function(attribute) {
//          if (data[attribute] === true || data[attribute] === false) {
//            resource.data.attributes[attribute] = "true";
//          }
//          else {
//            resource.data.attributes[attribute] = data[attribute];
//          }
          resource.data.attributes[attribute] = data[attribute];
        });
        
        angular.forEach(schema.relationships, function(relation) {
          resource.data.relationships[relation.name] = {
            data: {
              type: ""//relation.schema.type
            }
          }
        });
        
        return resource;
      }
    }
  }
}());
