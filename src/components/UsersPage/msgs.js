import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { changeGameData, fetchGames } from '../actions/gameActions';
import { FaTimes } from "react-icons/fa";

class Msgs extends Component {
	constructor(props) {
	    super(props);
	    this.handleAccept = this.handleAccept.bind(this);
	    this.handleDecline = this.handleDecline.bind(this);
	  }
	componentDidMount() {
		if(this.props.auth.isAuthenticated){
			this.props.fetchGames(),
			this.props.fetchPlayers()
		}
		this.interval = setInterval(() => {
          this.props.auth.isAuthenticated &&
          this.props.fetchGames() && 
          this.props.fetchPlayers()
        }, 1000);
    }

	componentWillUnmount() {
	    clearInterval(this.interval);
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
    handleDelete(game, sender, msgacc, msgdec){
    	if(msgdec === false && msgacc === false){
    		msgdec = true
    	}
    	const gameData = {
			id: game,
		    gamerInsideId: sender,
		    accept: msgacc,
		    decline: msgdec,
		    show: false
	    };
		this.props.changeGameData(gameData);
    }
	 render(){ 
	 	var messagesItems = this.props.games.filter(game => game.name === this.props.auth.user.player).map(game =>
	 		game.gamersInsideId.filter(gamer => gamer.show === true)
	 		.map((msg,index) => 
	 			<div className="shadow bg_card text_card p-3 mb-3" key={index}>
		 			<div className="row align-items-center">
						<div className="col-12 col-md-4">
							{this.props.players.filter(player=> msg.user === player._id).map((player, index)=>
								<React.Fragment key={index}>Отправитель: <Link target="_blank" className="mr-3" to={`/@${player.name}`}>{player.name}</Link></React.Fragment>
							)}
						</div>
						<div className="col-12 col-md-3">
							Игра: <Link target="_blank" to={`/game/${game._id}`}>{game.nameGame}</Link>
						</div>
						<div className="col-12 col-md-4">
							{!msg.accept && !msg.decline ?
								<React.Fragment>
									<button className="btn btn-info mr-3" onClick={()=>{this.handleAccept(game._id, msg.user)}}>Подтвердить</button>
									<button className="btn btn-danger mr-3" onClick={()=>{this.handleDecline(game._id, msg.user)}}>Отклонить</button>
								</React.Fragment>
							:
								msg.accept ? "Вы добавили игрока" : "Отклонен"
							}
						</div>
						<div className="col-12 col-md-1">
							<button className="btn bg-transparent text_card userpage__facog" onClick={()=>{this.handleDelete(game._id, msg.user, msg.accept, msg.decline)}}><FaTimes size="1.5em"/></button>
						</div>
					</div>
				</div>
	 		)
	 	)
	return (
		<React.Fragment>
		{messagesItems}
		</React.Fragment>
	)
	}
}

Msgs.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  changeGameData: PropTypes.func.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  games: state.games.items,
  players: state.players.items,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData, fetchGames, fetchPlayers })(withRouter(Msgs));

