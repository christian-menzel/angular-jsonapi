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
              return;
            } else if (relationData !== null) {
              attributes[attribute] = JsonApiCache.getItem(relationData.type, relationData.id);
              return;
            }
            attributes[attribute] = null;
            return;
          }
        });
        return attributes;
      }
    }
  }
}());
