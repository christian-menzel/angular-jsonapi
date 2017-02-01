(function() {
  'use strict';
  describe('JsonApi', function() {
    var JsonApi;

    beforeEach(module('JsonApi'));

    beforeEach(module(function($provide) {
      $provide.service('RepositoryProvider', function() {
        this.create = function(url) {
          return url;
        };
      });
      $provide.service('JsonApiCache', function() {
        this.getResponsibility = function(item) {
          return {
            links: {
              self: 'http://localhost/books/' + item.id
            }
          };
        };
      });
    }));

    beforeEach(inject(function(_JsonApi_) {
      JsonApi = _JsonApi_;
    }));

    it('should call create on the RepositoryProvider with the url specified', function() {
      expect(JsonApi.repository('http://localhost/books')).toEqual('http://localhost/books');
    });

    it('should call create on the RepositoryProvider with the url obtained from an item', function() {
      expect(JsonApi.repositoryFromItem({
        id: 1
      })).toEqual('http://localhost/books/1');
    });
  });
}());
