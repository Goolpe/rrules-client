import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';

class UserPageEditor extends Component {
  constructor(props){
    super(props);
    this.state ={
      pictureEdit: false,
      photo: '',
      dateBirth: '',
      rating: 0,
      gamesCount: 0,
      about: '',
      master: false,
      skype: '',
      discord: '',
      examples: [],
      systems: '',
      setting: '',
      paidGames: false
    }

  }
  componentDidMount() {
    window.scrollTo(0,0);

  }
  componentWillMount() {
      this.props.fetchPlayers();
    }
  render() {
    const searchId = this.props.players.filter(player=> player.username === this.props.match.params.nickname)
    .map(player =>
        <div key={player.userId}>
           
          </div>)
	  return (
  	  <section id="masterPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container mt-5 mb-5">
          {searchId}
          <div className="row">
          </div>
      	</div>
    	</section>
	  )
	}
}

UserPageEditor.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items
})

export default connect(mapStateToProps, { fetchPlayers })( UserPageEditor);
