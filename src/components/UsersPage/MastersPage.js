import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';

class MastersPage extends Component {
	componentDidMount() {
		window.scrollTo(0,0);
	}
	componentWillMount() {
      this.props.fetchPlayers();
    }
	render(){
		const masters = this.props.players.filter(master =>	master.master === true)
		.map(master => 
			<div className="col-12 col-md-6 col-lg-4 mb-5" key={master.userId}>
				<Link to={`/@${master.username}`} className="text-white">
					<div className="wrapper bg-white"  style={ { backgroundImage: `url(${master.photo})`} }>
						<div className="card d-flex align-items-center justify-content-center rounded-0" >
							<div className="btn btn-secondary position-absolute" style={{top:"20px", left:"20px"}}>{master.rating}</div>
						  	<h1 style={{textShadow: 'black 0 0 20px'}}>{master.username.toUpperCase()}</h1>
						</div>
					</div>
				</Link>
			</div>
		)	
	    return (
	    	<section id="masters" style={{minHeight: "100vh"}}>
	    		<div className="container text-center">
					<h1 className="text-center pb-5 pt-5">МАСТЕРА</h1>
					<div className="row">
					 	{masters}
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