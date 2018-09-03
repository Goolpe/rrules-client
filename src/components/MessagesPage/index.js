import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';

import { Button } from 'reactstrap';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchMsgs } from '../actions/msgActions';
import YouTube from 'react-youtube';
import { changeGameData } from '../actions/gameActions';

class MessagesPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			read: false,
			gamersInsideId: []
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	} 
	componentDidMount() {
	    window.scrollTo(0,0);
	    if(this.props.auth.isAuthenticated){
	    	this.props.history.push(`/msgs/${this.props.auth.user.name}`)
	    }
	    else{
	    	this.props.history.push('/auth')
	    }
	}

	componentWillMount() {
	  this.props.fetchMsgs();
      this.props.fetchPlayers();
    }

// Handler of change input states  

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

// Handler of submit

	onSubmit(e){
		e.preventDefault();
		const gameData = {
		    gamersInsideId: this.state.gamersInsideId,
	    }
		this.props.changeGameData(gameData);
	}
  render() {

  	const {user} = this.props.auth;
//declare consts for Datepicker  	
   	// const { from, to } = this.state;
    // const modifiers = { start: from, end: to };

    const messagesItems = this.props.msgs.filter(msg => msg.receiver === user.id || msg.sender === user.playerId)
    	.map(msg=> 
    		<div className="m-0 p-0 mb-2 btn text-left text-dark w-100" key={msg._id}>
    		<form onSubmit={this.onSubmit}>
 				<div className={msg.read ? "p-3 bg-white shadow-sm" : "p-3 bg-dark text-white shadow-sm"} >	
 					<div className="row align-items-center">
 					
 						<div className="col-12 col-md-3">
 							<p>{msg.title}</p>
 						</div>
 						<div className="col-12 col-md-5">
		 					Отправитель: <Link target="_blank" className="btn btn-info" to={`/@${this.props.players.find(player=> player._id === msg.sender).username}`}>{this.props.players.find(player=> player._id === msg.sender).username}</Link>
 						</div>
 						<div className="col-12 col-md-4">
 							<button type="submit" className="btn btn-info mr-3">Принять</button>
 							<button className="btn btn-danger mr-3">Отклонить</button>
 						</div>
 					
 					</div>
 				</div>
 			</form>
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