/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
  angular.module('JsonApi', []);
}());


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function() {
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function() {
  angular.module('JsonApi')
    .factory('JsonApi', ['RepositoryProvider', 'JsonApiCache', JsonApi]);

  function JsonApi(RepositoryProvider, JsonApiCache) {
    var service = {
      repository: repository,
      repositoryFromItem: repositoryFromItem
    };
    return service;

    /* public */

    function repository(path) {
      return RepositoryProvider.create(path);
    }

    function repositoryFromItem(item) {
      var repositoryUrl = JsonApiCache.getResponsibility(item).links.self;
      return repository(repositoryUrl);
    }
  }
}());


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function() {
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
      var storedItem = this.getItem(item.type(), item.id());
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
        throw 'required parameter item missing';
      }
      if (!angular.isFunction(item.id)) {
        throw 'the item must have the required functions id() and type()';
      }
      if (!angular.isFunction(item.type)) {
        throw 'the item must have the required functions id() and type()';
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

(function() {
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