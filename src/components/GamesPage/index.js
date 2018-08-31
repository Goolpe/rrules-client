import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGames, deleteGame } from '../actions/gameActions';
import moment from 'moment';
import MomentLocaleUtils from 'react-day-picker/moment';
import { formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

var gamesSort;

class GamesPage extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      	from: undefined,
	      	to: undefined,
	    	sortByDate: true,
	    	sortByRate: false,
	      	dropdownOpen: false,
	      	selectedOption:'sortByTypeAll',
	      	sortByCityGame: '',
	    }
	    this.handleFromChange = this.handleFromChange.bind(this);
	    this.handleToChange = this.handleToChange.bind(this);
	    this.toggle = this.toggle.bind(this);
	    this.onChange = this.onChange.bind(this);
	    // this.deleteGame = this.deleteGame.bind(this);
	  }
	componentDidMount() {
	    window.scrollTo(0,0);
	 }

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
	    // Change the from date and focus the "to" input field
	    this.setState({ from });
	  }
	  handleToChange(to) {
	    this.setState({ to }, this.showFromMonth);
	  }

	toggle() {
	    this.setState({
	      dropdownOpen: !this.state.dropdownOpen
	    });
	}

	// deleteGame(gameData){
	// 	console.log(gameData);
	// 	this.props.deleteGame(gameData);
	// }
	componentWillMount() {
	  this.props.fetchGames();
      this.props.fetchPlayers();
    }

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}
	 render(){ 
	 	const {isAuthenticated, user} = this.props.auth;
	 	const { from, to } = this.state;
    	const modifiers = { start: from, end: to };

	 	this.state.sortByDate ? (gamesSort = _.sortBy(this.props.games, ['from'])) :
	 	(gamesSort = _.sortBy(this.props.games, ['placeAll']).reverse())

	 	this.state.selectedOption === "sortByTypeIRL" && (gamesSort = gamesSort.filter( game => {
	 		if(this.state.sortByCityGame.length === 0){
	 			return game.selectedOption === "sortByTypeIRL" && game.cityGame
	 		}
	 		else{
	 			if(this.state.sortByCityGame.length <= game.cityGame.length ){
	 				if(game.cityGame.toLowerCase().includes(this.state.sortByCityGame.toLowerCase())){
	 					return game.selectedOption === "sortByTypeIRL" && game.cityGame
	 				}		
				}else{
					return false
				}	
			}
	 	}))

	 	this.state.selectedOption === "sortByTypeOnline" && (gamesSort = gamesSort.filter(game => 
	 			game.selectedOption === "sortByTypeOnline"))

	 	this.state.from && (gamesSort = gamesSort.filter(game => 
	 			Date.parse(game.from) >= Date.parse(this.state.from)))

	 	this.state.to && (gamesSort = gamesSort.filter(game => 
	 			Date.parse(game.from) < (Date.parse(this.state.to) + 43200000)))

	 	const listGames = gamesSort.map(game => 
	 				<div className="p-3 mb-4 bg-white shadow-sm" key={game._id}>	 					
	 					<div className="row">
	 						<div className="col-12 col-md-3">
	 							{this.props.players.filter(master => game.masterName === master.username)
			 						.map(master => 
			 						<div key={master._id}>
				 						<p>Мастер: <Link to={`/@${master.username}`} target="_blank" key={master.userId} className="ml-2 mr-1">{master.username}</Link></p>
				 						<p><i className="fas fa-star text-warning fa-1x"></i> - {master.rating}/5</p>
			 						</div>
			 					)}
		 						
	 						</div>
	 						<div className="col-12 col-md-9">
	 							
			 					<p>Дата и время игры: {moment(game.from).format('lll')}</p>
			 					<p>Тип игры: {game.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}
			 					 {game.selectedOption === "sortByTypeIRL" && <span className="ml-3">Город: {game.cityGame}</span>}</p>
			 					<p className="d-flex-wrap" style={{wordWrap: "break-word"}}>Всего мест: {game.placeAll - game.gamersInsideId.length} / {game.placeAll}
			 					<span className="ml-4">Игроки: {this.props.players.map(player=> 
			 						(game.gamersInsideId
			 							.filter(gamer => gamer === player.gamerId) 
			 							.map(gamer => 
						 					<Link to={`/@${player.username}`} key={player.userId} target="_blank" className="ml-2 mr-1">{player.username}</Link>
					 						)
			 							)
			 					)}</span>
			 					</p>
			 					<p>Доп. информация: {game.infoGame.length === 0 ? "нет" : game.infoGame}</p>
			 					{game.masterName === user.name && <button className="position-absolute btn btn-outline-danger" style={{top:"5%",left:"90%"}}><i className="fas fa-times"></i></button>}
	 						</div>
	 					</div>
	 					
	 					{(game.placeAll - game.gamersInsideId.length) === 0 ? <Button color="danger" className="btn btn-danger mt-4 pl-5 pr-5" disabled>Нет мест</Button> 
				 					:
				 					<Button color="info" className="pl-5 mr-1 ml-1 pr-5">Записаться</Button>}
	 				</div>
	 		)
	return (

	<section id="gamesPage" style={{minHeight:"100vh"}}>	
			<div className="container pt-5 pb-5 p-0">
			<h1 className="text-dark text-center mb-5">ИГРЫ</h1>
			    <div className="row mr-0 ml-0">
			    	<div className="col-12 col-lg-3">
			    		<div className="container">
			    		{user.master && <Link to="/create-game" className="btn btn-info mb-2 w-100">Создать игру</Link>}
						 <ButtonDropdown isOpen={this.state.dropdownOpen} className="w-100 mb-2" toggle={this.toggle}>
					        <DropdownToggle caret className="btn btn-outline-info w-100">
					          Сортировать: 
					        </DropdownToggle>
					        <DropdownMenu>
					          <DropdownItem onClick={()=>{this.setState({sortByDate : true})}}>по дате</DropdownItem>
					          <DropdownItem onClick={()=>{this.setState({sortByDate : false})}}>по количеству мест</DropdownItem>
					        </DropdownMenu>
					      </ButtonDropdown><br/>
					      <label className="mr-2 mt-3">Удобные даты: </label><br/>
		 					<span className="mr-2"><DayPickerInput
		 						inputProps={{ style: { width: "100%" } }}
					          value={from}
					          placeholder=" с"
					          format="LL"
					          formatDate={formatDate}
					          parseDate={parseDate}
					          dayPickerProps={{
					            selectedDays: [from, { from, to }],
					            disabledDays: { before: new Date(), after: this.state.to  },
					            toMonth: to,
					            modifiers,
					            locale: 'ru',
					            localeUtils: MomentLocaleUtils,
					            numberOfMonths: 1,
					           	onDayClick: () => this.to.getInput().focus(),
					            
					          }}
					          onDayChange={this.handleFromChange}
					        /></span>
					          <DayPickerInput
					          	inputProps={{ style: { width: "100%" } }}
					            ref={el => (this.to = el)}
					            value={to}
					            placeholder=" по"
					            format="LL"
					            formatDate={formatDate}
					            parseDate={parseDate}
					            dayPickerProps={{
					              selectedDays: [from, { from, to }],
					              disabledDays: { before: this.state.from || new Date()},
					              modifiers,
					              locale: 'ru',
					              localeUtils: MomentLocaleUtils,
					              month: from,
					              fromMonth: from,
					              numberOfMonths: 1,
							      onDayClick: () => this.to.getInput().focus()
					            }}
					            onDayChange={this.handleToChange}
					          /><br />
{/*type of the games*/}
					      <label className="mr-2 mt-3">Тип игры: </label><br/>
					      	<div className="custom-control custom-radio mb-2">
							    <input type="radio" className="custom-control-input" value="sortByTypeAll" onChange={()=>{this.setState({selectedOption: 'sortByTypeAll'})}} checked={this.state.selectedOption === 'sortByTypeAll'} id="radio0" />
							    <label className="custom-control-label" htmlFor="radio0">Все</label>
							</div>
							<div className="custom-control custom-radio mb-2">
							    <input type="radio" className="custom-control-input" value="sortByTypeOnline" onChange={()=>{this.setState({selectedOption: 'sortByTypeOnline'})}} checked={this.state.selectedOption === 'sortByTypeOnline'} id="radio1" />
							    <label className="custom-control-label" htmlFor="radio1">Online</label>
							</div>
							<div className="custom-control custom-radio mb-2">
							    <input type="radio" className="custom-control-input" value="sortByTypeIRL" onChange={()=>{this.setState({selectedOption: 'sortByTypeIRL'})}} checked={this.state.selectedOption === 'sortByTypeIRL'} id="radio2" />
							    <label className="custom-control-label" htmlFor="radio2">IRL</label>
							</div>
					      	{this.state.selectedOption === "sortByTypeIRL"  &&
		 						<div className=" mb-4">
		 							<label className="mr-2 mt-3">Город: </label>
		 							<input type="string" value={this.state.sortByCityGame} style={{width:"100%"}} onChange={this.onChange} name="sortByCityGame" placeholder=""/><br />
		 						</div> 
		 					}	
		 					</div>
					</div>
			    	<div className="col-12 col-lg-9">
						{listGames}
					</div>
				</div>
			</div>
		</section>
	)
	}
}

GamesPage.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  deleteGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  games: state.games.items,
  auth: state.auth
})


export default connect(mapStateToProps, { deleteGame, fetchPlayers , fetchGames })(GamesPage);

