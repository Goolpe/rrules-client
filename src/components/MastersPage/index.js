import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';
import mastersJSON from "./mastersJSON.json";

class Masters extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){
	const masters = mastersJSON.map((thing, index) =>
		<div className="col-12 col-md-6 col-lg-4 mb-5" key={thing.id}>
			<Link to={`/master/${thing.name + "-" + index}`} className="text-white">
				<div className="wrapper"  style={ { backgroundImage: `url(${thing.picture})`} }>
					<div className="card d-flex align-items-center justify-content-center rounded-0" >
					  <h1 style={{textShadow: 'black 0 0 20px'}}>{thing.nickname.toUpperCase()}</h1>
					</div>
				</div>
			</Link>
		 </div>
		)	
    return (
	    	<section id="masters">
	    		<div className="container text-center">
					<h1 className="text-center mb-5 mt-5">РЕЗЮМЕ МАСТЕРОВ</h1>
					<div className="row">
					 	{masters}
					</div>
				</div>
	    	</section>
    );
}
}

export default Masters;