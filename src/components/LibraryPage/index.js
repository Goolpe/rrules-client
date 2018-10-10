import React, {Component} from 'react';
import books from './library.json';
import { FiBookOpen} from "react-icons/fi";
import '../style/library.css';

class LibraryPage extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
    const libraryBooks = books.map((book, index)=>
      <div className="col-12 col-md-6 col-lg-3 mb-5" key={index}>
        <a href={book.url} target="_blank">
          <div className="library__wrapper bg_card shadow">
            <div className="pt-5 pb-5 library__card d-flex flex-column align-items-center justify-content-around rounded-0" >
              <h3 className="text-center pl-3 pr-3">{book.name.toUpperCase()}</h3>
              <i className={book.picture}></i>
            </div>
          </div>
        </a>
      </div>
    )
    return (
    	<main>
        <section className="container text_card">
          <h1 className="text_card">
            <FiBookOpen size="1.5em"/> Библиотека 
          </h1>
          <section className="row pt-5">
            {libraryBooks}
          </section>
        </section>
      </main>
    )
  }
}

export default LibraryPage;




