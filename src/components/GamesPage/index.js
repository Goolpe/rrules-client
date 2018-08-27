import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import { fetchGames } from '../actions/gameActions';
import moment from 'moment';

var gamesSort;


class GamesPage extends Component {
	constructor(props) {
	    super(props);
	    this.toggle = this.toggle.bind(this);
	    this.state = {
	    	sortByDate: true,
	    	sortByRate: false,
	    	gamesSort: 'date',
	      	dropdownOpen: false
	    }
	  }
	  componentDidMount() {
	    window.scrollTo(0,0);
	}
	toggle() {
	    this.setState({
	      dropdownOpen: !this.state.dropdownOpen
	    });
	}

	componentWillMount() {
	  this.props.fetchGames();
      this.props.fetchPlayers();
      
    }
	

	 render(){ 

	 	this.state.gamesSort === "date" ? gamesSort = _.sortBy(this.props.games, ['date']) :
	 	gamesSort = _.sortBy(this.props.games, ['placeAll']	).reverse()

	 	const listGames = gamesSort.map(game => 
	 		<div className="container mb-5" key={game._id}>
	 			<div className="row p-3 text-center align-items-start border">
	 				<div className="col-12 col-md-4">	 					
	 					<p>Игра: {game.nameGame}</p>
	 					{this.props.players.filter(master => game.masterId === master.userId)
	 						.map(master => 
	 						<div key={master.userId}>
		 						<p>Мастер: <Link to={`/@${master.username}`} target="_blank" key={master.userId} className="ml-2 mr-1">{master.username}</Link></p>
		 						<img className="rounded mb-2" alt={master.photo} src={master.photo} style={{height: "40px"}}/><br />
		 						<div className="btn btn-secondary">{master.rating}</div>
	 						</div>
	 					)}
	 					
	 				</div>
	 				<div className="col-12 col-md-4 text-left">
	 					<p>Дата игры: {moment(game.date).format('lll')}</p>
	 					<p>Всего мест: {game.placeAll} / {game.placeAll - game.gamersInsideId.length} </p>
	 					<div className="d-flex-wrap" style={{wordWrap: "break-word"}}>Игроки: {this.props.players.map(player=> 
	 						(game.gamersInsideId
	 							.filter(gamer => gamer === player.gamerId) 
	 							.map(gamer => 
				 					<Link to={`/@${player.username}`} key={player.userId} target="_blank" className="ml-2 mr-1">{player.username}</Link>
			 						)
	 							)
	 					)}
	 					</div>
	 					
	 				</div>
	 				<div className="col-12 col-md-4 text-left">
	 					<p>Доп. информация: {game.infoGame.length === 0 ? "нет" : game.infoGame}</p>

	 				</div>
	 				<div className="col-12 text-center">
	 				{(game.placeAll - game.gamersInsideId.length) === 0 ? <Button color="danger" className="btn btn-danger mt-4 pl-5 pr-5" disabled>Нет мест</Button> 
	 					:
	 					<Button color="info" className="mt-4 pl-5 pr-5">Записаться</Button>}
	 					<Button color="danger" className="mt-4 ml-2 pl-5 pr-5">Смотреть</Button>
	 				</div>
	 			</div>
	 		</div>
	 		)
	return (

	<section id="shop">
			<div className="container pt-5 pb-5">
				<h1 className="text-dark text-center">ИГРЫ</h1>
				<div className="d-flex justify-content-end">
				<Link to="/create-game" className="btn btn-outline-info rounded-0 mb-2 mr-2">Создать игру</Link>
				 <ButtonDropdown isOpen={this.state.dropdownOpen} className="mb-2" toggle={this.toggle}>
			        <DropdownToggle caret className="btn btn-outline-info rounded-0">
			          Сортировать по: 
			        </DropdownToggle>
			        <DropdownMenu>
			          <DropdownItem onClick={()=>{this.setState({gamesSort : 'date'})}}>Дате</DropdownItem>
			          <DropdownItem onClick={()=>{this.setState({gamesSort : 'placeAll'})}}>Количеству мест</DropdownItem>
			        </DropdownMenu>
			      </ButtonDropdown>
			    </div>
				{listGames}
			</div>
		</section>
	)
	}
}

GamesPage.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
  games: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  games: state.games.items
})


export default connect(mapStateToProps, { fetchPlayers , fetchGames })(GamesPage);

