import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGames } from '../actions/gameActions';
import moment from 'moment';
import { MomentLocaleUtils, formatDate, parseDate } from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

 class GamesPage extends Component {
      constructor() {
        super();
        this.state = {
          currentPage: 1,
          todosPerPage: 4,
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

	componentDidMount() {
	  	window.scrollTo(0,0);
	}

	componentWillMount() {
		this.props.fetchGames();
		this.props.fetchPlayers();
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

        const renderTodos = currentTodos.filter(game=> game.archive === false).map((game,index) => 
          <Link to={`/game/${game._id}`} className="m-0 p-0 mb-4 btn text-left text-dark w-100" key={index}>
          <div className="p-3 userCard shadow-sm" >  
            <p className="pb-3 border-bottom">{game.nameGame}</p>       
            <div className="row">
              <div className="col-12 col-md-3">
                {this.props.players.filter(master => game.masterName === master.username)
                  .map(master => 
                  <div key={master._id}>
                    <p>Мастер: {master.username}</p>
                    <p><i className="fas fa-star text-warning fa-1x"></i> - {master.rating}/5</p>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-5">
                <p>Дата игры: {moment(game.from).format('lll')}</p>
                <p>Тип игры: {game.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}
                 {game.selectedOption === "sortByTypeIRL" && <span className="ml-3">Город: {game.cityGame}</span>}</p>
                
              </div>
              <div className="col-12 col-md-4">
                <p className="d-flex-wrap" style={{wordWrap: "break-word"}}>Всего мест: {game.placeAll - game.gamersInsideId.length} / {game.placeAll}
                </p>
                <p>Стоимость: {game.priceGame.length === 0 ? "Бесплатно" : game.priceGame}</p>
              </div>
            </div>
          </div>
          </Link>
          )

        const renderPageNumbers = pageNumbers.map(number => {
          return (
          	<PaginationItem key={number} >
  	          <PaginationLink id={number} className="shadow-sm text-dark rounded-0 border-0"  onClick={this.handleClick}>
  	            {number}
  	          </PaginationLink>
	        </PaginationItem>
          );
        });

        return (
        	<section id="gamesPage" style={{minHeight:"100vh"}}>  
              <div className="container pb-3 pt-3 p-0">
                <div className="row mr-0 ml-0">
                  <div className="col-12 col-lg-3">
                    <h2 className="text-dark text-left mb-3">ИГРЫ</h2>
                    <div className="container bg-white shadow-sm pt-3 pb-3">
                    {user.master && <Link to="/create-game" className="btn btn-info mb-2 w-100">Создать игру</Link>}
                   <ButtonDropdown isOpen={this.state.dropdownOpen} className="w-100 mb-2" toggle={this.toggle}>
                        <DropdownToggle caret className="btn btn-info w-100">
                          Сортировать: 
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={()=>{this.setState({sortByDate : true})}}>по дате</DropdownItem>
                          <DropdownItem onClick={()=>{this.setState({sortByDate : false})}}>по количеству мест</DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown><br/>

                      <label className="mr-2 mt-3">Удобные даты: </label><br/>
                    <div className="mb-2">
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
                  	<Pagination aria-label="Page navigation">
      			    	    {renderPageNumbers}
      		    	    </Pagination>
      	            	{renderTodos}
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
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  games: state.games.items,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchPlayers , fetchGames })(GamesPage);