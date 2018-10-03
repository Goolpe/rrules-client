import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Button } from 'reactstrap';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGame, addPlayerGameData } from '../actions/gameActions';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaAngleLeft } from "react-icons/fa";

class GamePage extends Component {
	constructor(props){
		super(props);
		this.handleFromChange = this.handleFromChange.bind(this);
   		this.handleToChange = this.handleToChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handlePlayer = this.handlePlayer.bind(this);
	} 

	componentDidMount() {
		window.scrollTo(0,0);
      	this.props.fetchPlayers();
      	this.props.fetchGame(this.props.match.params.id, this.props.history);
    }

// datepicker methods

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

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

	notify(word){toast.error(word)}
	notifySend(word){toast(word)}

	handlePlayer(e){
		if(!this.props.auth.isAuthenticated){
    		this.props.history.push('/auth')
    	}
    	else{	
    		if(this.props.game.name === this.props.auth.user.player){
    			this.notify("Вы создатель!")
    		}
    		else if(this.props.game.gamersInsideId.find(msg=> msg.user === this.props.auth.user.player && msg.accept === true)){
    			this.notify("Вы уже в игре!")
    		}
    		else if(this.props.game.gamersInsideId.find(msg=> msg.user === this.props.auth.user.player && msg.accept === false && msg.decline === false)){
    			this.notify("Вы уже отправляли запрос!")
    		}
    		else if(this.props.game.gamersInsideId.find(msg=> msg.user === this.props.auth.user.player && msg.decline === true)){
    			this.notify("Мастер отклонил Ваш запрос!")
    		}
    		else{
	    		const gameData = {
					id: this.props.game._id,
				    gamerInsideId: this.props.auth.user.player,
				    accept: false,
				    decline: false,
				    show: true
			    };
				this.props.addPlayerGameData(gameData);
				this.notifySend("Запрос отправлен!")
				this.props.history.push(`/game/${this.props.game._id}`)
			}
    	}	
	}
  render() {
  	const {user} = this.props.auth;
  	const game = this.props.game;
	  return (
	  	<section id="gamePage">
	  		<ToastContainer
					position="top-center"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnVisibilityChange
					draggable
					pauseOnHover
					/>
			<div className="text_card container">
					<div className="row">
						<div className="col-auto mr-auto p-0">
							<p className="text_card pb-4">
								<Link to="/games" className="text_card p-0 btn">
							        <FaAngleLeft size="1.5em"/> Все игры
							    </Link> 
							</p>
						</div>
						<div className="col-auto p-0">
							{game.name === user.player && 
								<Link to={`/game-edit/${game._id}`} className="btn btn-outline-info rounded-0 mb-2 mr-2">Редактировать</Link>
							}
							{(game.name === user.player  || (game.gamersInsideId && game.gamersInsideId.find(gamer => gamer.user === user.player && gamer.accept === true))) 
								?
								<Button className="mb-2 btn-outline-secondary" disabled>Вы в игре</Button>
								:
								game.gamersInsideId && game.gamersInsideId.find(gamer => gamer.user === user.player && gamer.decline === true) 
									?
									<Button color="danger" className="mb-2" disabled>Отклонен</Button>
									:
									(game.gamersInsideId && game.placeAll - game.gamersInsideId.length === 0) 
										? 
										<Button color="btn-outline-secondary" className="mb-2" disabled>Мест нет</Button>
										:
										<Button onClick={this.handlePlayer} color="danger" className="mb-2">Играть</Button>
							}
						</div>
					</div>
		 			<div className="row p-3 align-items-begin bg_card shadow">
		 				<div className="col-12 col-md-9">
		 					<div className="row text-center">
		 						<div className="col-12">
				 					<p>{game.nameGame}</p>
				 				</div>
		 						<div className="col-12 mb-4">
				 					{game.videoLink && game.videoLink.length > 0 ? 
				 						<ReactPlayer width="100%" height="500px" url={game.videoLink} controls />
				 						: <img width="100%" alt={game.name} src={game.preview} />}
				 				</div>
		 						<div className="col-12 col-lg-4">
		 							<p>{moment(game.from).format('lll')}</p>
		 						</div>
		 						<div className="col-12 col-lg-2">
		 							<p>{game.gamersInsideId && (game.placeAll - (game.gamersInsideId.filter(gamerInside => gamerInside.accept === true).length))} / {game.placeAll}</p>
		 						</div>
		 						<div className="col-12 col-lg-2">
		 							<p>{game.priceGame === 0 ? "Бесплатно" : game.priceGame}</p>
		 						</div>
		 						<div className="col-12 col-lg-4">
		 							<p>{game.selectedOption === "sortByTypeOnline" ? 
					                  <span>Online</span>
					                  : 
					                  <span>IRL | {game.cityGame}</span>}
					                </p>
		 						</div>
		 						<div className="col-12">
		 							{game.infoGame !== "" && 
					                	<React.Fragment>
						                	<p>Информация: {game.infoGame}</p>
						                	<hr />
					                	</React.Fragment>
					                }
		 						</div>
			                </div>
		 				</div>
		 				<div className="col-12 col-md-3">
		 					{this.props.players.filter(master => game.name === master._id)
			 						.map(master => 
			 					<React.Fragment key={master._id} >
				 					<p><Link to={`/@${master.name}`} className="text-info" target="_blank" >{master.name} </Link>
				 					<FaStar className="text-warning" /> - {master.rating}/5</p>
			 						<hr />
			 						<p>Игроки:</p>
			 						<ul>
				 						{this.props.players.filter(player => game.gamersInsideId
				 							.find(gamerInside => gamerInside.accept === true && gamerInside.user === player._id))
				 							.map(gamer => 
						 						<React.Fragment key={gamer._id} >
						 							<Link to={`/@${gamer.name}`} className="text-info" target="_blank" >{gamer.name}</Link><br/>
						 						</React.Fragment>
						 					)	
			 							}
			 						</ul>
				 				</React.Fragment>
			 				)}
		 				</div>
		 			</div>			
			</div>
		</section>
	  )
	}
}

GamePage.propTypes = {
  fetchGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  addPlayerGameData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game.item,
  players: state.players.items,
  auth: state.auth
})

export default connect(mapStateToProps, { addPlayerGameData, fetchGame, fetchPlayers })(withRouter(GamePage));