import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru'
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame } from '../actions/gameActions';

class CreateGamePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameGame: '',
			selectedOption: 'sortByTypeOnline',
		    masterId: '',
		    cityGame:'',
		    priceGame:'',
		    placeAll: '',
		    gamersInsideId: [],
		    infoGame: '',
		    placeGame:'',
		    from: undefined,
      		to: undefined
		}
		this.handleFromChange = this.handleFromChange.bind(this);
   		this.handleToChange = this.handleToChange.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
		this.setState({ from });
	}
	handleToChange(to) {
		this.setState({ to }, this.showFromMonth);
	}

	componentDidMount() {
	    window.scrollTo(0,0);
	}

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}
	onSubmit(e){
		e.preventDefault();
		if(Date.parse(this.state.from) > Date.parse(new Date()) && Date.parse(this.state.from) < Date.parse(this.state.to)){
			const game = {
				nameGame: this.state.nameGame,
				cityGame: this.state.cityGame,
			    masterId: this.state.masterId,
			    placeGame: this.state.placeGame,
			    priceGame: this.state.priceGame,
			    infoGame: this.state.infoGame,
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
			    from: '',
			    to: ''
			})
			alert("Готово!")
		}
		else{
			return alert("Укажите правильную дату")
		}
	}
  render() {
   	const { from, to } = this.state;
    const modifiers = { start: from, end: to };

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
		 			<div className="row p-3 align-items-begin bg-white shadow-sm">
		 				<div className="col-12">
		 					<label className="mr-2">Название: </label>
		 					<input type="text" value={this.state.nameGame} onChange={this.onChange} name="nameGame" placeholder="" required/><br />
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
					        <label className="mr-2 mt-3">Тип игры: </label>
					        <input type="radio" value="sortByTypeOnline" onChange={()=>{this.setState({selectedOption: 'sortByTypeOnline'})}} checked={this.state.selectedOption === 'sortByTypeOnline'} id="radio10"/><label className="pl-2 mr-2" htmlFor="radio10"> Online </label>
					        <input type="radio" value="sortByTypeIRL" onChange={()=>{this.setState({selectedOption: 'sortByTypeIRL'})}} checked={this.state.selectedOption === 'sortByTypeIRL'} id="radio11"/><label className="pl-2" htmlFor="radio11"> IRL </label>
					        {this.state.selectedOption === "sortByTypeIRL"  &&
		 						<div>
		 							<label className="mr-2 mt-3">Город: </label>
		 							<input type="string" value={this.state.cityGame} style={{width:"50%"}} onChange={this.onChange} name="cityGame" placeholder=""/><br/>
		 							<label className="mr-2 mt-3">Место провидения: </label>
		 							<input type="string" value={this.state.placeGame} style={{width:"50%"}} onChange={this.onChange} name="placeGame" placeholder=""/>
		 						</div> 
		 					}
		 					<div>
		 						<label className="mr-2 mt-3">Стоимость: </label>
		 						<input type="string" value={this.state.priceGame} onChange={this.onChange} name="priceGame" placeholder=""/><br />
		 					</div> 
		 					<label className="mr-2 mt-3">Количество мест: </label>
		 					<input type="number" min="1" max="20" value={this.state.placeAll} onChange={this.onChange} name="placeAll" placeholder="" required/><br />
		 					<label className="mt-3">Доп. информация:</label>
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