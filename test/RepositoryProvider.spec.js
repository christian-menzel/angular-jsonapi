(function() {
  'use strict';
  describe('RepositoryProvider', function() {
    var RepositoryProvider;
    var $httpBackend;

    beforeEach(module('JsonApi'));

    beforeEach(module(function($provide) {
      $provide.service('JsonApiCache', function() {
        this.addItem = function() {
        };
        this.setResponsibility = function() {
        };
      });
      $provide.service('ItemProvider', function() {
        this.create = function(resource) {
          return {
            id: resource.id,
            type: resource.type
          };
        };
      });
    }));

    beforeEach(inject(function($injector, _RepositoryProvider_) {
      RepositoryProvider = _RepositoryProvider_;
      $httpBackend = $injector.get('$httpBackend');
    }));

    it('should fetch an resource and create an item', function() {
      $httpBackend.when('GET', '/books/1')
        .respond(function() {
          return [200, {
            data: {
              id: '1',
              type: 'book'
            }
          }];
        });
      var repository = RepositoryProvider.create('/books/1');
      repository.fetch().then(function(item) {
        expect(item.id).toEqual('1');
        expect(item.type).toEqual('book');
      });
      $httpBackend.flush();
    });

    it('should fetch an resource and create a collection', function() {
      $httpBackend.when('GET', '/books')
        .respond(function() {
          return [200, {
            data: [
              {
                id: '1',
                type: 'book'
              }, {
                id: '2',
                type: 'book'
              }
            ]
          }];
        });
      var repository = RepositoryProvider.create('/books');
      repository.fetch().then(function(collection) {
        expect(collection.length).toEqual(2);
        expect(collection[0].id).toEqual('1');
        expect(collection[0].type).toEqual('book');
        expect(collection[1].id).toEqual('2');
        expect(collection[1].type).toEqual('book');
      });
      $httpBackend.flush();
    });
  });
}());
