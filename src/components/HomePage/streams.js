import React from 'react';

function Streams(props){	
	    return (
    		<div className="pt-3 pb-3">
    			<div className="row text-white">
                    <div className="col-12 col-lg-6">
				    	<iframe width="100%" height="300" title="youtube" src="https://www.youtube.com/embed?max-results=1&rel=0&listType=user_uploads&list=objectivitytime" frameBorder="0" allowFullScreen></iframe>
							
					</div>
					<div className="col-12 col-lg-6">
			    		<iframe title="twitch"
						    src="https://player.twitch.tv/?channel=random_rules"
						    width="100%" 
						    height="300"
						    frameBorder="0"
						    allowFullScreen>
						</iframe>
			    	</div>
                </div>
            </div>
	    )
}
export default Streams;

