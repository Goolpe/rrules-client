import React, {Component} from 'react';
import books from './library.json';
import { FaStar } from "react-icons/fa";

class LibraryPage extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
    const libraryBooks = books.map((book, index)=>
      <div className="col-12 col-md-6 col-lg-3 mb-5" key={book.id}>
        <a href={book.url} target="_blank" className="text-white">
          <div className="wrapper" style={ { backgroundColor: "#29282d" }}>
            <div className="pt-5 pb-5 card d-flex align-items-center justify-content-around rounded-0" >
              <h3 className="text-center pl-3 pr-3" style={{ textShadow: "black 0 0 10px"}}>{book.name.toUpperCase()}</h3>
              <i className={book.picture}></i>
            </div>
          </div>
        </a>
      </div>
    )
    return (
    	<section id="library" className='pt-5 pb-5' style={{minHeight:"100vh"}}>
        <h1 className="text-center mb-5">БИБЛИОТЕКА</h1>
        <div className="container">
          <div className="row">
            {libraryBooks}
          </div>
        </div>
      </section>
    )
  }
}

export default LibraryPage;




