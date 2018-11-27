import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

  constructor(props) {
    super(props)
    this.state = {
      query: '',
      searchBooks: []
    }
  }
  
  updateQuery = (query) => {
    this.setState({ query });
    if (query.length === 0) {
      this.setState(() => ({ searchBooks: [] }));
    } else {
      BooksAPI.search(query)
        .then((searchBooks) => {
          if (!searchBooks || searchBooks.error) {
            this.setState({ searchBooks: [] })
          } else { // eslint-disable-next-line   
            searchBooks.map((book) => {              
              BooksAPI.get(book.id)
                .then((searchBookResult) => {
                  book.shelf = searchBookResult.shelf;
                  this.setState(() => ({ searchBooks }));
                })
            })
          }
        })
    }
  }

  render() {
        
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'>
            Close
              </Link>
          <div className="search-books-input-wrapper">            
            <input type="text" placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
          <BookShelf
            bookshelfTitle='Result Search'
            bookshelfOption='searched'
            books={this.state.searchBooks}
            onUpdateShelf={this.props.onUpdateShelf}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks