import React, { Component } from 'react';

class Channels extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){
    return (
    	<section id="channels">
	    	<div className="container-fluid">
				<div className="row">
					<div className="col-12 col-lg-6 bg-danger text-center">
			    		<h1 className="mt-5 text-white"><i className="fab fa-youtube"></i> YOUTUBE
			    		</h1>
			    		<iframe width="70%" className="mb-5" height="340" title="youtube" src="https://www.youtube.com/embed?max-results=1&rel=0&listType=user_uploads&list=objectivitytime" frameBorder="0" allowFullScreen></iframe>
						
					</div>

					<div className="col-12 col-lg-6 bg-info text-center" >
			    		<h1 className="mt-5 text-white">
			    			<i className="fab fa-twitch"></i> TWITCH
			    		</h1>
			    		<iframe title="twitch"
						    src="https://player.twitch.tv/?channel=random_rules"
						    width="70%" 
						    height="340"
						    frameBorder="0"
						    className="mb-5"
						    allowFullScreen>
						</iframe>
		    		</div>
				</div>
	    	</div>
	    </section>
    );
}
}
export default Channels;
