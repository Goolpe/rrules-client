import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createGame, fetchGame, changeGameData } from '../actions/gameActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class GameEditPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			nameGame: this.props.game.nameGame,
			masterId: this.props.game.masterId,
			selectedOption: this.props.game.selectedOption,
		    cityGame: this.props.game.cityGame,
		    priceGame: this.props.game.priceGame,
		    placeAll: this.props.game.placeAll,
		    gamersInsideId: this.props.game.gamersInsideId,
		    infoGame: this.props.game.infoGame,
		    placeGame: this.props.game.placeGame,
		    videoLink: this.props.game.videoLink,
		    from: this.props.game.from,
      		to: this.props.game.to,
      		archive: this.props.game.archive
		}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	} 

	componentDidMount() {
	    window.scrollTo(0,0);
	    if(this.props.auth.isAuthenticated && this.props.game.masterName === this.props.auth.user.name){
	    	this.props.history.push(`/edit-game/${this.props.match.params.id}`)
	    }
	    else{
	    	this.props.history.push('/games')
	    }
	}

	componentWillMount() {
	  this.props.fetchGame(this.props.match.params.id, this.props.history);
    }
// Handler of change input states  

	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}

// Handler of submit
	notify(word){toast(word)}

	onSubmit(e){
		e.preventDefault();
		const gameData = {
			masterId: this.props.auth.user.id,
			archive: this.state.archive,
			id: this.props.match.params.id,
			nameGame: this.state.nameGame,
			cityGame: this.state.cityGame,
		    masterName: this.props.auth.user.name,
		    placeGame: this.state.placeGame,
		    priceGame: this.state.priceGame,
		    infoGame: this.state.infoGame,
		    videoLink: this.state.videoLink,
		    selectedOption: this.state.selectedOption,
		    placeAll: this.state.placeAll,
		    gamersInsideId: this.state.gamersInsideId,
		    from: this.state.from,
		    to: this.state.to
	    }
		this.props.changeGameData(gameData);
		this.notify("Готово!")
		if (this.state.archive){
			this.props.history.push('/games')
		}
		
	}
  render() {
	  return (
	  	<section id="createGame" style={{minHeight: "100vh"}}>
			<div className="container pt-5 pb-5">
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
				<h1 className="text-dark text-center mb-5">РЕДАКТИРОВАТЬ ИГРУ</h1>
				<form onSubmit={this.onSubmit}>
	{/*Button to create game and exit*/}
					<div className="d-flex justify-content-end">
						<button type="submit" onClick={()=>{this.setState({archive: true})}} className="btn btn-danger rounded-0 mb-2 mr-2">Удалить</button>
						<button type="submit" className="btn btn-info rounded-0 mb-2 mr-2">Сохранить</button>
						<Link to={`/game/${this.props.match.params.id}`} className="btn btn-outline-info rounded-0 mb-2">Выйти из редактора</Link>
				    </div>
				    <div className="container mb-5">
			 			<div className="row p-3 align-items-begin bg-white shadow-sm">
			 				<div className="col-12">
	{/*Name of the game*/}
			 					<label className="mr-2">Название: </label>
			 					<input type="text" value={this.state.nameGame} className="w-100" onChange={this.onChange} name="nameGame" /><br />
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
			 						<input type="string" value={this.state.priceGame} onChange={this.onChange} name="priceGame"/><br />
			 					</div>
			 					<div>
			 						<label className="mr-2 mt-3">Ссылка на стрим: </label>
			 						<input type="string" value={this.state.videoLink} className="w-100" onChange={this.onChange} name="videoLink" /><br />
			 					</div> 
	{/*Number of seats*/}
			 					<label className="mr-2 mt-3">Количество мест: </label>
			 					<input type="number" min="1" max="20" value={this.state.placeAll} onChange={this.onChange} name="placeAll" /><br />
	{/*Additionally info*/}		 					
			 					<label className="mt-3">Превью:</label>
			 					<textarea type="text" value={this.state.infoGame} style={{resize: "both", width: "100%", minHeight: "200px"}} onChange={this.onChange} name="infoGame" />
			 				</div> 	
			 			</div>	
			 		</div>		
		 		</form>
			</div>
		</section>
	  )
	}
}

GameEditPage.propTypes = {
  fetchGame: PropTypes.func.isRequired,
  createGame: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  changeGameData: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  game: state.game.item,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData , createGame, fetchGame })(withRouter(GameEditPage));