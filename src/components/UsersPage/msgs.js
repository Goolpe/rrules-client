import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchMsgs } from '../actions/msgActions';
import { changeGameData, fetchGames } from '../actions/gameActions';

class Msgs extends Component {
	componentDidMount() {
		if(this.props.auth.isAuthenticated){
		  	this.props.fetchMsgs(this.props.auth.user.player);
	      	this.props.fetchPlayers();
	      	this.props.fetchGames();
	      }
    }
	 render(){ 
	 	const messagesItems = this.props.msgs.filter(msg => msg.receiver === this.props.auth.user.player).map((msg, index)=> 
			<div className="row align-items-center" key={index}>
				<div className="col-12 col-md-4">
					<p className="m-0">{moment(msg.date).format('L')}</p>
				</div>
				<div className="col-12 col-md-4">
					{this.props.players.filter(player=> player._id === msg.sender).map((player, index)=>
						<React.Fragment key={index}>Отправитель: <Link target="_blank" className="mr-3" to={`/@${player.name}`}>{player.name}</Link></React.Fragment>
					)}
					
				</div>
				<div className="col-12 col-md-4">
					{this.props.games.filter(game => msg.messages.find(msgs => msgs.message === game._id && !game.gamersInsideId.includes(msg.sender))) ?
					<React.Fragment>
						<button type="submit" className="btn btn-info mr-3">Подтвердить</button>
						<button className="btn btn-danger mr-3">Отклонить</button>
					</React.Fragment>
					:
					<React.Fragment>Вы уже ответили</React.Fragment>}
				</div>
			</div>

    	)
	return (
		<div className="shadow bg_card text_card p-5 mb-3">
			{messagesItems.length ? messagesItems.reverse() : <div style={{height: "100%"}} className="d-flex align-items-center justify-content-center"><h1 className="text-center text-muted" >Сообщений нет</h1></div>}
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
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  games: state.games.items,
  players: state.players.items,
  msgs: state.msgs.items,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData, fetchGames, fetchMsgs, fetchPlayers })(withRouter(Msgs));

