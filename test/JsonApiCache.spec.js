(function() {
  'use strict';
  describe('JsonApiCache', function() {
    var mockItemProvider;
    var JsonApiCache;

    beforeEach(module('JsonApi'));

    beforeEach(module(function($provide) {
      $provide.service('ItemProvider', function() {
        this.create = function(_id, _type) {
          return {
            id: function() {
              return _id;
            },
            type: function() {
              return _type;
            }
          };
        };
      });
    }));

    beforeEach(inject(function(_JsonApiCache_, ItemProvider) {
      JsonApiCache = _JsonApiCache_;
      mockItemProvider = ItemProvider;
    }));

    it('should return an empty dummy element if no item was found', function() {
      var result = JsonApiCache.getItem('books', 1);
      expect(result).toEqual({});
    });

    it('should return a previously stored item', function() {
      var mockItem = mockItemProvider.create(1, 'books');
      JsonApiCache.addItem(mockItem);
      var result = JsonApiCache.getItem('books', 1);
      expect(result).toEqual(mockItem);
    });

    it('should return the resource responsible for a given item', function() {
      var mockResource = {
        id: '1',
        type: 'books',
        attributes: {
          title: 'The Lord of the Rings'
        },
        links: {
          self: 'http://localhost/books/1'
        }
      };
      var mockResource2 = {
        id: '2',
        type: 'books',
        attributes: {
          title: 'The Hobbit'
        },
        links: {
          self: 'http://localhost/books/1'
        }
      };
      var mockItem = mockItemProvider.create(1, 'books');
      var mockItem2 = mockItemProvider.create(2, 'books');
      JsonApiCache.setResponsibility(mockItem, mockResource);
      JsonApiCache.setResponsibility(mockItem2, mockResource2);
      expect(JsonApiCache.getResponsibility(mockItem))
        .toEqual(mockResource);
    });

    it('should raise an exception if the parameter item is missing', function() {
      expect(function() {
        JsonApiCache.getResponsibility();
      }).toThrowError('Missing Parameter');
    });
    it('should raise an exception if the item is missing the required functions id() and type()', function() {
      expect(function() {
        JsonApiCache.getResponsibility({});
      }).toThrowError('Missing required Method');
      expect(function() {
        JsonApiCache.getResponsibility({id: function() {}});
      }).toThrowError('Missing required Method');
    });

    it('should return null if no responsible resource for a given item could be found', function() {
      var mockItem = mockItemProvider.create(1, 'books');
      expect(JsonApiCache.getResponsibility(mockItem))
        .toEqual(null);
      var mockResource = {
        id: '1',
        type: 'books',
        attributes: {
          title: 'The Lord of the Rings'
        },
        links: {
          self: 'http://localhost/books/1'
        }
      };
      JsonApiCache.setResponsibility(mockItem, mockResource);
      var mockItem2 = mockItemProvider.create(2, 'books');
      expect(JsonApiCache.getResponsibility(mockItem2))
        .toEqual(null);
    });
  });
}());
