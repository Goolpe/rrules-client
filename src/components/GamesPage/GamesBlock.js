import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGames } from '../actions/gameActions';
import moment from 'moment';
import { FaStar } from "react-icons/fa";

class Games extends Component {
	constructor(props) {
	    super(props);

	    this.toggle = this.toggle.bind(this);
	    this.state = {
	      tooltipOpen: false
	    };
	}

	toggle() {
	    this.setState({
	      tooltipOpen: !this.state.tooltipOpen
	    });
	}

	componentDidMount() {
	    window.scrollTo(0,0);
      this.props.fetchGames();
      this.props.fetchPlayers(); 
	}

	render(){ 
	 	const games = this.props.currentTodos || (_.sortBy(this.props.games, ['from']).slice(0,2));
	 	const renderTodos = games.map((game,index) => 
          <Link to={`/game/${game._id}`} className="m-0 p-0 mb-4 btn text-left text_card w-100" key={index}>
          <div className="p-3 bg_card shadow" >  
            <p className="pb-3 border-bottom">{game.nameGame}</p>       
            <div className="row">
              <div className="col-12 col-md-3">
                {this.props.players.filter(master => game.name === master._id)
                  .map(master => 
                  <div key={master._id}>
                    <p>Мастер: {master.name}</p>
                    <p><FaStar className="text-warning" /> - {master.rating}/5</p>
                  </div>
                )}
              </div>
              <div className="col-12 col-md-5">
                <p>Дата игры: {moment(game.from).format('lll')}</p>
                <p>Тип игры: {game.selectedOption === "sortByTypeOnline" ? "Online" : "IRL"}
                 {game.selectedOption === "sortByTypeIRL" && <span className="ml-3">Город: {game.cityGame}</span>}</p>
                
              </div>
              <div className="col-12 col-md-4">
                <p className="d-flex-wrap" style={{wordWrap: "break-word"}}>Всего мест: {game.placeAll - (game.gamersInsideId.filter(gamerInside => gamerInside.accept === true).length)} / {game.placeAll}
                </p>
                <p>Стоимость: {game.priceGame === 0 ? "Бесплатно" : game.priceGame}</p>
              </div>
            </div>
          </div>
          </Link>
        )
	return (
		<div>
			{renderTodos}
		</div>
	)
	}
}

Games.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  games: state.games.items
})


export default connect(mapStateToProps, { fetchPlayers , fetchGames })(Games);

