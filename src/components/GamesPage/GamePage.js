import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Button } from 'reactstrap';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGame } from '../actions/gameActions';
import YouTube from 'react-youtube';
import { createMsg, fetchMsgs } from '../actions/msgActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaAngleLeft } from "react-icons/fa";

class GamePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: 'уведомление',
			text: 'игра'
		}
		this.handleFromChange = this.handleFromChange.bind(this);
   		this.handleToChange = this.handleToChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	} 

	componentDidMount() {
		window.scrollTo(0,0);
      	this.props.fetchPlayers();
      	this.props.fetchGame(this.props.match.params.id, this.props.history);
      	if(this.props.auth.isAuthenticated){
	      this.props.fetchMsgs(this.props.auth.user.playerId);
	  }
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

    _onReady(event) {
// access to player in all event handlers via event.target
	    event.target.pauseVideo();
	  }
// Handler of change input states  

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

	notify(word){toast.error(word)}
	notifySend(word){toast(word)}
// Handler of submit

	onSubmit(e){
		console.log(this.props.game.masterId)
		console.log(this.props.auth.user.playerId)
		e.preventDefault();
		if(!this.props.auth.isAuthenticated){
    		this.props.history.push('/auth')
    	}
    	else{	
    		if(this.props.game.masterId === this.props.auth.user.playerId){
    			this.notify("Вы создатель!")
    		}
    		else if(this.props.msgs.find(msg => msg.gameId === this.props.game._id && msg.sender === this.props.auth.user.playerId)){
    			if(this.props.game.gamersInsideId.includes(this.props.auth.user.playerId)){
    				this.notify("Вы уже в игре!")
    			}
    			else{
    				this.notify("Вы уже отправляли запрос!")
    			}
    		}
    		else{
	    		const msgData = {
			      	title: this.state.title,
					text: this.state.text,
					sender: this.props.auth.user.playerId,
					senderName: this.props.auth.user.name,
					receiverName: this.props.game.masterName,
					receiver: this.props.game.masterId,
					gameId: this.props.game._id,
					date: new Date()
			     }
				this.props.createMsg(msgData);
				this.notifySend("Запрос отправлен!")
				this.props.history.push(`/game/${this.props.game._id}`)
			}
    	}	
	}
  render() {
  	const opts = {
      height: '390',
      width: '100%',
      playerVars: { 
        autoplay: 0
      }
    };

  	const {user} = this.props.auth;
  	const game = this.props.game;
	  return (
	  	<section id="createGame">
			<div className="container text_card">
				<p className="text_card pb-4"><Link to="/games" className="text_card p-0 btn">
			        <FaAngleLeft size="1.5em"/> Все игры&nbsp;
			    </Link> 
			    | {game.nameGame || "Игра"}</p>

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
				<form onSubmit={this.onSubmit}>
				<div className="row justify-content-between">
					<div className="col-12 col-md-6">
						{game.masterName === user.name && 
							<Link to={`/game-edit/${game._id}`} className="btn btn-info mb-2">Редактировать/Удалить</Link>
						}
					</div>
					<div className="col-12 col-md-6 text-right">
					{game.gamersInsideId && (game.placeAll - game.gamersInsideId.length === 0) ? 
						<Button color="danger" className="mb-2" disabled>Мест нет</Button>
						:
						<Button type="submit" color="danger" className="mb-2">Играть</Button>
					}
					</div>
			    </div>
			    <div className="container mb-5">
		 			<div className="row p-3 align-items-begin bg_card shadow">
		 				<div className="col-12 col-md-9">
		 					<div className="row text-left justify-content-center">
		 						<div className="col-12 col-md-4">
		 							<p>{moment(game.from).format('lll')}</p>
		 						</div>
		 						<div className="col-12 col-md-3">
		 							<p>Места: {game.gamersInsideId && (game.placeAll - game.gamersInsideId.length)} / {game.placeAll}</p>
		 						</div>
		 						<div className="col-12 col-md-3">
		 							<p>{game.priceGame === 0 ? "Бесплатно" : game.priceGame}</p>
		 						</div>
		 						<div className="col-12 col-md-2">
		 							<p>Тип: {game.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}</p>
		 						</div>
			                </div>
			                <hr />
			                
			                <p>Превью: {game.infoGame === "" ? "нет" : game.infoGame}</p>
			                <hr />
			                {game.videoLink && game.videoLink.length > 0 && <YouTube videoId={game.videoLink} opts={opts} onReady={this._onReady} />}
		 				</div>
		 				<div className="col-12 col-md-3 text-center">
		 					{this.props.players.filter(master => game.masterName === master.name)
			 						.map(master => 
			 					<React.Fragment key={master._id} >
				 					<p>Мастер: <Link to={`/@${game.masterName}`} target="_blank" >{game.masterName}</Link></p>
				 					<p><FaStar className="text-warning" /> - {master.rating}/5</p>					
			 						<hr />
			 						<p>Игроки:</p>
			 						<ul>
				 						{this.props.players.map(player=> (game.gamersInsideId
					 							.filter(gamer => gamer === player._id)
					 							.map(gamer => {
								 					return (
								 						<React.Fragment key={player._id} >
								 						<Link to={`/@${player.name}`} target="_blank" >{player.name}</Link><br/>
								 						</React.Fragment>
								 						)
								 				}
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
		</section>
	  )
	}
}

GamePage.propTypes = {
  createMsg: PropTypes.func.isRequired,
  fetchMsgs: PropTypes.func.isRequired,
  fetchGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired

};

const mapStateToProps = state => ({
  game: state.game.item,
  msgs: state.msgs.items,
  players: state.players.items,
  auth: state.auth
})

export default connect(mapStateToProps, { createMsg, fetchMsgs, fetchGame, fetchPlayers })(withRouter(GamePage));