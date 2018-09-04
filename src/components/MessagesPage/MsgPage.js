import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchMsg } from '../actions/msgActions';
import { changeGameData, fetchGame } from '../actions/gameActions';

class MsgPage extends Component {
	constructor(props){
		super(props);
		this.state={
			read: true,
			gamersInsideId: this.props.game.gamersInsideId
		}
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
	    window.scrollTo(0,0);
	    
	    if(this.props.auth.isAuthenticated){
	    	this.props.history.push(`/msg/${this.props.auth.user.name}/${this.props.match.params.id}`)
	    }
	    else{
	    	this.props.history.push('/auth')
	    }
	}

	componentWillMount() {
	  this.props.fetchMsg(this.props.match.params.id);
      this.props.fetchPlayers();
      this.props.fetchGame(this.props.msg.gameId);
    }

    onSubmit(e){
		e.preventDefault();
		console.log(this.state.gamersInsideId)
		const gameData = {
			id: this.props.msg.gameId,
		    gamersInsideId: this.state.gamersInsideId
	    }
		this.props.changeGameData(gameData);
	}
  render() {

  	const {user} = this.props.auth;
  	const msg = this.props.msg;
  	const game = this.props.game;
  	
	  return (
	  	<section id="messagesPage" style={{minHeight: "100vh"}}>
	  		<div className="container pt-5 pb-5">
	  			<form onSubmit={this.onSubmit}>
		  			<Link to={`/msgs/${this.props.auth.user.name}`} className="text-dark"><i className="text-dark fas fa-angle-left "></i> ВСЕ ПИСЬМА</Link>
		  			<h1 className="text-center mb-5">{msg.title}</h1>	
					<div className="p-3 bg-white shadow-sm" >	
	 					<div className="row align-items-center">
	 						<div className="col-12 col-md-6">
	 							<p className="m-0"><i className="fas fa-envelope-open text-success mr-3 fa-2x"></i> {moment(msg.date).format('LLL')}</p>
	 						</div>
	 						<div className="col-12 col-md-6">
			 					Отправитель: <Link target="_blank" to={`/@${msg.senderName}`}>{msg.senderName}</Link>
	 						</div>
	 					</div>
	 					<div className="text-center mt-5">
	 						<button type="submit" className="btn btn-info mr-3">Подтвердить</button>
	 						<button className="btn btn-danger mr-3">Отклонить</button>
	 					</div>
	 				</div>
 				</form>
			</div>
		</section>
	  )
	}
}

MsgPage.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
  fetchMsg: PropTypes.func.isRequired,
  msg: PropTypes.object.isRequired,
  changeGameData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game.item,
  msg: state.msg.item,
  players: state.players.items,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData, fetchGame, fetchMsg, fetchPlayers })(withRouter(MsgPage));