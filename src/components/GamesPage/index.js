import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import _ from "lodash";
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

var games = [
	{
		"id": "1",
		"nameGame": "Пустоши",
		"master": "1",
		"masterRating":"10",
		"placeAll": "4",
		"gamersInside": ["2","3"],
		"DateGame": "29/08/2018 | 12:45",
		"date":"313212321123"
	},
	{
		"id": "2",
		"nameGame": "Пустоши",
		"master": "2",
		"masterRating":"1200",
		"placeAll": "8",
		"gamersInside": ["2","3","1","4","5","6","7","8"],
		"DateGame": "30/08/2018 | 12:45",
		"date":"313212321124"
	},
	{
		"id": "3",
		"nameGame": "Пустоши",
		"master": "3",
		"masterRating":"120",
		"placeAll": "8",
		"gamersInside": ["2","3","1"],
		"DateGame": "01/09/2018 | 12:45",
		"date":"313212321125"
	}

]

var gamers = [
	{
		"id": "1",
		"gamerId": "1",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c638218/v638218756/4c20f/_yrjF8-A9ic.jpg",
		"nickname": "Nate",
		"rating": "10",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
	},
	{
		"id": "2",
		"gamerId": "2",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c846522/v846522612/2cc8f/wtsXKLm54uA.jpg",
		"nickname": "Tiki",
		"rating": "1200",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
	},
	{
		"id": "3",
		"gamerId": "3",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c846522/v846522612/2cc85/ZI-AAZvH6RA.jpg",
		"nickname": "Loki1",
		"rating": "120",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
	},
	{
		"id": "4",
		"gamerId": "4",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c638218/v638218756/4c20f/_yrjF8-A9ic.jpg",
		"nickname": "Koki2",
		"rating": "8/10",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
	},
	{
		"id": "5",
		"gamerId": "5",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c638218/v638218756/4c20f/_yrjF8-A9ic.jpg",
		"nickname": "Koki2",
		"rating": "8/10",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
	},
	{
		"id": "6",
		"gamerId": "6",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c638218/v638218756/4c20f/_yrjF8-A9ic.jpg",
		"nickname": "Koki3",
		"rating": "8/10",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
	},
	{
		"id": "7",
		"gamerId": "7",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c638218/v638218756/4c20f/_yrjF8-A9ic.jpg",
		"nickname": "Koki4",
		"rating": "8/10",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
	},
	{
		"id": "8",
		"gamerId": "8",
		"url": "12314121234",
		"photo": "https://pp.userapi.com/c638218/v638218756/4c20f/_yrjF8-A9ic.jpg",
		"nickname": "Koki5",
		"rating": "8/10",
		"gamesCount": "100",
		"dateReg": "28/08/2018",
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
	 render(){
	 	const listGames = this.state.gamesSort.map(game => 
	 		<div className="container mb-5" key={game.id}>
	 			<div className="row p-3 text-center align-items-center border">
	 				<div className="col-12 col-md-4">	 					
	 					<p>Игра: {game.nameGame}</p>
	 					{gamers.map(master=> {if(game.master === master.gamerId){
	 						return <div key={master.id}>
		 						<p>Мастер: <Link to={`/@${master.nickname}`} target="_blank" key={master.id} className="ml-2 mr-1">{master.nickname}</Link></p>
		 						<img className="rounded mb-2" src={master.photo} style={{height: "40px"}}/><br />
		 						<div className="btn btn-outline-warning">{master.rating}</div>
	 						</div>
	 					}})}
	 					
	 				</div>
	 				<div className="col-12 col-md-8 text-left">
	 					<p>Дата игры: {game.DateGame}</p>
	 					<p>Всего мест: {game.placeAll} | Свободных: {game.placeAll - game.gamersInside.length}</p>
	 					<div className="d-flex-wrap" style={{wordWrap: "break-word"}}>Игроки: {gamers.map(player=> 
	 						(game.gamersInside.map(gamer => 
		 							{if (gamer === player.gamerId) 
				 						return <Link to={`/@${player.nickname}`} key={player.id} target="_blank" className="ml-2 mr-1">{player.nickname}</Link>
				 						}
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
				<h1 className="text-dark text-center m-5">ИГРЫ</h1>
				<div className="d-flex justify-content-end">
				 <ButtonDropdown isOpen={this.state.dropdownOpen} className="mb-2" toggle={this.toggle}>
			        <DropdownToggle caret color="info">
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

export default GamesPage;

