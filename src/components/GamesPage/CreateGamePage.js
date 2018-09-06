import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame } from '../actions/gameActions';
import { fetchPlayers } from '../actions/playerActions';

class CreateGamePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameGame: '',
			masterId:'',
			selectedOption: 'sortByTypeOnline',
		    cityGame:'',
		    priceGame:'',
		    placeAll: '',
		    gamersInsideId: [],
		    infoGame: '',
		    placeGame:'',
		    videoLink:'',
		    from: undefined,
      		to: undefined
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
	    	this.props.history.push("/create-game")
	    }
	    else{
	    	this.props.history.push("/")
	    }
	}

// Handler of change input states  

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

// Handler of submit

	onSubmit(e){
		e.preventDefault();

		var reg = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w]+\?v=|embed\/|v\/)?)([\w]+)(\S+)?$/;
		if(this.state.videoLink.length > 0){
			if(this.state.videoLink.match(reg) === null){
				alert("Укажите правильную ссылку на видео")
				return false
			}
			else {
				var video_id = this.state.videoLink.match(reg)[5]
			}
		}
		else{
			video_id = this.state.videoLink
		}

		if(Date.parse(this.state.from) > Date.parse(new Date()) && Date.parse(this.state.from) < Date.parse(this.state.to)){
			const game = {
				nameGame: this.state.nameGame,
				cityGame: this.state.cityGame,
			    masterName: this.props.auth.user.name,
			    masterId: this.props.auth.user.id,
			    placeGame: this.state.placeGame,
			    priceGame: this.state.priceGame,
			    infoGame: this.state.infoGame,
			    videoLink: video_id,
			    selectedOption: this.state.selectedOption,
			    placeAll: this.state.placeAll,
			    gamersInsideId: this.state.gamersInsideId,
			    from: this.state.from,
			    to: this.state.to
		     }
			this.props.createGame(game);
			this.setState({
				nameGame: '',
				cityGame: '',
				priceGame:'',
			    placeAll: '',
			    selectedOption: 'sortByTypeOnline',
			    infoGame: '',
			    placeGame: '',
			    from: undefined,
			    to: undefined,
			    videoLink: ''
			})
			alert("Готово!")
		}
		else{
			return alert("Укажите правильную дату")
		}
	}
  render() {

//declare consts for Datepicker  	
   	const { from, to } = this.state;
    const modifiers = { start: from, end: to };

	  return (
	  	<section id="createGame" style={{minHeight: "100vh"}}>
			<div className="container pt-5 pb-5">
				<h1 className="text-dark text-center mb-5">СОЗДАТЬ ИГРУ</h1>
				<form onSubmit={this.onSubmit}>
{/*Button to create game and exit*/}
				<div className="d-flex justify-content-end">
					<button type="submit" className="btn btn-outline-info rounded-0 mb-2 mr-2">Создать игру</button>
					<Link to="/games" className="btn btn-outline-info rounded-0 mb-2">Выйти из редактора</Link>
			    </div>
			    <div className="container mb-5">
		 			<div className="row p-3 align-items-begin bg-white shadow-sm">
		 				<div className="col-12">
{/*Name of the game*/}
		 					<label className="mr-2">Название: </label>
		 					<input type="text" value={this.state.nameGame} className="w-100" onChange={this.onChange} name="nameGame" placeholder="" required/><br />
{/*Date and time*/}
		 					<label className="mr-2 mt-3">Дата и время игры: </label>
		 					<DayPickerInput
					          value={from}
					          placeholder="Начало"
					          format="LLL"
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
					        />{' '}
					        —{' '}
					          <DayPickerInput
					            ref={el => (this.to = el)}
					            value={to}
					            placeholder="Конец"
					            format="LLL"
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
					          />
					        <br />
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
		 							<input type="string" value={this.state.cityGame} style={{width:"50%"}} onChange={this.onChange} name="cityGame" placeholder=""/><br/>
		 							<label className="mr-2 mt-3">Место проведения: </label>
		 							<input type="string" value={this.state.placeGame} style={{width:"50%"}} onChange={this.onChange} name="placeGame" placeholder=""/>
		 						</div> 
		 					}
{/*Price*/}
		 					<div>
		 						<label className="mr-2 mt-3">Стоимость: </label>
		 						<input type="string" value={this.state.priceGame} onChange={this.onChange} name="priceGame" placeholder=""/><br />
		 					</div>
		 					<div>
		 						<label className="mr-2 mt-3">Ссылка на стрим: </label>
		 						<input type="string" value={this.state.videoLink} className="w-100" onChange={this.onChange} name="videoLink" placeholder="YouTube" /><br />
		 					</div> 
{/*Number of seats*/}
		 					<label className="mr-2 mt-3">Количество мест: </label>
		 					<input type="number" min="1" max="20" value={this.state.placeAll} onChange={this.onChange} name="placeAll" placeholder="" required/><br />
{/*Additionally info*/}		 					
		 					<label className="mt-3">Превью:</label>
		 					<textarea type="text" value={this.state.infoGame} style={{resize: "both", width: "100%", minHeight: "200px"}} onChange={this.onChange} name="infoGame" placeholder="" />
		 				</div> 	
		 			</div>	
		 		</div>		
		 		</form>
			</div>
		</section>
	  )
	}
}

CreateGamePage.propTypes = {
  createGame: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  players: state.players.items,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchPlayers , createGame })(withRouter(CreateGamePage));