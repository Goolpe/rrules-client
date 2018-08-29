import React, { Component } from 'react';

class Videos extends Component {	
  	render() {
	    return (
	    	<div className="container-fluid pt-5" id="articles">
				<p className="text-white font-weight-bold">ПОСЛЕДНИЕ ВИДЕО</p>
	    		<div className="row text-white">
	    			<div className="col-12 col-md-6 col-lg-3 mt-2">
	    			<iframe width="100%" title="video1" height="300" src="https://www.youtube.com/embed/?listType=playlist&list=PL8eGlCwLLio5vV_yunVLJ-BCyNlPf6MWV" frameBorder="0" allowFullScreen></iframe>
	    			</div>
	    			<div className="col-12 col-md-6 col-lg-3 mt-2">
	    			<iframe width="100%" title="video2" height="300" src="https://www.youtube.com/embed/?listType=playlist&list=PL8eGlCwLLio5bVBfJWzTbusNP3l2I8Vy-" frameBorder="0" allowFullScreen></iframe>
					</div>
					<div className="col-12 col-md-6 col-lg-3 mt-2">
	    			<iframe width="100%" title="video3" height="300" src="https://www.youtube.com/embed/?listType=playlist&list=PL8eGlCwLLio4jk7NudmwjG71iTFEIGlwA" frameBorder="0" allowFullScreen></iframe>
					</div>
					<div className="col-12 col-md-6 col-lg-3 mt-2">
	    			<iframe width="100%" title="video4" height="300" src="https://www.youtube.com/embed/?listType=playlist&list=PL8eGlCwLLio70j93h8k4tR_ATj4A7liAh" frameBorder="0" allowFullScreen></iframe>
					</div>
	    		</div>
	    	</div>
	    )
	}
}

export default Videos;

