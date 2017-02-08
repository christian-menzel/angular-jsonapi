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
