import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGames } from '../actions/gameActions';
import moment from 'moment';
import { FaStar } from "react-icons/fa";
import YouTube from 'react-youtube';

class Games extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	dropdownOpen: false
	    }
	  }
	  componentDidMount() {
	    window.scrollTo(0,0);
	}

	componentWillMount() {
	  this.props.fetchGames();
      this.props.fetchPlayers(); 
    }

    _onReady(event) {
	    event.target.pauseVideo();
	}

	 render(){ 
	 	const opts = {
	      height: '100%',
	      width: '100%',
	      playerVars: { 
	        autoplay: 0
	      }
	    };
	 	let gamesSort = _.sortBy(this.props.games, ['from'])

	 	const listGames = gamesSort.map(game => 
	 		<Link to={`/game/${game._id}`} className="m-0 p-0 mb-4 btn text-left text-dark w-100" key={game._id}>
 				<div className="shadow page_card">
	                <div className="row">
	                  <div className="col-12 col-md-4">
	                  	{game.videoLink && game.videoLink.length > 0 && <YouTube videoId={game.videoLink} opts={opts} onReady={this._onReady} />}
	                  </div>
	                  <div className="col-12 col-md-8">
	                  	<p className="pb-3 border-bottom">{game.nameGame}</p>       
			            <div className="row">
			              <div className="col-12 col-md-3">
			                {this.props.players.filter(master => game.masterName === master.username)
			                  .map(master => 
			                  <div key={master._id}>
			                    <p>Мастер: {master.username}</p>
			                    <p><FaStar className="text-warning" /> - {master.rating}/5</p>
			                  </div>
			                )}
			              </div>
			              <div className="col-12 col-md-5">
			                <p>Дата игры: {moment(game.from).format('lll')}</p>
			                <p>Тип игры: {game.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}
			                 {game.selectedOption === "sortByTypeIRL" && <span className="ml-3">Город: {game.cityGame}</span>}</p>
			                
			              </div>
			              <div className="col-12 col-md-4">
			                <p className="d-flex-wrap" style={{wordWrap: "break-word"}}>Всего мест: {game.placeAll - game.gamersInsideId.length} / {game.placeAll}
			                </p>
			                <p>Стоимость: {game.priceGame.length === 0 ? "Бесплатно" : game.priceGame}</p>
			              </div>
			            </div>
	                  </div>
	                </div>
	            </div>
	 		</Link>
	 		).slice(0,2)
	return (
		<React.Fragment>
			{listGames}
		</React.Fragment>
	)
	}
}

Games.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  games: state.games.items
})


export default connect(mapStateToProps, { fetchPlayers , fetchGames })(Games);

