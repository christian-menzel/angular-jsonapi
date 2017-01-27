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

the json:api server might respond with :
```json
{
  "links": {
    "self": "http://example.com/books"
  },
  "data": [
    {
      "id": "1",
      "type": "book",
      "attributes": {
        "title": "Dune"
      }, "relationships": {
        "author": {
          "links": {
            "self": "http://example.com/books/1/relationships/author",
            "related": "http://example.com/books/1/author"
          },
          "data": {
            "id": "1",
            "type": "people"
          }
        },
        "stores": {
          "links": {
            "self": "http://example.com/books/1/relationships/stores",
            "related": "http://example.com/books/1/stores"
          },
          "data": [
            {
              "id": "1",
              "type": "store"
            },
            {
              "id": "2",
              "type": "store"
            }
          ]
        }
      },
      "links": {
        "self": "http://example.com/books/1"
      }
    }, {
      "id": "2",
      "type": "book",
      "attributes": {
        "title": "Dune - Messiah"
      },
      "relationships": {
        "author": {
          "links": {
            "self": "http://example.com/books/2/relationships/author",
            "related": "http://example.com/books/2/author"
          },
          "data": {
            "id": "1",
            "type": "people"
          }
        },
        "stores": {
          "links": {
            "self": "http://example.com/books/2/relationships/stores",
            "related": "http://example.com/books/2/stores"
          },
          "data": [
            { 
              "id": "2",
              "type": "store"
            }
          ]
        }
      },
      "links": {
        "self": "http://example.com/books/2"
      }
    }
  ],
  "included": [
    {
      "data": {
        "id": "1",
        "type": "people",
        "attributes": {
          "first-name": "Frank",
          "last-name": "Herbert"
        }
      },
      "links": {
        "self": "http://example.com/people/1"
      }
    }, {
      "data": {
        "id": "1",
        "type": "store",
        "attributes": {
          "name": "Example Store",
          "Location": "New York City"
        }
      },
      "links": {
        "self": "http://example.com/stores/1"
      }
    }, {
      "data": {
        "id": "2",
        "type": "store",
        "attributes": {
          "name": "Demo Store",
          "Location": "San Francisco"
        }
      },
      "links": {
        "self": "http://example.com/stores/2"
      }
    }
  ]
}
```
Parsed book collection:
```json
[
  {
    "id": "1",
    "title": "Dune",
    "author": {
      "id": "1",
      "first-name": "Frank",
      "last-name": "Herbert"
    },
    "stores": [
      {
        "id": "1",
        "name": "Example Store",
        "location": "New York City"
      }, {
        "id": "2",
        "name": "Demo Store",
        "location": "San Francisco"
      }
    ]
  }, {
    "id": "2",
    "title": "Dune - Messiah",
    "author": {
      "id": "1",
      "first-name": "Frank",
      "last-name": "Herbert"
    },
    "stores": [
      {
        "id": "2",
        "name": "Demo Store",
        "location": "San Francisco"
      }
    ]
  }
]
```

The information to read,patch,put and delete resources remain in the repository
