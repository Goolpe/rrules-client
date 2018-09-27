import React from 'react';
import ReactPlayer from 'react-player';

function Streams(props){	
	    return (
    		<div className="pt-3 pb-3">
    			<div className="row">
                    <div className="col-12 col-lg-6">
				    	<iframe width="100%" height="300" title="youtube" src="https://www.youtube.com/embed?max-results=1&rel=0&listType=user_uploads&list=objectivitytime" frameBorder="0" allowFullScreen></iframe>
					</div>
					<div className="col-12 col-lg-6">
						<ReactPlayer url="https://www.twitch.tv/random_rules" width="100%" height="300px" controls />
			    	</div>
                </div>
            </div>
	    )
}
export default Streams;

