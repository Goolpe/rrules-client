import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';

class UsersPage extends Component {
	componentDidMount() {
		window.scrollTo(0,0);
	}
	componentWillMount() {
      this.props.fetchPlayers();
    }
	render(){
		const users = this.props.players.filter(user => user.master === false)
			.map(user =>
			<div className="col-12 col-md-6 col-lg-4 mb-5" key={user.userId}>
				<Link to={`/@${user.username}`} className="text-white">
					<div className="wrapper bg-white"  style={ { backgroundImage: `url(${user.photo})`} }>
						<div className="card d-flex align-items-center justify-content-center rounded-0" >
							<div className="btn btn-secondary position-absolute" style={{top:"20px", left:"20px"}}>{user.rating}</div>
						  	<h1 style={{textShadow: 'black 0 0 20px'}}>{user.username.toUpperCase()}</h1>
						</div>
					</div>
				</Link>
			</div>)
	    return (
	    	<section id="users" style={{minHeight: "100vh"}}>
	    		<div className="container text-center">
					<h1 className="text-center pb-5 pt-5">ИГРОКИ</h1>
					<div className="row">
					 	{users}
					</div>
				</div>
	    	</section>
	    )
	}
}

UsersPage.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items
})

export default connect(mapStateToProps, { fetchPlayers })(UsersPage);