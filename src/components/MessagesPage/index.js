import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchMsgs } from '../actions/msgActions';
import { changeGameData } from '../actions/gameActions';

class MessagesPage extends Component {

	componentDidMount() {
	    window.scrollTo(0,0);
	    if(this.props.auth.isAuthenticated ){
	    	this.props.history.push('/messages')
	    }
	    else{
	    	this.props.history.push('/auth')
	    }
	}

	componentWillMount() {
	  this.props.fetchMsgs(this.props.auth.user.id);
      this.props.fetchPlayers();
    }

  render() {

  	const {user} = this.props.auth;

    const messagesItems = this.props.msgs.filter(msg => msg.receiver === user.id || msg.sender === user.playerId)
    	.map(msg=> 
 				<div className="p-3 mb-1 bg-white shadow-sm" key={msg._id}>	
 					<div className="row align-items-center">
 						<div className="col-12 col-md-4">
 							<p className="m-0"><i className={msg.read ? "fas fa-envelope-open text-success mr-3 fa-2x" : "fas fa-envelope text-danger mr-3 fa-2x"}></i> {moment(msg.date).format('LLL')}</p>
 						</div>
 						<div className="col-12 col-md-4">
		 					Отправитель: <Link target="_blank" to={`/@${msg.senderName}`}>{msg.senderName}</Link>
 						</div>
 						<div className="col-12 col-md-4">
 							<Link to={`/msg/${msg._id}`} className="btn btn-info mr-3">Открыть</Link>
 						</div>
 					</div>
 				</div>
    	)
	  return (
	  	<section id="messagesPage" style={{minHeight: "100vh"}}>
	  		<div className="container pt-5 pb-5">
	  			<h1 className="text-center mb-5">Сообщения</h1>	
				{messagesItems}
			</div>
		</section>
	  )
	}
}

MessagesPage.propTypes = {
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

export default connect(mapStateToProps, { changeGameData, fetchMsgs, fetchPlayers })(withRouter(MessagesPage));