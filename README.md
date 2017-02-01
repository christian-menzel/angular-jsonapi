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
            "type": "book",
            "id": "1",
            "attributes": {
                "title": "The Hobbit"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/1"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/1\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/1\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "1"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/1\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/1\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "1"
                        },
                        {
                            "type": "store",
                            "id": "2"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "2",
            "attributes": {
                "title": "The Lord of the Rings - The Fellowship of the Ring"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/2"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/2\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/2\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "1"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/2\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/2\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "1"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "3",
            "attributes": {
                "title": "The Lord of the Rings - The Two Towers"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/3"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/3\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/3\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "1"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/3\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/3\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "1"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "4",
            "attributes": {
                "title": "The Lord of the Rings - The Return of the King"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/4"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/4\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/4\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "1"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/4\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/4\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "1"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "5",
            "attributes": {
                "title": "Harry Potter and the Philosopher's Stone"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/5"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/5\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/5\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "2"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/5\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/5\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "1"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "6",
            "attributes": {
                "title": "Harry Potter and the Chamber of Secrets"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/6"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/6\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/6\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "2"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/6\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/6\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "1"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "7",
            "attributes": {
                "title": "Harry Potter and the Prisoner of Azkaban"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/7"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/7\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/7\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "2"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/7\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/7\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "2"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "8",
            "attributes": {
                "title": "Harry Potter and the Goblet of Fire"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/8"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/8\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/8\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "2"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/8\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/8\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "2"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "9",
            "attributes": {
                "title": "Harry Potter and the Order of the Phoenix"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/9"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/9\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/9\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "2"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/9\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/9\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "2"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "10",
            "attributes": {
                "title": "Harry Potter and the Half-Blood Prince"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/10"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/10\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/10\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "2"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/10\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/10\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "2"
                        }
                    ]
                }
            }
        },
        {
            "type": "book",
            "id": "11",
            "attributes": {
                "title": "Harry Potter and the Deathly Hallows"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/book\/11"
            },
            "relationships": {
                "author": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/11\/relationships\/author",
                        "related": "http:\/\/localhost:8080\/book\/11\/author"
                    },
                    "data": {
                        "type": "author",
                        "id": "2"
                    }
                },
                "stores": {
                    "links": {
                        "self": "http:\/\/localhost:8080\/book\/11\/relationships\/stores",
                        "related": "http:\/\/localhost:8080\/book\/11\/stores"
                    },
                    "data": [
                        {
                            "type": "store",
                            "id": "2"
                        }
                    ]
                }
            }
        }
    ],
    "included": [
        {
            "type": "author",
            "id": "1",
            "attributes": {
                "name": "J.R.R. Tolkien"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/author\/1"
            }
        },
        {
            "type": "store",
            "id": "1",
            "attributes": {
                "name": "Amazon Books"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/store\/1"
            }
        },
        {
            "type": "store",
            "id": "2",
            "attributes": {
                "name": "Barnes & Noble"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/store\/2"
            }
        },
        {
            "type": "author",
            "id": "2",
            "attributes": {
                "name": "Joanne K. Rowling"
            },
            "links": {
                "self": "http:\/\/localhost:8080\/author\/2"
            }
        }
    ]
}
```
angular-jsonapi provided hierarchical collection:
```json
[
  {
    "title": "The Hobbit",
    "author": {
      "name": "J.R.R. Tolkien"
    },
    "stores": [
      {
        "name": "Amazon Books"
      }, {
        "name": "Barnes & Noble"
      }
    ]
  }, {
    "title": "The Lord of the Rings - The Fellowship of the Ring",
    "author": {
      "name": "J.R.R. Tolkien"
    },
    "stores": [
      {
        "name": "Amazon Books"
      }
    ]
  }, {
    "title": "The Lord of the Rings - The Two Towers",
    "author": {
      "name": "J.R.R. Tolkien"
    },
    "stores": [
      {
        "name": "Amazon Books"
      }
    ]
  }, {
    "title": "The Lord of the Rings - The Return of the King",
    "author": {
      "name": "J.R.R. Tolkien"
    },
    "stores": [
      {
        "name": "Amazon Books"
      }
    ]
  }, {
    "title": "Harry Potter and the Philosopher's Stone",
    "author": {
      "name": "Joanne K. Rowling"
    },
    "stores": [
      {
        "name": "Amazon Books"
      }
    ]
  }, {
    "title": "Harry Potter and the Chamber of Secrets",
    "author": {
      "name": "Joanne K. Rowling"
    },
    "stores": [
      {
        "name": "Amazon Books"
      }
    ]
  }, {
    "title": "Harry Potter and the Prisoner of Azkaban",
    "author": {
      "name": "Joanne K. Rowling"
    },
    "stores": [
      {
        "name": "Barnes & Noble"
      }
    ]
  }, {
    "title": "Harry Potter and the Goblet of Fire",
    "author": {
      "name": "Joanne K. Rowling"
    },
    "stores": [
      {
        "name": "Barnes & Noble"
      }
    ]
  }, {
    "title": "Harry Potter and the Order of the Phoenix",
    "author": {
      "name": "Joanne K. Rowling"
    },
    "stores": [
      {
        "name": "Barnes & Noble"
      }
    ]
  }, {
    "title": "Harry Potter and the Half-Blood Prince",
    "author": {
      "name": "Joanne K. Rowling"
    },
    "stores": [
      {
        "name": "Barnes & Noble"
      }
    ]
  }, {
    "title": "Harry Potter and the Deathly Hallows",
    "author": {
      "name": "Joanne K. Rowling"
    },
    "stores": [
      {
        "name": "Barnes & Noble"
      }
    ]
}]
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
