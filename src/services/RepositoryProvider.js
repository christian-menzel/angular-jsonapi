(function() {
  'use strict';
  angular.module('JsonApi')
    .factory('RepositoryProvider', ['$http', 'JsonApiCache', 'ItemProvider', '$q', RepositoryProvider]);

  function RepositoryProvider($http, JsonApiCache, ItemProvider, $q) {
    var provider = {
      create: create
    };
    return provider;

    function create(path, schema) {
      var _path = path;
      var _schema = schema;

      var repository = {
        get: get,
        post: post,
        patch: patch,
        addRelationships: addRelationships,
        delete: remove,
        removeRelationships: removeRelationships
      };

      activate(path, schema);

      return repository;

      function activate() {
        _path = path;
        _schema = schema;
      }

      /* public */

      function get(options) {
        return _findResource(_path, options).then(function(resource) {
          return _parse(resource);
        });
      }

      function post(data, options) {
        var resource = _createResource(data, _schema);
        if (options) {
          if (options.meta) {
            resource.meta = options.meta;
          }
        }
        var deferred = $q.defer();
        $http.post(_path, resource)
          .then(function(response) {
            var data = _parse(response.data);
            if (response.data.meta) {
              data = angular.extend(data, {
                meta: function() {
                 return response.data.meta;
                }
              });
            }
            deferred.resolve(data);
          }, function(response) {
            deferred.reject(response.errors);
          });
          return deferred.promise;
      }

      function patch(data, options) {
        var resource = _createResource(data, _schema);
        if (options) {
          if (options.meta) {
            resource.meta = options.meta;
          }
        }
        var deferred = $q.defer();
        $http.patch(_path, resource)
          .then(function(response) {
            if (response.status === 204) {
              deferred.resolve(data);
              return;
            }
            var result = _parse(response.data);
            if (response.data.meta) {
              result = angular.extend(result, {
                meta: function() {
                 return response.data.meta;
                }
              });
            }
            deferred.resolve(result);
          }, function(response) {
            deferred.reject(response.data);
          });
        return deferred.promise;
      }

      function addRelationships(data) {
        var resource = _createRelationshipResource(data, _schema);

        return $http.post(_path, resource)
        .then(function(response) {
          return response;
        });
      }

      function remove(id) {
        return $http.delete(_path + '/' + id)
        .then(function(response) {
          return response;
        });
      }

      function removeRelationships(data) {
        var resource = _createRelationshipResource(data, _schema);

        $http({
          method: 'DELETE',
          url: _path,
          data: resource,
          headers: {
            'Content-type': 'application/json;charset=utf-8'
          }
        }).then(function(response) {
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
        if (angular.isDefined(opt.filter)) {
          angular.forEach(opt.filter, function(item) {
            params["filter["+item.field+"]"] = item.value;
          });
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
          data: {}
        };

        resource.data = _createData(data, schema);
        return resource;
      }

      function _createRelationshipResource(data, schema) {
        var resource = {
          data: []
        };

        angular.forEach(data, function(item, index) {
          resource.data[index] = _createData(item, schema);
        });
        return resource;
      }

      function _createData(item, schema) {
        var data = {
          type: '',
          attributes: {},
          relationships: {}
        };

        if(angular.isDefined(item.id)) {
          data['id'] = item.id();
        };

        if(angular.isDefined(schema)) {
          data.type = schema.type;
          data = _createAttributes(data, schema.attributes, item);

          angular.forEach(schema.relationships, function(relation) {
            if(angular.isDefined(relation.schema) && angular.isDefined(item[relation.name])) {
              if (angular.isArray(item[relation.name])) {
                data.relationships[relation.name] = {
                  data:  []
                };
                angular.forEach(item[relation.name], function(singleRelation) {
                  if(angular.isDefined(singleRelation.id)){
                    data.relationships[relation.name].data.push({
                      id: singleRelation.id(),
                      type: relation.schema.type
                    });
                  }
                });
              } else {
                if (angular.isDefined(item[relation.name].id)) {
                  data.relationships[relation.name] = {
                    data:  {
                      id: item[relation.name].id(),
                      type: relation.schema.type
                    }
                  };
                }
              }
            }
          });

          return data;
        }

        data.type = item.type();
        return data;
      }

      function _createAttributes(data, attributes, item) {
        angular.forEach(attributes, function(attribute) {
          data.attributes[attribute] = item[attribute];
        });
        return data;
      }
    }
  }
}());
