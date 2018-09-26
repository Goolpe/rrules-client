import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchMsgs, changeMsgData } from '../actions/msgActions';
import { changeGameData, fetchGames } from '../actions/gameActions';

class Msgs extends Component {
	constructor(props) {
	    super(props);
	    this.handleAccept = this.handleAccept.bind(this);
	    this.handleDecline = this.handleDecline.bind(this);
	  }
	componentDidMount() {
		if(this.props.auth.isAuthenticated){
	      	this.props.fetchPlayers();
	      	this.props.fetchGames();
	      }
    }
    handleAccept(game, sender){
		const gameData = {
			id: game,
		    gamerInsideId: sender,
		    accept: true,
		    decline: false
	    }
		this.props.changeGameData(gameData)
    }
    handleDecline(game, sender){
		const gameData = {
			id: game,
		    gamerInsideId: sender,
		    accept: false,
		    decline: true
	    };
		this.props.changeGameData(gameData);
    }
	 render(){ 
	 	var messagesItems;
	 	this.props.games.filter(games => games.name === this.props.auth.user.player).map(game=> 
	 		messagesItems = game.gamersInsideId.map((msg,index) => 
	 			<div className="row align-items-center" key={index}>
					<div className="col-12 col-md-6">
						{this.props.players.filter(player=> msg.user === player._id).map((player, index)=>
							<React.Fragment key={index}>Отправитель: <Link target="_blank" className="mr-3" to={`/@${player.name}`}>{player.name}</Link></React.Fragment>
						)}
					</div>
					<div className="col-12 col-md-6">
						{!msg.accept && !msg.decline ?
							<React.Fragment>
								<button className="btn btn-info mr-3" onClick={()=>{this.handleAccept(game._id, msg.user)}}>Подтвердить</button>
								<button className="btn btn-danger mr-3" onClick={()=>{this.handleDecline(game._id, msg.user)}}>Отклонить</button>
							</React.Fragment>
						:
							msg.accept ? "Вы добавили игрока" : "Отклонен"
						}
					</div>
				</div>
	 		)
	 	)
	return (
		<div className="shadow bg_card text_card p-5 mb-3">
		{messagesItems ||	
			<div style={{height: "100%"}} className="d-flex align-items-center justify-content-center">
				<h1 className="text-center text-muted" >Сообщений нет</h1>
			</div>
		}
		</div>
	)
	}
}

Msgs.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchMsgs: PropTypes.func.isRequired,
  msgs: PropTypes.array.isRequired,
  changeGameData: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  changeMsgData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  games: state.games.items,
  players: state.players.items,
  msgs: state.msgs.items,
  msg: state.msg.item,
  auth: state.auth
})

export default connect(mapStateToProps, { changeMsgData, changeGameData, fetchGames, fetchMsgs, fetchPlayers })(withRouter(Msgs));

