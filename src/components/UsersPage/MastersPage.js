import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/postActions';

class MastersPage extends Component {
	componentDidMount() {
		window.scrollTo(0,0);
	}
	render(){
		const masters = this.props.players.map((master, index) =>
			<div className="col-12 col-md-6 col-lg-4 mb-5" key={master.userId}>
				<Link to={`/@${master.username}`} className="text-white">
					<div className="wrapper"  style={ { backgroundImage: `url(${master.photo})`} }>
						<div className="card d-flex align-items-center justify-content-center rounded-0" >
						  <h1 style={{textShadow: 'black 0 0 20px'}}>{master.username.toUpperCase()}</h1>
						</div>
					</div>
				</Link>
			</div>
		)	
	    return (
	    	<section id="masters">
	    		<div className="container text-center">
					<h1 className="text-center mb-5 mt-5">ИГРОКИ</h1>
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