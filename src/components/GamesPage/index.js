import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/postActions';

var games = [
	{
		"id": "1",
		"nameGame": "Пустоши",
		"master": "5b842107a83cf500041da1b3",
		"masterRating":"10",
		"placeAll": "4",
		"gamersInside": [],
		"DateGame": "29/08/2018 | 12:45",
		"date":"313212321123"
	},
	{
		"id": "2",
		"nameGame": "Пустоши",
		"master": "5b8424e8056483000462d695",
		"masterRating":"1200",
		"placeAll": "8",
		"gamersInside": [],
		"DateGame": "30/08/2018 | 12:45",
		"date":"313212321124"
	},
	{
		"id": "3",
		"nameGame": "Пустоши",
		"master": "5b842527056483000462d697",
		"masterRating":"120",
		"placeAll": "8",
		"gamersInside": [],
		"DateGame": "01/09/2018 | 12:45",
		"date":"313212321125"
	}

]

class GamesPage extends Component {
	constructor(props) {
	    super(props);

	    this.toggle = this.toggle.bind(this);
	    this.state = {
	    	sortByDate: true,
	    	sortByRate: false,
	    	gamesSort: games,
	      	dropdownOpen: false
	    }

	  }

	  toggle() {
	    this.setState({
	      dropdownOpen: !this.state.dropdownOpen
	    });
	  }
	componentDidMount() {
	    window.scrollTo(0,0);
	   }
	  componentWillMount() {
      this.props.fetchPlayers();
    }
	 render(){
	 	const listGames = this.state.gamesSort.map(game => 
	 		<div className="container mb-5" key={game.id}>
	 			<div className="row p-3 text-center align-items-center border">
	 				<div className="col-12 col-md-4">	 					
	 					<p>Игра: {game.nameGame}</p>
	 					{this.props.players.filter(master => game.master === master.userId)
	 						.map(master => 
	 						<div key={master.id}>
		 						<p>Мастер: <Link to={`/@${master.username}`} target="_blank" key={master.userId} className="ml-2 mr-1">{master.username}</Link></p>
		 						<img className="rounded mb-2" alt={master.photo} src={master.photo} style={{height: "40px"}}/><br />
		 						<div className="btn btn-secondary">{master.rating}</div>
	 						</div>
	 					)}
	 					
	 				</div>
	 				<div className="col-12 col-md-8 text-left">
	 					<p>Дата игры: {game.DateGame}</p>
	 					<p>Всего мест: {game.placeAll} | Свободных: {game.placeAll - game.gamersInside.length}</p>
	 					<div className="d-flex-wrap" style={{wordWrap: "break-word"}}>Игроки: {this.props.players.map(player=> 
	 						(game.gamersInside
	 							.filter(gamer => gamer === player.gamerId) 
	 							.map(gamer => 
				 					<Link to={`/@${player.nickname}`} key={player.userId} target="_blank" className="ml-2 mr-1">{player.username}</Link>
			 						)
	 							)
	 					)}
	 					</div>
	 					{(game.placeAll - game.gamersInside.length) === 0 ? <Button color="danger" className="btn btn-danger mt-4 pl-5 pr-5" disabled>Нет мест</Button> 
	 					:
	 					<Button color="info" className="mt-4 pl-5 pr-5">Играть</Button>}
	 				</div>
	 				
	 			</div>
	 		</div>
	 		)
	return (

	<section id="shop">
			<div className="container pt-5 pb-5">
				<h1 className="text-dark text-center">ИГРЫ</h1>
				<div className="d-flex justify-content-end">
				 <ButtonDropdown isOpen={this.state.dropdownOpen} className="mb-2" toggle={this.toggle}>
			        <DropdownToggle caret className="btn btn-outline-info rounded-0">
			          Сортировать по: 
			        </DropdownToggle>
			        <DropdownMenu>
			          <DropdownItem onClick={()=>{this.setState({gamesSort : _.sortBy(games, ['date'])})}}>Дате</DropdownItem>
			          <DropdownItem onClick={()=>{this.setState({gamesSort : _.sortBy(games, ['masterRating']).reverse()})}}>Рейтингу</DropdownItem>
			          <DropdownItem onClick={()=>{this.setState({gamesSort : _.sortBy(games, ['placeAll']).reverse()})}}>Количеству мест</DropdownItem>
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
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items
})

export default connect(mapStateToProps, { fetchPlayers })(GamesPage);

