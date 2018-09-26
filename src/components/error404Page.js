import React, {Component} from 'react';
import { Link} from 'react-router-dom';

class error404Page extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
    return (
    	<section id="error404" className="text-center" style={{backgroundColor: "#313438"}}>
        <img src="404.svg" style={{height:"100%"}} alt="404 ошибка" />
        <Link to="/" className="btn btn-info position-absolute" style={{top:"88%", left: "48%"}}>ГЛАВНАЯ</Link>
      </section>
    )
  }
}

export default error404Page;




