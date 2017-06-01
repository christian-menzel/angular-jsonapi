(function() {
  'use strict';
  describe('ItemProvider', function() {
    var ItemProvider;

    beforeEach(module('JsonApi'));

    beforeEach(module(function($provide) {
      $provide.service('JsonApiCache', function() {
        this.getItem = function(type, id) {
          if (type === 'author') {
            if (id === '1') {
              return {
                id: function() {
                  return '1';
                },
                type: function() {
                  return 'author';
                },
                name: 'J.R.R. Tolkien'
              };
            }
          }
          if (type === 'store') {
            if (id === '1') {
              return {
                id: function() {
                  return '1';
                },
                type: function() {
                  return 'store';
                },
                name: 'Amazon Books'
              };
            }
            if (id === '2') {
              return {
                id: function() {
                  return '2';
                },
                type: function() {
                  return 'store';
                },
                name: 'Barnes & Noble'
              };
            }
          }
        };
      });
    }));

    beforeEach(inject(function(_ItemProvider_) {
      ItemProvider = _ItemProvider_;
    }));

    it('should parse the attributes from a given resource', function() {
      var item = ItemProvider.create({
        id: '1',
        type: 'books',
        attributes: {
          title: 'The Lord of the Rings'
        }
      });
      expect(item.id()).toEqual('1');
      expect(item.type()).toEqual('books');
      expect(item.title).toEqual('The Lord of the Rings');
    });

    it('should parse toOne relationships from a given resource', function() {
      var item = ItemProvider.create({
        id: '1',
        type: 'books',
        relationships: {
          author: {
            data: {
              id: '1',
              type: 'author'
            }
          }
        }
      });
      expect(item.author.name).toEqual('J.R.R. Tolkien');
    });

    it('should parse toMany relationships from a given resource', function() {
      var item = ItemProvider.create({
        id: '1',
        type: 'books',
        relationships: {
          stores: {
            data: [
              {id: '1', type: 'store'},
              {id: '2', type: 'store'}
            ]
          }
        }
      });
      expect(item.stores.length).toEqual(2);
      expect(item.stores[0].name).toEqual('Amazon Books');
      expect(item.stores[1].name).toEqual('Barnes & Noble');
    });
    
    it('should not result in an error if relationships object does not contain a data property', function() {
      var item = ItemProvider.create({
        id: '1',
        type: 'books',
        relationships: {
          stores: {
          }
        }
      });
      expect(item.stores).toBeUndefined();
    });

    it('should return a null reference', function() {
      var item = ItemProvider.create({
        id: '1',
        type: 'books',
        relationships: {
          stores: {
              data: null
          }
        }
      });
      expect(item.stores).toBe(null);
    });
  });
}());
