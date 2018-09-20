import React from 'react';

function Videos(props){	
	    return (
	    	<div className="pt-5" id="videos">
	    		<div className="container">
					<p className="text-white font-weight-bold">СМОТРИ</p>
					<p className="text-white font-weight-bold">УЧАВСТВУЙ</p>
		    		<div className="row text-white">
		    			<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video1" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw" frameBorder="0" allowFullScreen></iframe>
		    			</div>
		    			<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video2" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=1" frameBorder="0" allowFullScreen></iframe>
		    			</div>
						<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video3" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=2" frameBorder="0" allowFullScreen></iframe>
						</div>
						<div className="col-12 col-md-6 col-lg-3 mt-2">
		    			<iframe width="100%" title="video4" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=3" frameBorder="0" allowFullScreen></iframe>
						</div>
		    		</div>
	    		</div>
	    	</div>
	    )
}
export default Videos;

