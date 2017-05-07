/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() {
  'use strict';
  angular.module('JsonApi', []);
}());


/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() {
  'use strict';
  angular.module('JsonApi')
    .factory('ItemProvider', ['JsonApiCache', ItemProvider]);

  function ItemProvider(JsonApiCache) {
    var provider = {
      create: create
    };

    return provider;

    function create(resource) {
      var _id;
      var _type;
      var service = {
        id: id,
        type: type
      };

      activate();

      return service;

      function activate() {
        _id = resource.id;
        _type = resource.type;
        angular.extend(service,
        resource.attributes,
        _parseRelationships(resource.relationships));
      }

      /* public */

      function id() {
        return _id;
      }

      function type() {
        return _type;
      }

      /* private */

      function _parseRelationships(relationships) {
        var attributes = {};
        angular.forEach(relationships, function(relation, attribute) {
          var relationData = relation.data;
          if (angular.isDefined(relationData)) {
            if (angular.isArray(relationData)) {
              var collection = [];
              angular.forEach(relationData, function(itemData) {
                collection.push(JsonApiCache.getItem(itemData.type, itemData.id));
              });
              attributes[attribute] = collection;
            } else {
              attributes[attribute] = JsonApiCache.getItem(relationData.type, relationData.id);
            }
          }
        });
        return attributes;
      }
    }
  }
}());


/***/ }),
/* 2 */
/***/ (function(module, exports) {

(function() {
  'use strict';
  angular.module('JsonApi')
    .factory('JsonApi', ['RepositoryProvider', 'JsonApiCache', JsonApi]);

  function JsonApi(RepositoryProvider, JsonApiCache) {
    var service = {
      repository: repository,
      repositoryFromItem: repositoryFromItem
    };
    return service;

    /* public */

    function repository(path,schema) {
      return RepositoryProvider.create(path,schema);
    }

    function repositoryFromItem(item) {
      var repositoryUrl = JsonApiCache.getResponsibility(item).links.self;
      return repository(repositoryUrl);
    }
  }
}());


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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
            deferred.reject(response.data);
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
        })
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
            params["filter["+item.field+"]"] = JSON.stringify(item.value);
          })
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
            data.relationships[relation.name] = {
              data:  {}// TODO: Muss für  m zu n Beziehung ein array sein
            };
            if(angular.isDefined(relation.schema)) {
              data.relationships[relation.name].data['type'] = relation.schema.type;
            }
            if(angular.isDefined(item[relation.name]) && angular.isDefined(item[relation.name].id)){
              data.relationships[relation.name].data['id'] = item[relation.name].id();
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0);
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);