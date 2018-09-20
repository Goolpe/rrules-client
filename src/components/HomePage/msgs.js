import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchMsgs } from '../actions/msgActions';
import { changeGameData } from '../actions/gameActions';

class Msgs extends Component {
	componentWillMount() {
		if(this.props.auth.isAuthenticated){
		  	this.props.fetchMsgs(this.props.auth.user.playerId);
	      	this.props.fetchPlayers();
	      }
    }

	 render(){ 
	 	const messagesItems = this.props.msgs.filter(msg=> msg.receiver === this.props.auth.user.playerId).map(msg=> 
 					<div className="text-white" key={msg._id}>
 						<p className="m-0"><i className={msg.read ? "fas fa-envelope-open text-success mr-3 fa-2x" : "fas fa-envelope text-danger mr-3 fa-2x"}></i>{moment(msg.date).format('LLL')}</p>
		 				Отправитель: <Link target="_blank" className="mr-3" to={`/@${msg.senderName}`}>{msg.senderName}</Link>
 						<Link to={`/msg/${msg._id}`} className="btn btn-info mr-3">Открыть</Link>
 					</div>
    	)
	return (
		<div className="shadow bg_card mb-4 p-5">
			{this.props.msgs.length ? messagesItems.reverse() : <div style={{height: "100%"}} className="d-flex align-items-center justify-content-center"><h1 className="text-center text-muted" >Сообщений нет</h1></div>}
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
  changeGameData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  msgs: state.msgs.items,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData, fetchMsgs, fetchPlayers })(withRouter(Msgs));

