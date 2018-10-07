import React, {Component} from 'react';
import { FaHandsHelping } from 'react-icons/fa';

class SupportPage extends Component{
	componentDidMount() {
	  window.scrollTo(0,0);
	}
	render(){
	    return (
	    	<main>
	    		<section className="container">
		    		<h1 className="text_card">
              <FaHandsHelping size="1.5em"/> Поддержать проект 
            </h1>
					</section>
				</main>
	    )
	}
}

export default SupportPage;
