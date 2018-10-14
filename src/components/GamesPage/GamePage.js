import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Button } from 'reactstrap';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPersons } from '../actions/personActions';
import { fetchGame, addPlayerGameData } from '../actions/gameActions';
import ReactPlayer from 'react-player';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaStar, FaAngleLeft } from "react-icons/fa";
import '../../styles/games.css';

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
      this.props.fetchPersons();
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

	notify(word){
		toast.error(word)
	}

	notifySend(word){
		toast(word)
	}

	handlePlayer(e){
		if(!this.props.auth.isAuthenticated){
    		this.props.history.push('/auth')
    	}
    else{	
  		if(this.props.game.gamersInsideId.find(msg=> msg.user === this.props.auth.user.id && msg.decline === true)){
  			this.notify("Мастер отклонил Ваш запрос!")
  		}
  		else{
    		const gameData = {
				id: this.props.game._id,
			    gamerInsideId: this.props.auth.user.id,
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
	  	<main className="game-page">
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
				<section className="text_card container">
					<div className="row">
						<div className="col-auto mr-auto p-0">
							<p className="text_card pb-4">
								<Link to="/games" className="text_card p-0 btn">
							        <FaAngleLeft size="1.5em"/> Все игры
							    </Link> 
							</p>
						</div>
						<div className="col-auto p-0">
							{game.name === user.id && 
								<Link to={`/game-edit/${game._id}`} className="btn btn-outline-info rounded-0 mb-2 mr-2">Редактировать</Link>
							}
							{(game.name === user.id  || (game.gamersInsideId && game.gamersInsideId.find(gamer => gamer.user === user.id && gamer.accept === true))) 
								?
								<Button className="mb-2 btn-outline-secondary" disabled>Вы в игре</Button>
								:
								game.gamersInsideId && game.gamersInsideId.find(gamer => gamer.user === user.id && gamer.decline === true) 
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
				 					<h1 className="p-3">{game.nameGame}</h1>
				 				</div>
		 						<figure className="col-12 mb-4">
				 					{game.videoLink && game.videoLink.length > 0 ? 
				 						<ReactPlayer width="100%" height="500px" url={game.videoLink} controls />
				 						: game.preview && <img width="100%" alt={game.name} src={game.preview} />}
				 				</figure>
		 						<div className="col-12 col-lg-4">
		 							<time>{moment(game.from).format('lll')}</time>
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
		 					{this.props.persons.filter(master => game.name === master.id)
			 						.map((master,index) => 
			 					<React.Fragment key={index} >
				 					<p><Link to={`/@${master.name}`} className="text-white" target="_blank" >{master.name} </Link>
				 					<FaStar className="text-warning" /> - {master.rating}/5</p>
			 						<hr />
			 						<p>Игроки:</p>
			 						<ul>
				 						{this.props.persons.filter(player => game.gamersInsideId
				 							.find(gamerInside => gamerInside.accept === true && gamerInside.user === player.id))
				 							.map((gamer,index) => 
						 						<React.Fragment key={index} >
						 							<Link to={`/@${gamer.name}`} className="text-white" target="_blank" >{gamer.name}</Link><br/>
						 						</React.Fragment>
						 					)	
			 							}
			 						</ul>
				 				</React.Fragment>
			 				)}
		 				</div>
		 			</div>			
			</section>
		</main>
	  )
	}
}

GamePage.propTypes = {
  fetchGame: PropTypes.func,
  game: PropTypes.object,
  auth: PropTypes.object,
  fetchPersons: PropTypes.func,
  persons: PropTypes.array,
  addPlayerGameData: PropTypes.func
};

const mapStateToProps = state => ({
  game: state.game.item,
  persons: state.persons.items,
  auth: state.auth
})

export default connect(mapStateToProps, { addPlayerGameData, fetchGame, fetchPersons })(withRouter(GamePage));