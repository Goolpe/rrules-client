import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import Rating from 'react-rating';

class MastersPage extends Component {
	constructor(props) {
	    super(props);
	    this.toggle = this.toggle.bind(this);
	    this.state = {
	      	dropdownOpen: false,
	      	viewList: true
	    }
	  }
	componentDidMount() {
		window.scrollTo(0,0);
	}
	toggle() {
	    this.setState({
	      dropdownOpen: !this.state.dropdownOpen
	    });
	}
	componentWillMount() {
      this.props.fetchPlayers();
    }
	render(){
		var mastersSort = _.sortBy(this.props.players, ['rating']).reverse()

		const mastersView = mastersSort.filter(master => master.master === true)
		.map(master => 
				<div className="col-12 col-md-6 col-lg-4 mb-5" key={master._id}>
					<Link to={`/@${master.username}`} className="text-white">
						<div className="wrapper bg-white"  style={ { backgroundImage: `url(${master.photo})`} }>
							<div className="card d-flex align-items-center justify-content-center rounded-0" >
							  	<h1 style={{textShadow: 'black 0 0 20px'}}>{master.username.toUpperCase()}</h1>
							</div>
						</div>
					</Link>
				</div>
				)
		const mastersList = mastersSort.filter(master => master.master === true)
		.map(master => 
	 				<div className="col-12" key={master._id}>
	 					<Link to={`/@${master.username}`} className="text-dark ">	
		 					<div className="row p-3 text-left align-items-start userCard mb-4 shadow-sm">
		 						<div className="col-12 col-md-4">
		 							<p className="m-0">{master.username}</p>
		 						</div>
		 						<div className="col-12 col-md-4">
		 							<Rating  emptySymbol="far fa-star text-warning fa-1x"  initialRating={master.rating} fullSymbol="fas fa-star text-warning fa-1x" fractions={2} readonly/>
		 						</div>
		 						<div className="col-12 col-md-4">
		 							<p className="m-0">Количество игр: {master.gamesCount}</p>
		 						</div>
		 					</div> 					
	 					</Link>			
	 				</div>
		)	
	    return (
	    	<section id="masters" style={{minHeight: "100vh"}}>
	    		<div className="container text-center">
					<h1 className="text-center pt-5 pb-2">МАСТЕРА КАНАЛА</h1>
					<div className="d-flex justify-content-end align-items-center pb-2">
						<p className="m-0">Вид:</p>
						<button className="btn bg-transparent ml-2" onClick={()=>this.setState({viewList: false})}><i className={this.state.viewList ? "text-dark fas fa-th-large fa-2x" : "text-info fas fa-th-large fa-2x"}></i></button>
						<button className="btn bg-transparent" onClick={()=>this.setState({viewList: true})}><i  className={this.state.viewList ? "text-info fas fa-th-list fa-2x" : "text-dark fas fa-th-list fa-2x"}></i></button>
				    </div>
				    <div className="row">
					 	{this.state.viewList ? mastersList : mastersView  }
					</div>
				</div>
	    	</section>
	    )
	}
}

MastersPage.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items
})

export default connect(mapStateToProps, { fetchPlayers })(MastersPage);