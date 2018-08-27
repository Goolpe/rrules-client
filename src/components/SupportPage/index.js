import React, {Component} from 'react';

class SupportPage extends Component{
	componentDidMount() {
	    window.scrollTo(0,0);
	  }
	render(){
	    return (
	    	<div>
	    		<div className="container pt-5 pb-5" style={{minHeight:"100vh"}}>
		    		<h1 className="text-center mb-5">ПОДДЕРЖАТЬ ПРОЕКТ</h1>
		    		<p className="text-justify">Patreon</p>
				</div>
			</div>
	    )
	}
}

export default SupportPage;
