import React from 'react';

function Streams(props){	
	    return (
    		<div className="pt-3 pb-3">
    			<div className="row text-white">
                    <div className="col-12 col-md-6 mt-2">
                      <iframe width="100%" title="video1" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw" frameBorder="0" allowFullScreen></iframe>
                      </div>
                      <div className="col-12 col-md-6 mt-2">
                      <iframe width="100%" title="video2" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=1" frameBorder="0" allowFullScreen></iframe>
                      </div>
                    <div className="col-12 col-md-6 mt-2">
                      <iframe width="100%" title="video3" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=2" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="col-12 col-md-6 mt-2">
                      <iframe width="100%" title="video4" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=3" frameBorder="0" allowFullScreen></iframe>
                    </div>
                </div>
            </div>
	    )
}
export default Streams;

