import React, {Component} from 'react';
import books from './library.json';
import { FiBookOpen} from "react-icons/fi";

class LibraryPage extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
    const libraryBooks = books.map((book, index)=>
      <div className="col-12 col-md-6 col-lg-3 mb-5" key={book.id}>
        <a href={book.url} target="_blank" className="text-white">
          <div className="wrapper bg_card shadow">
            <div className="pt-5 pb-5 card d-flex align-items-center justify-content-around rounded-0" >
              <h3 className="text-center pl-3 pr-3">{book.name.toUpperCase()}</h3>
              <i className={book.picture}></i>
            </div>
          </div>
        </a>
      </div>
    )
    return (
    	<section id="library" >
        <div className="container">
          <span className="text-white">
            <FiBookOpen size="1.5em"/> Библиотека 
          </span>
          <div className="row pt-5">
            {libraryBooks}
          </div>
        </div>
      </section>
    )
  }
}

export default LibraryPage;




