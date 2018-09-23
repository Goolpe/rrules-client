import React, {Component} from 'react';
import { FaHandsHelping } from 'react-icons/fa';

class SupportPage extends Component{
	componentDidMount() {
	    window.scrollTo(0,0);
	  }
	render(){
	    return (
	    	<section>
	    		<div className="container">
		    		<span className="text_card">
                  		<FaHandsHelping size="1.5em"/> Поддержать проект 
                	</span>
				</div>
			</section>
	    )
	}
}

export default SupportPage;
