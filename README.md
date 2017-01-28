# json:api for the angular framework

angular-jsonapi provides an easy way to talk to json:api restful services and delivers simple native javascript objects

### Example

Retrieving a collection is simple:
``` javascript 
(function() {
  angular.module("myApp", [Jsonapi])
  .controller("myController", function(jsonapi) {
    vm = this
    
    vm.getBooks = getBooks;
    
    // obtain a repository for the json:api service at http://example.com
    var repository = jsonapi.repository("http://example.com");
    
    function getBooks() {
      // calling the service for http://example.com/books
      repository.find("/books", {
        "included": ["author", "stores"]
      }).then(function(books) {
        return books;
      });
    }
  });
})();
```

the json:api server may respond with :
```json
{
    "data": [
        {
            "id": "1",
            "type": "books",
            "attributes": {
                "date_published": "1954-07-29",
                "title": "The Fellowship of the Ring",
                "created_at": "2017-01-28 11:01:24",
                "updated_at": "2017-01-28 11:01:24"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "/v1/books/1/relationships/author",
                        "related": "/v1/books/1/author"
                    },
                    "data": {
                        "id": "1",
                        "type": "authors"
                    }
                },
                "stores": {
                    "links": {
                        "self": "/v1/books/1/relationships/stores",
                        "related": "/v1/books/1/stores"
                    },
                    "data": [{
                            "id": "2",
                            "type": "stores"
                        }]
                }
            },
            "links": {
                "self": "/v1/books/1"
            }
        }, {
            "id": "2",
            "type": "books",
            "attributes": {
                "date_published": "1954-11-11",
                "title": "The Two Towers",
                "created_at": "2017-01-28 11:01:24",
                "updated_at": "2017-01-28 11:01:24"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "/v1/books/2/relationships/author",
                        "related": "/v1/books/2/author"
                    },
                    "data": {
                        "id": "1",
                        "type": "authors"
                    }
                },
                "stores": {
                    "links": {
                        "self": "/v1/books/2/relationships/stores",
                        "related": "/v1/books/2/stores"
                    },
                    "data": [{
                            "id": "2",
                            "type": "stores"
                        }]
                }
            },
            "links": {
                "self": "/v1/books/2"
            }
        }
    ],
    "included": [
        {
            "id": "1",
            "type": "authors",
            "attributes": {
                "name": "J. R. R. Tolkien",
                "date_of_birth": "1892-01-03",
                "date_of_death": "1973-09-02",
                "created_at": "2017-01-28 11:01:24",
                "updated_at": "2017-01-28 11:01:24"
            },
            "relationships": {
                "books": {
                    "links": {
                        "self": "/v1/books/1/relationships/books",
                        "related": "/v1/books/1/books"
                    }
                }
            },
            "links": {
                "self": "/v1/books/1"
            }
        }, {
            "id": "2",
            "type": "stores",
            "attributes": {
                "name": "full store",
                "created_at": "2017-01-28 11:01:29",
                "updated_at": "2017-01-28 11:01:29"
            },
            "relationships": {
                "books": {
                    "links": {
                        "self": "/v1/books/2/relationships/books",
                        "related": "/v1/books/2/books"
                    }
                }
            },
            "links": {
                "self": "/v1/books/2"
            }
        }
    ]
}
```
angular-jsonapi provided hierarchical collection:
```json
[
  {
    "id": "1",
    "date_published": "1954-07-29",
    "title": "The Fellowship of the Ring",
    "created_at": "2017-01-28 11:01:24",
    "updated_at": "2017-01-28 11:01:24"
    "author": {
      "id": "1",
      "name": "J. R. R. Tolkien",
      "date_of_birth": "1892-01-03",
      "date_of_death": "1973-09-02",
      "created_at": "2017-01-28 11:01:24",
      "updated_at": "2017-01-28 11:01:24"
    },
    "stores": [
      {
        "id": "2",
        "name": "full store",
        "created_at": "2017-01-28 11:01:29",
        "updated_at": "2017-01-28 11:01:29"
      }
    ]
  }, {
    "id": "2",
    "date_published": "1954-11-11",
    "title": "The Two Towers",
    "created_at": "2017-01-28 11:01:24",
    "updated_at": "2017-01-28 11:01:24",
    "author": {
      "id": "1",
      "name": "J. R. R. Tolkien",
      "date_of_birth": "1892-01-03",
      "date_of_death": "1973-09-02",
      "created_at": "2017-01-28 11:01:24",
      "updated_at": "2017-01-28 11:01:24"
    },
    "stores": [
      {
        "id": "2",
        "name": "full store",
        "created_at": "2017-01-28 11:01:29",
        "updated_at": "2017-01-28 11:01:29"
      }
    ]
  }
]
```
Accessing the object through angular directives is as easy as:
```html
<div ng-repeat="book in vm.getBooks()">
  <h2>{{ book.title }}</h2>
  <p>by {{ book.author.name }}</p>
  <p>
    Grab your copy here:
    <ul>
      <li ng-repeat="store in book.stores">
        {{ store.name }}
      </li>
    </ul>
  </p>
</div>
```
The information about how to read,patch,put and delete resources remains in the repository
