import React, { Component } from 'react';
import { animateScroll as scroll} from 'react-scroll';

class ArrowUp extends Component {
  	constructor(props) {
	    super(props);
	    this.state={
		    arrowUp: false
	    }
		this.onScroll = this.onScroll.bind(this);
  	}	

    onScroll(){
    	if (window.pageYOffset > 100){
    		this.setState({arrowUp: true})
    	}
    	else{
    		this.setState({arrowUp: false})
    	}
	}
   	componentDidMount(){
   	 	window.addEventListener('scroll', this.onScroll);
	}
	scrollToTop() {
	    scroll.scrollToTop();
	  }
  	render() {
	    return (
	    	<div>
	    	{this.state.arrowUp && <div id="arrowUp" onClick={this.scrollToTop}><i className="fas fa-angle-up fa-3x"></i></div>}
	    	</div>
	    );
	}
}

export default ArrowUp;
