import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import 'moment/locale/ru';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame } from '../actions/gameActions';

class CreateGamePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameGame: '',
		    masterId: '',
		    placeAll: '',
		    gamersInsideId: [],
		    infoGame: '',
		    selectedDay: ''
		}
		this.handleDayChange = this.handleDayChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	} 
  handleDayChange(selectedDay, modifiers) {
    this.setState({
      selectedDay
    });
  }
	componentDidMount() {
	    window.scrollTo(0,0);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}
	onSubmit(e){
		e.preventDefault();

		if(this.state.selectedDay > new Date()){
			const game = {
				nameGame: this.state.nameGame,
			    masterId: this.state.masterId,
			    placeAll: this.state.placeAll,
			    gamersInsideId: this.state.gamersInsideId,
			    date: this.state.selectedDay,
			    infoGame: this.state.infoGame
		     }
			this.props.createGame(game);
			this.setState({
				nameGame: '',
			    placeAll: '',
			    infoGame: '',
			    selectedDay: ''
			})
			alert("Готово!")
		}
		else{
			return alert("Укажите правильную дату")
		}
		
	}
  render() {
  	const { selectedDay } = this.state;
	  return (
	  	<section id="createGame" style={{minHeight: "100vh"}}>
			<div className="container pt-5 pb-5">
				<h1 className="text-dark text-center">СОЗДАТЬ ИГРУ</h1>
				<form onSubmit={this.onSubmit}>
				<div className="d-flex justify-content-end">
					<button type="submit" className="btn btn-outline-info rounded-0 mb-2 mr-2">Создать игру</button>
					<Link to="/games" className="btn btn-outline-info rounded-0 mb-2">Выйти из редактора</Link>
			    </div>
			    <div className="container mb-5">
		 			<div className="row p-3 align-items-begin border">
		 				<div className="col-12 col-md-4">
		 					<label className="mr-2">Название: </label>
		 					<input type="text" value={this.state.nameGame} onChange={this.onChange} name="nameGame" placeholder="" required/><br />
		 					<label className="mr-2">Дата игры: </label>
		 					<DayPickerInput
						        formatDate={formatDate}
						        parseDate={parseDate}
						        format="LLL"
						        placeholder={`${formatDate(new Date(), 'LLL', 'ru')}`}
						        onDayChange={this.handleDayChange}
						        dayPickerProps={{
						          	locale: 'ru',
						          	localeUtils: MomentLocaleUtils,
						          	selectedDays: selectedDay
						        }}
						      />

		 					<label className="mr-2">Количество мест: </label>
		 					<input type="number" min="1" max="20" value={this.state.placeAll} onChange={this.onChange} name="placeAll" placeholder="" required/>
		 				</div> 
		 				<div className="col-12 col-md-8">
		 					<label>Доп. информация:</label>
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
  createGame: PropTypes.func.isRequired
};

export default connect(null, { createGame })(CreateGamePage);