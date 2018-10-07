import React, {Component} from 'react';

class error404Page extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
    return (
    	<main id="error404" className="text-center" style={{backgroundColor: "#313438"}}>
        <img src="404.svg" style={{height:"100%"}} alt="404 ошибка" />
      </main>
    )
  }
}

export default error404Page;




