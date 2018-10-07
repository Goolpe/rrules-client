import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers, fetchPlayer } from '../actions/playerActions';
import { fetchGames } from '../actions/gameActions';
import moment from 'moment';
import 'moment/locale/ru';
import { MomentLocaleUtils, formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { FaGamepad  } from "react-icons/fa";
import Games from './GamesBlock';

class GamesPage extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      todosPerPage: 3,
      from: undefined,
      to: undefined,
      sortByDate: true,
      sortByRate: false,
      dropdownOpen: false,
      selectedOption:'sortByTypeAll',
      sortByCityGame: ''
    }
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount() {
    window.scrollTo(0,0);
    this.props.fetchGames();
    this.props.fetchPlayers();
  }
  
	handleFromChange(from) {
		this.setState({ from });
	}

	handleToChange(to) {
		this.setState({ to }, this.showFromMonth);
	}

	// Toggle for dropdown menu
	toggle() {
	  this.setState({
	    dropdownOpen: !this.state.dropdownOpen
	  });
	}

	// Handler of change input states  
	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

	handleClick(event) {
		this.setState({
		  currentPage: Number(event.target.id)
		});
	}

  render() {
      const {user} = this.props.auth;
	//datepiceker consts
	    const { from, to } = this.state;
	    const modifiers = { start: from, end: to };

	//sort by date
	    var gamesSort;

	    this.state.sortByDate ? (gamesSort = _.sortBy(this.props.games, ['from'])) :
	    (gamesSort = _.sortBy(this.props.games, ['placeAll']).reverse())

	//sort by type IRL
	    this.state.selectedOption === "sortByTypeIRL" && (gamesSort = gamesSort.filter( game => 
	      this.state.sortByCityGame.length === 0 ? game.cityGame
        :
	        this.state.sortByCityGame.length <= game.cityGame.length && game.cityGame.toLowerCase().includes(this.state.sortByCityGame.toLowerCase()) 
          ?
	          game.cityGame	:	false 
	    ))

	// sort by type online
	    this.state.selectedOption === "sortByTypeOnline" && (gamesSort = gamesSort.filter(game => 
	        game.selectedOption === "sortByTypeOnline"))

	// date sort from
	    this.state.from && (gamesSort = gamesSort.filter(game => 
	        Date.parse(game.from) >= Date.parse(this.state.from)))

	// date sort to
	    this.state.to && (gamesSort = gamesSort.filter(game => 
	        Date.parse(game.from) < (Date.parse(this.state.to) + 43200000)))

      const {currentPage, todosPerPage } = this.state;

      // Logic for displaying page numbers
      const indexOfLastTodo = currentPage * todosPerPage;
      const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
      const currentTodos = gamesSort.slice(indexOfFirstTodo, indexOfLastTodo);

      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(gamesSort.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }

      const renderPageNumbers = pageNumbers.map(number => {
        return (
        	<PaginationItem key={number}>
            {pageNumbers.length > 1 && 
  	          <PaginationLink id={number} className="shadow bg_card text_card rounded-0 border-0 mr-2"  onClick={this.handleClick}>
  	            {number}
  	          </PaginationLink>
            }
        </PaginationItem>
        );
      });

      return (
      	<main id="gamesPage">  
          <section className="container text-white">
            <h1 className="text_card">
              <FaGamepad size="1.5em"/> Игры 
            </h1>
            <section className="row pt-5">
              <div className="col-12 col-lg-3 mt-2">
                <div className="container bg_card shadow text_card pt-3 pb-3">
                  {this.props.players.find(playerUser => user.player === playerUser._id && playerUser.status !== "игрок" ) && <Link to="/game-create" className="btn btn-info mb-2 w-100">Создать игру</Link>}
                    <ButtonDropdown isOpen={this.state.dropdownOpen} className="w-100 mb-2" toggle={this.toggle}>
                      <DropdownToggle caret className="btn btn-info w-100">
                        Сортировать: 
                      </DropdownToggle>
                      <DropdownMenu className="bg-white">
                        <DropdownItem onClick={()=>{this.setState({sortByDate : true})}}>по дате</DropdownItem>
                        <DropdownItem onClick={()=>{this.setState({sortByDate : false})}}>по количеству мест</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown><br/>

                    <label className="mr-2 mt-3">Удобные даты: </label><br/>
                  <div className="mb-2 text-dark">
                    <DayPickerInput
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
                        />
                    </div>
                    <div className="text-dark">
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
                        />
                      </div>
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
              <div className="col-12 col-lg-9 mt-2">
                <Games currentTodos={currentTodos} />
              	<Pagination aria-label="Page navigation">
  			    	    {renderPageNumbers}
  		    	    </Pagination>
  	          </div>
            </section>
          </section>
      </main>
    )
  }
}


GamesPage.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  fetchPlayer: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  player: state.player.item,
  games: state.games.items,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchPlayers, fetchPlayer , fetchGames })(GamesPage);