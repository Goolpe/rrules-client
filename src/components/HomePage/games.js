import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGames } from '../actions/gameActions';
import moment from 'moment';

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

	 render(){ 
	 	let gamesSort = _.sortBy(this.props.games, ['from'])

	 	const listGames = gamesSort.map(game => 
	 		<div className="p-3 mb-4 bg-white text-left shadow-sm" key={game._id}>
	 			<div className="row justify-content-center">
					<div className="col-12 col-md-3">
						<p>Игра: {game.nameGame}</p>
						<p>Мастер: </p>
						<p>Рейтинг:</p>
						
					</div>
					<div className="col-12 col-md-9">
						{this.props.players.filter(master => game.masterId === master.userId)
 						.map(master => 
 						<div key={master.userId}>
	 						<p>Мастер: <Link to={`/@${master.username}`} target="_blank" key={master.userId} className="ml-2 mr-1">{master.username}</Link></p>
	 						<img className="rounded mb-2" alt={master.photo} src={master.photo} style={{height: "40px"}}/><br />
	 						<div className="btn btn-secondary">{master.rating}</div>
 						</div>
 					)}
 					<p>Дата и время игры: {moment(game.from).format('lll')}</p>
 					<p>Тип игры: {game.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}
 					 {game.selectedOption === "sortByTypeIRL" && <span className="ml-3">Город: {game.cityGame}</span>}</p>
 					<p className="d-flex-wrap" style={{wordWrap: "break-word"}}>Всего мест: {game.placeAll - game.gamersInsideId.length} / {game.placeAll}
 					<span className="ml-4">Игроки: {this.props.players.map(player=> 
 						(game.gamersInsideId
 							.filter(gamer => gamer === player.gamerId) 
 							.map(gamer => 
			 					<Link to={`/@${player.username}`} key={player.userId} target="_blank" className="ml-2 mr-1">{player.username}</Link>
		 						)
 							)
 					)}</span>
 					</p>
 					<p>Доп. информация: {game.infoGame.length === 0 ? "нет" : game.infoGame}</p>
					</div>
					{(game.placeAll - game.gamersInsideId.length) === 0 ? <Button color="danger" className="btn btn-danger mt-4 pl-5 pr-5" disabled>Нет мест</Button> 
	 					:
	 					<Button color="info" className="pl-5 mr-1 ml-1 pr-5">Записаться</Button>}
				</div>	
	 		</div>
	 		).slice(0,2)
	return (

	<section id="gamesPage">
			<div className="container pt-5 pb-5 text-center">
				<h1 className="text-dark mb-5">БЛИЖАЙШИЕ ИГРЫ</h1>
				{listGames}
				<Link to="/games" className="btn btn-info p-3 mb-2 mr-2">Посмотреть все игры</Link>
			</div>
		</section>
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

