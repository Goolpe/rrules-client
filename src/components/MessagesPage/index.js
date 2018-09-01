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

class MessagesPage extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
		
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

	} 
	componentDidMount() {
	    window.scrollTo(0,0);
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
		
	}
  render() {

  	const {user} = this.props.auth;
//declare consts for Datepicker  	
   	// const { from, to } = this.state;
    // const modifiers = { start: from, end: to };

    const messagesItems = this.props.msgs.filter(msg => msg.recipient === user.id || msg.sender === user.id)
    	.map(msg=> 
    		<Link to={`/message/${msg._id}`} className="m-0 p-0 mb-4 btn text-left text-dark w-100" key={msg._id}>
 				<div className="p-3 userCard shadow-sm" >	 
 					<p className="pb-3 border-bottom">Сообщения</p>				
 					<div className="row">
 						<div className="col-12 col-md-3">
 							{this.props.players.filter(master => msg.masterName === master.username)
		 						.map(master => 
		 						<div key={master._id}>
			 						<p>Мастер: {master.username}</p>
			 						<p><i className="fas fa-star text-warning fa-1x"></i> - {master.rating}/5</p>
		 						</div>
		 					)}
 						</div>
 						<div className="col-12 col-md-5">
		 					<p>Дата игры: {moment(msg.from).format('lll')}</p>
		 					<p>Тип игры: {msg.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}
		 					 {msg.selectedOption === "sortByTypeIRL" && <span className="ml-3">Город: {msg.citymsg}</span>}</p>
		 					
 						</div>
 						<div className="col-12 col-md-4">
 							<p className="d-flex-wrap" style={{wordWrap: "break-word"}}>Всего мест: {msg.placeAll - msg.msgrsInsideId.length} / {msg.placeAll}
		 					</p>
		 					<p>Стоимость: {msg.pricemsg.length === 0 ? "Бесплатно" : msg.pricemsg}</p>
 						</div>
 					</div>
 				</div>
	 		</Link>
    	)
	  return (
	  	<section id="messagesPage" style={{minHeight: "100vh"}}>
			{messagesItems}
		</section>
	  )
	}
}

MessagesPage.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchMsgs: PropTypes.func.isRequired,
  msgs: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  msgs: state.msgs.items,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchMsgs, fetchPlayers })(withRouter(MessagesPage));