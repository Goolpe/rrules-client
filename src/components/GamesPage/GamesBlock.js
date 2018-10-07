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

  componentDidMount() {
      window.scrollTo(0,0);
      this.props.fetchGames();
      this.props.fetchPlayers(); 
  }

	toggle() {
	    this.setState({
	      tooltipOpen: !this.state.tooltipOpen
	    });
	}

	render(){ 
    const {user} = this.props.auth;
	 	const games = this.props.currentTodos || (_.sortBy(this.props.games, ['from']).slice(0,2));
	 	const renderTodos = games.map((game,index) => 
      <Link to={`/game/${game._id}`} className="m-0 p-0 mb-4 btn text-left text_card w-100" key={index}>
        <div className="p-3 bg_card shadow" style={{whiteSpace: "normal"}}>  
          <div className="row">
            <div className="col-12">
              <p className="pb-3 border-bottom">{game.nameGame} {game.gamersInsideId.filter(gamerInside => gamerInside.user === user.player && gamerInside.accept === true ).map((gamer, index)=> <span style={{color:"#4caf50"}} key={index}>| Вы в игре</span>)}</p>
            </div>
            <div className="col-12 col-md-3">
              {this.props.players.filter(master => game.name === master._id)
                .map(master => 
                <div key={master._id}>
                  <p className="text-white">{master.name}</p>
                  <p><FaStar className="text-warning" /> - {master.rating}/5</p>
                </div>
              )}
            </div>
            <div className="col-12 col-md-5">
              <p>{moment(game.from).format('lll')}</p>
              <p>{game.selectedOption === "sortByTypeOnline" ? 
                <span>Online</span>
                : 
                <span>IRL | {game.cityGame}</span>}
              </p>
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
		<React.Fragment>
			{renderTodos}
		</React.Fragment>
	)
	}
}

Games.propTypes = {
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


export default connect(mapStateToProps, { fetchPlayers , fetchGames })(Games);

