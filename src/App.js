import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as BooksAPI from './BooksAPI'
import './App.css'

import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'


class BooksApp extends React.Component {
  state = {
    books: []
  }  

  componentDidMount() {
    this.getBooks()  
  }

  getBooks= () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }
  
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((book) => {
        this.getBooks()
      })
  }

  render() {
    const bookshelfOptions = ['currentlyReading' , 'wantToRead' , 'read']

    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books}
              bookshelfOptions={bookshelfOptions}
              onUpdateShelf={this.updateShelf}
            />
          )} />
          <Route path="/search" render={() => (
            <SearchBooks
              onUpdateShelf={this.updateShelf}              
            />
          )} />
        </div>
      </Router>
    )
  }
}

export default BooksApp
