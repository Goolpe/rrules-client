import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import { Button } from 'reactstrap';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGames } from '../actions/gameActions';
import YouTube from 'react-youtube';

class GamePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameGame: '',
			selectedOption: 'sortByTypeOnline',
		    cityGame:'',
		    priceGame:'',
		    placeAll: '',
		    gamersInsideId: [],
		    infoGame: '',
		    placeGame:'',
		    from: undefined,
      		to: undefined
		}
		this.handleFromChange = this.handleFromChange.bind(this);
   		this.handleToChange = this.handleToChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handlePlay = this.handlePlay.bind(this);
	} 

// functions for datepicker

    showFromMonth() {
    	const { from, to } = this.state;
	    if (!from) {
	      return;
	    }
	    if (moment(to).diff(moment(from), 'months') < 2) {
	      this.to.getDayPicker().showMonth(from);
	    }
	}
	handleFromChange(from) {
		this.setState({ from });
	}
	handleToChange(to) {
		this.setState({ to }, this.showFromMonth);
	}

	componentDidMount() {
	    window.scrollTo(0,0);
	}

	componentWillMount() {
	  this.props.fetchGames();
      this.props.fetchPlayers();
    }

    handlePlay(){
    	if(this.props.auth.isAuthenticated === false){
    		this.props.history.push('/auth')
    	}
    	else{
    	}
    }

    _onReady(event) {
	    // access to player in all event handlers via event.target
	    event.target.pauseVideo();
	  }
// Handler of change input states  

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

// Handler of submit

	onSubmit(e){
		e.preventDefault();
		
	}
  render() {
  	const opts = {
      height: '390',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

  	const {user} = this.props.auth;
//declare consts for Datepicker  	
   	// const { from, to } = this.state;
    // const modifiers = { start: from, end: to };

    const gameItems = this.props.games.filter(game => game._id === this.props.match.params.id)
    	.map(game=> 
    		<div className="container pt-5 pb-5" key={game._id}>
				<h1 className="text-dark text-center mb-5">{game.nameGame}</h1>
				<form onSubmit={this.onSubmit}>

				<div className="row justify-content-between">
					<div className="col-12 col-md-6">
						{game.masterName === user.name && 
							<Link to={`/edit-game/${game._id}`} className="btn btn-info mb-2">Редактировать/Удалить</Link>
						}
					</div>
					<div className="col-12 col-md-6 text-right">
					{game.placeAll - game.gamersInsideId.length === 0 ? 
						<Button color="danger" className="mb-2 mr-2" disabled>Мест нет</Button>
						:
						<Button type="submit" onClick={this.handlePlay} color="danger" className="mb-2 mr-2">Играть</Button>
					}
					<Link to="/games" className="btn btn-outline-info rounded-0 mb-2">Выйти из комнаты</Link>
					</div>
			    </div>
			    <div className="container mb-5">
		 			<div className="row p-3 align-items-begin bg-white shadow-sm">
		 				<div className="col-12 col-md-9">
		 					<div className="row text-left justify-content-center">
		 						<div className="col-12 col-md-4">
		 							<p>{moment(game.from).format('lll')}</p>
		 						</div>
		 						<div className="col-12 col-md-3">
		 							<p>Места: {game.placeAll - game.gamersInsideId.length} / {game.placeAll}</p>
		 						</div>
		 						<div className="col-12 col-md-3">
		 							<p>{game.priceGame.length === 0 ? "Бесплатно" : game.priceGame}</p>
		 						</div>
		 						<div className="col-12 col-md-2">
		 							<p>Тип: {game.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}</p>
		 						</div>
			                </div>
			                <hr />
			                
			                <p>Превью: {game.infoGame.length === 0 ? "нет" : game.infoGame}</p>
			                <hr />
			                {game.videoLink.length > 0 && <YouTube videoId={game.videoLink} opts={opts} onReady={this._onReady} />}
		 				</div>
		 				<div className="col-12 col-md-3 text-center">
		 					{this.props.players.filter(master => game.masterName === master.username)
			 						.map(master => 
			 					<React.Fragment key={master._id} >
				 					<p>Мастер: <Link to={`/@${game.masterName}`} target="_blank" >{game.masterName}</Link></p>
				 					<p><i className="fas fa-star text-warning fa-1x"></i> - {master.rating}/5</p>
			 						<img src={master.photo} alt={game.masterName} height="200px" className="mb-3"/>
			 						<hr />
			 						<p>Игроки:</p>
			 						<ul>
				 						{this.props.players.map(player=> 
					 						(game.gamersInsideId
					 							.filter(gamer => gamer === player.gamerId) 
					 							.map(gamer => 

								 					<li>{player.username}</li>
							 						)
					 							)
				 							)}
			 						</ul>
				 				</React.Fragment>
			 				)}
		 				</div>
		 			</div>	
		 		</div>		
		 		</form>
			</div>
    	)
	  return (
	  	<section id="createGame" style={{minHeight: "100vh"}}>
			{gameItems}
		</section>
	  )
	}
}

GamePage.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  games: state.games.items,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchGames, fetchPlayers })(withRouter(GamePage));