import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame, fetchGames, changeGameData } from '../actions/gameActions';


class GameEditPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameGame: '',
			selectedOption: 'sortByTypeOnline',
		    cityGame:'',
		    priceGame:'',
		    placeAll: '',
		    gamersInsideId: [],
		    infoGame: '',
		    placeGame:'',
		    videoLink:'',
		    from: undefined,
      		to: undefined,
      		archive: false
		}
		this.handleFromChange = this.handleFromChange.bind(this);
   		this.handleToChange = this.handleToChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	} 

// functions for datepicker

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

	componentDidMount() {
	    window.scrollTo(0,0);
	    if(this.props.auth.isAuthenticated){
	    	this.props.history.push(`/edit-game/${this.props.match.params.id}`)
	    }
	}

	componentWillMount() {
	  this.props.fetchGames();
    }
// Handler of change input states  

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

// Handler of submit

	onSubmit(e){
		e.preventDefault();
		const gameData = {
			archive: this.state.archive,
			id: this.props.match.params.id,
			nameGame: this.state.nameGame,
			cityGame: this.state.cityGame,
		    masterName: this.props.auth.user.name,
		    placeGame: this.state.placeGame,
		    priceGame: this.state.priceGame,
		    infoGame: this.state.infoGame,
		    videoLink: this.state.videoLink,
		    selectedOption: this.state.selectedOption,
		    placeAll: this.state.placeAll,
		    gamersInsideId: this.state.gamersInsideId,
		    from: this.state.from,
		    to: this.state.to
	    }
		this.props.changeGameData(gameData);
		if (this.state.archive === false){
			this.props.history.push(`/game/${this.props.match.params.id}`)
		}
		else{
			this.props.history.push('/games')
		}
	}
  render() {

//declare consts for Datepicker  	
   	// const { from, to } = this.state;
    // const modifiers = { start: from, end: to };

    const gameEdit = this.props.games.filter(game=> game._id === this.props.match.params.id)
    		.map(game => 
	 				<div className="container mb-5" key={game._id}>
		 			<div className="row p-3 align-items-begin bg-white shadow-sm">
		 				<div className="col-12">
{/*Name of the game*/}
		 					<label className="mr-2">Название: </label>
		 					<input type="text" value={this.state.nameGame} className="w-100" onFocus = {(e)=>{e.currentTarget.value = game.nameGame}} onChange={this.onChange} name="nameGame" placeholder={game.nameGame}/><br />
{/*Date and time*/}
		 					{/*<label className="mr-2 mt-3">Дата и время игры: </label>
		 					<DayPickerInput
					          value={from}
					          format="LLL"
					          formatDate={formatDate}
					          parseDate={parseDate}
					          placeholder={moment(game.from).format('LLL')}
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
					        />{' '}
					        —{' '}
					          <DayPickerInput
					            ref={el => (this.to = el)}
					            value={to}
					            format="LLL"
					            formatDate={formatDate}
					            parseDate={parseDate}
					            placeholder={moment(game.to).format('LLL')}
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
					          />
					        <br />*/}
{/*Type of the game*/}
					        <label className="mr-2 mt-3">Тип игры: </label>
					        <div className="custom-control custom-radio mb-2">
							    <input type="radio" className="custom-control-input" value="sortByTypeOnline" onChange={()=>{this.setState({selectedOption: 'sortByTypeOnline'})}} checked={this.state.selectedOption === 'sortByTypeOnline'} id="radio1" />
							    <label className="custom-control-label" htmlFor="radio1">Online</label>
							</div>
							<div className="custom-control custom-radio mb-2">
							    <input type="radio" className="custom-control-input" value="sortByTypeIRL" onChange={()=>{this.setState({selectedOption: 'sortByTypeIRL'})}} checked={this.state.selectedOption === 'sortByTypeIRL'} id="radio2" />
							    <label className="custom-control-label" htmlFor="radio2">IRL</label>
							</div>
					        {this.state.selectedOption === "sortByTypeIRL"  &&
		 						<div>
		 							<label className="mr-2 mt-3">Город: </label>
		 							<input type="string" value={this.state.cityGame} style={{width:"50%"}} onFocus = {(e)=>{e.currentTarget.value = game.cityGame}} onChange={this.onChange} name="cityGame" placeholder={game.cityGame}/><br/>
		 							<label className="mr-2 mt-3">Место проведения: </label>
		 							<input type="string" value={this.state.placeGame} style={{width:"50%"}} onFocus = {(e)=>{e.currentTarget.value = game.placeGame}} onChange={this.onChange} name="placeGame" placeholder={game.placeGame}/>
		 						</div> 
		 					}
{/*Price*/}
		 					<div>
		 						<label className="mr-2 mt-3">Стоимость: </label>
		 						<input type="string" value={this.state.priceGame} onFocus = {(e)=>{e.currentTarget.value = game.priceGame}} onChange={this.onChange} name="priceGame" placeholder={game.priceGame}/><br />
		 					</div>
		 					<div>
		 						<label className="mr-2 mt-3">Ссылка на стрим: </label>
		 						<input type="string" value={this.state.videoLink} className="w-100" onFocus = {(e)=>{e.currentTarget.value = game.videoLink}} onChange={this.onChange} name="videoLink" placeholder={game.videoLink}/><br />
		 					</div> 
{/*Number of seats*/}
		 					<label className="mr-2 mt-3">Количество мест: </label>
		 					<input type="number" min="1" max="20" value={this.state.placeAll} onFocus = {(e)=>{e.currentTarget.value = game.placeAll}} onChange={this.onChange} name="placeAll" placeholder={game.placeAll}/><br />
{/*Additionally info*/}		 					
		 					<label className="mt-3">Превью:</label>
		 					<textarea type="text" value={this.state.infoGame} onFocus = {(e)=>{e.currentTarget.value = game.infoGame}} style={{resize: "both", width: "100%", minHeight: "200px"}} onChange={this.onChange} name="infoGame" placeholder={game.infoGame} />
		 				</div> 	
		 			</div>	
		 		</div>		
	 		)
	  return (
	  	<section id="createGame" style={{minHeight: "100vh"}}>
			<div className="container pt-5 pb-5">
				<h1 className="text-dark text-center mb-5">РЕДАКТИРОВАТЬ ИГРУ</h1>
				<form onSubmit={this.onSubmit}>
{/*Button to create game and exit*/}
				<div className="d-flex justify-content-end">
					<button type="submit" onClick={()=>{this.setState({archive: true})}} className="btn btn-danger rounded-0 mb-2 mr-2">Удалить</button>
					<button type="submit" className="btn btn-info rounded-0 mb-2 mr-2">Подтвердить</button>
					<Link to={`/game/${this.props.match.params.id}`} className="btn btn-outline-info rounded-0 mb-2">Выйти из редактора</Link>
			    </div>
			    {gameEdit}
		 		</form>
			</div>
		</section>
	  )
	}
}

GameEditPage.propTypes = {
  fetchGames: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  changeGameData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  games: state.games.items,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData , createGame, fetchGames })(withRouter(GameEditPage));