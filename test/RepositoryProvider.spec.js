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

    it('should fetch a resource and create an item', function() {
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
      repository.get().then(function(item) {
        expect(item.id).toEqual('1');
        expect(item.type).toEqual('book');
      });
      $httpBackend.flush();
    });

    it('should fetch a resource with included data', function() {
      $httpBackend.when('GET', '/books/1?include=author')
        .respond(function() {
          return [200, {
            data: {
              id: '1',
              type: 'book'
            }, 
            included: [
              {
                id: '1',
                type:'authors'
              }
            ]
          }];
        });
      var repository = RepositoryProvider.create('/books/1');
      repository.get({
        include: [
          'author'
        ]
      }).then(function(item) {
        expect(item.id).toEqual('1');
        expect(item.type).toEqual('book');
      });
      $httpBackend.flush();
    });

    it('should fetch resources and create a collection', function() {
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
      repository.get().then(function(collection) {
        expect(collection.length).toEqual(2);
        expect(collection[0].id).toEqual('1');
        expect(collection[0].type).toEqual('book');
        expect(collection[1].id).toEqual('2');
        expect(collection[1].type).toEqual('book');
      });
      $httpBackend.flush();
    });

    it('should fetch resources by filter', function() {
      $httpBackend.when('GET', '/books?filter%5Bauthor%5D=1')
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
      repository.get({
        filter: [
          {
            field: 'author',
            value: '1'
          }
        ]
      }).then(function(collection) {
        expect(collection.length).toEqual(2);
        expect(collection[0].id).toEqual('1');
        expect(collection[0].type).toEqual('book');
        expect(collection[1].id).toEqual('2');
        expect(collection[1].type).toEqual('book');
      });
      $httpBackend.flush();
    });

    it('should post a resource', function() {
      $httpBackend.expectPOST('/books', {
        type: 'books',
        attributes: {
          name: 'The Hobbit'
        }
      }).respond(function() {
        return [201];
      });
      var repository = RepositoryProvider.create('/books', {
          type: 'books',
          attributes: [name]
      });
      repository.post({
        name: 'The Hobbit'
      });
      $httpBackend.flush();
    });
  });
}());
