import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame, fetchGame, changeGameData, deleteGame } from '../actions/gameActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleLeft } from "react-icons/fa";

class GameEditPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameGame: this.props.game.nameGame,
			selectedOption: this.props.game.selectedOption,
	    cityGame: this.props.game.cityGame,
	    priceGame: this.props.game.priceGame,
	    placeAll: this.props.game.placeAll,
	    infoGame: this.props.game.infoGame,
	    placeGame: this.props.game.placeGame,
	    videoLink: this.props.game.videoLink,
	    preview: this.props.game.preview,
	    from: this.props.game.from,
    	to: this.props.game.to
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.deleteGameData = this.deleteGameData.bind(this);
	} 

	componentDidMount() {
    window.scrollTo(0,0);
    this.props.fetchGame(this.props.match.params.id, this.props.history);
    if(!this.props.auth.isAuthenticated && this.props.game.name !== this.props.auth.user.player){
    	this.props.history.push('/games')
    }
	}

// Handler of change input states  

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

// Handler of submit
	notify(word){
		toast(word)
	}

	deleteGameData(){
		this.props.deleteGame(this.props.match.params.id);
		this.props.history.push('/games')
	}

	onSubmit(e){
		e.preventDefault();
		const gameData = {
			id: this.props.game._id,
			nameGame: this.state.nameGame,
			name: this.props.auth.user.player,
			cityGame: this.state.cityGame,
	    placeGame: this.state.placeGame,
	    priceGame: this.state.priceGame,
	    infoGame: this.state.infoGame,
	    videoLink: this.state.videoLink,
	    preview: this.state.preview,
	    selectedOption: this.state.selectedOption,
	    placeAll: this.state.placeAll,
	    from: this.state.from,
	    to: this.state.to
	    }
		this.props.changeGameData(gameData);
		this.notify("Готово!")
	}
  render() {
	  return (
	  	<main id="createGame">
				<section className="container text_card">
					<ToastContainer
						position="top-center"
						autoClose={2000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnVisibilityChange
						draggable
						pauseOnHover
						/>
					<form onSubmit={this.onSubmit}>
	{/*Button to create game and exit*/}
						<div className="row">
							<div className="col-auto mr-auto p-0">
								<p className="text_card pb-4"><Link to={`/game/${this.props.match.params.id}`} className="text_card p-0 btn">
							        <FaAngleLeft size="1.5em"/> Назад&nbsp;
							    </Link> 
							    </p>
							</div>
							<div className="col-auto p-0">
									<button onClick={this.deleteGameData} className="btn btn-danger rounded-0 mb-2 mr-2">Удалить</button>
									<button type="submit" className="btn btn-info rounded-0 mb-2">Сохранить</button>
							</div>
						</div>
			 			<div className="row p-3 align-items-begin bg_card shadow">
			 				<div className="col-12">
	{/*Name of the game*/}
			 					<label className="mr-2">Название: </label>
			 					<input type="text" value={this.state.nameGame} maxLength="100" className="w-100" onChange={this.onChange} name="nameGame" /><br />
	{/*Number of seats*/}
			 					<label className="mr-2 mt-3">Количество мест: </label>
			 					<input type="number" min="1" max="20" value={this.state.placeAll} onChange={this.onChange} name="placeAll" /><br />
	{/*Type of the game*/}
						        <label className="mr-2 mt-3">Тип игры: </label>
						        <div className="custom-control custom-radio mb-2">
								    <input type="radio" className="custom-control-input" value="sortByTypeOnline" onChange={()=>{this.setState({selectedOption: 'sortByTypeOnline'})}} checked={this.state.selectedOption === 'sortByTypeOnline'} id="radio1" />
								    <label className="custom-control-label" htmlFor="radio1">Online</label>
								</div>
								<div className="custom-control custom-radio mb-2">
								    <input type="radio" className="custom-control-input" value="sortByTypeIRL" onChange={()=>{this.setState({selectedOption: 'sortByTypeIRL'})}} checked={this.state.selectedOption === 'sortByTypeIRL'} id="radio2" />
								    <label className="custom-control-label" htmlFor="radio2">IRL</label>
								</div>
					        {this.state.selectedOption === "sortByTypeIRL"  &&
		 						<div>
		 							<label className="mr-2 mt-3">Город: </label>
		 							<input type="string" value={this.state.cityGame} style={{width:"50%"}} onChange={this.onChange} name="cityGame"/><br/>
		 							<label className="mr-2 mt-3">Место проведения: </label>
		 							<input type="string" value={this.state.placeGame} style={{width:"50%"}} onChange={this.onChange} name="placeGame"/>
		 						</div> 
		 					}
{/*Price*/}
			 					<div>
			 						<label className="mr-2 mt-3">Стоимость: </label>
			 						<input type="number" min="0" max="10000" value={this.state.priceGame} onChange={this.onChange} name="priceGame" required/><br />
			 					</div>
			 					<div>
			 						<label className="mr-2 mt-3">Превью: </label>
			 						<input type="string" value={this.state.preview} className="w-100" onChange={this.onChange} name="preview" /><br />
			 					</div> 
			 					<div>
			 						<label className="mr-2 mt-3">Ссылка на стрим: </label>
			 						<input type="string" value={this.state.videoLink} className="w-100" onChange={this.onChange} name="videoLink" /><br />
			 					</div> 
	{/*Additionally info*/}		 					
			 					<label className="mr-2 mt-3">Информация:</label>
			 					<textarea className="w-100" maxLength="1000" value={this.state.infoGame} onChange={this.onChange} name="infoGame" />
				 			</div> 	
				 		</div>		
			 		</form>
				</section>
			</main>
	  )
	}
}

GameEditPage.propTypes = {
  fetchGame: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  changeGameData: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game.item,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData , createGame, fetchGame, deleteGame })(withRouter(GameEditPage));