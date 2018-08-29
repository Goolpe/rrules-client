import React, { Component } from 'react';
import SchedulePage from '../StreamsPage/SchedulePage';
import { Link } from 'react-router-dom';

class Schedule extends Component {

  render() {
    return (
    	<React.Fragment>
    	<SchedulePage />
	    	<div style={{backgroundColor: "#20232c"}} className="pb-5">
				<div id="nextGame" className="container text-center text-white">	
					<div className="row ">
						<div className="col-12 col-md-4 mb-3 order-md-1">
							<Link to="/streams"><i className="fab fa-youtube text-danger fa-2x"> YOUTUBE</i></Link>
						</div>
						<div className="col-12 col-md-4 mb-3 order-md-3">
							<Link to="/streams"><i className="fab fa-twitch text-info fa-2x"> TWITCH</i></Link>
						</div>
						<div className="col-12 col-md-4 mb-3 order-md-2">
							<Link to="/streams" className="btn btn-outline-info p-3">СМОТРЕТЬ</Link>
						</div>
					</div>
		   		</div>
	   		</div>
	   	</React.Fragment>
    )
  }
}

export default Schedule;
