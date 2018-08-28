import React, {Component} from 'react';
import books from './library.json';

class LibraryPage extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
    const libraryBooks = books.map((book, index)=>
      <div className="col-12 col-md-6 col-lg-4 mb-5" key={book.id}>
        <a href={book.url} target="_blank" className="text-white">
          <div className="wrapper"  style={ { backgroundImage: `url(${book.picture})` }}>
            <div className="card d-flex align-items-center justify-content-center rounded-0" >
              <h1 className="text-center pl-3 pr-3" style={{ textShadow: "black 0 0 10px"}}>{book.name.toUpperCase()}</h1>
              <i className="fas fa-external-link-alt text-white position-absolute fa-2x" style={{top:"5%",left:"85%"}}></i>
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




