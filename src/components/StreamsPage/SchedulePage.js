import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'moment/locale/ru';

class SchedulePage extends Component {
	constructor(props){
		super(props);
		this.state={
			now: ((new Date(2018, 7, 21, 19) - new Date())/1000)
		}
		this.date = this.date.bind(this);
	}
	componentDidMount() {
		this.timerID = setInterval(
		  () => this.tick(),
		  1000
		)
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	tick() {
		this.setState({
		  now: ((new Date(2018, 7, 21, 19) - new Date())/1000)
		});
	}
	date(){
		var newDay = Math.ceil(this.state.now/3600/24);
		var newDayHours = Math.ceil(this.state.now/3600%24);
		var newDayMinutes = Math.ceil(this.state.now/60%60);
		var newDaySeconds =  Math.ceil(this.state.now%60);
		return (newDay  + " дней " + newDayHours  + ":" + newDayMinutes + ":" + newDaySeconds);	
	}
  render() {
  	const modifiers = {
    gameDay: new Date(2018, 9, 30),
	  };
	  const modifiersStyles = {
	    gameDay: {
	      color: 'white',
	      backgroundColor: '#587ea2',
	      borderRadius: 0
	    },
	    outside: {
	      backgroundColor: 'rgba(0,0,0,0)'
	    },
	  };
    return (
    	<section id="schedule">
	    	<div className="container pt-5 pb-5 text-center">
				<h1 className="text-white mb-5">РАСПИСАНИЕ СТРИМОВ</h1>
				<DayPicker className="bg-dark text-white mb-5" localeUtils={MomentLocaleUtils} locale="ru" numberOfMonths={3}  modifiers={modifiers} modifiersStyles={modifiersStyles}/>
	   		</div>
	    </section> 
    )
  }
}

export default SchedulePage;
