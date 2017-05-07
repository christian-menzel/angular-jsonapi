(function() {
  'use strict';
  angular.module('DemoApp')
    .component('bookList', {
        templateUrl: 'partials/books.html',
        bindings: {
            books: '<'
        },
        controller: BookList
    });
    
    function BookList($location) {
      this.showBook  = function(book) {
        $location.path('/books/' + book.id());
      };
      
      this.showAuthor = function(author) {
        $location.path('/authors/' + author.id());
      };
    }
}());
