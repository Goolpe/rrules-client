import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import GameForm from './GameForm';
import { fetchGame, changeGameData, deleteGame } from '../actions/gameActions';

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
		this.selectOption = this.selectOption.bind(this);
	} 

	componentDidMount() {
    window.scrollTo(0,0);
    this.props.fetchGame(this.props.match.params.id, this.props.history);
    if(!this.props.auth.isAuthenticated && this.props.game.name !== this.props.auth.user.id){
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

	selectOption(e){
		this.setState({
			selectedOption: e.target.value
		})
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
			name: this.props.auth.user.id,
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
	  	<main>
	  		<GameForm 
	  			nameGame = {this.state.nameGame}
					selectedOption = {this.state.selectedOption}
			    cityGame = {this.state.cityGame}
			    priceGame = {this.state.priceGame}
			    placeAll = {this.state.placeAll}
			    infoGame = {this.state.infoGame}
			    placeGame = {this.state.placeGame}
			    videoLink = {this.state.videoLink}
			    preview = {this.state.preview}
			    from = {this.state.from}
		    	to = {this.state.to}
		    	onSubmit = {this.onSubmit}
		    	onChange = {this.onChange}
		    	deleteGameData = {this.deleteGameData}
		    	selectOption = {this.selectOption}
    		/>
			</main>
	  )
	}
}

GameEditPage.propTypes = {
  fetchGame: PropTypes.func,
  auth: PropTypes.object,
  changeGameData: PropTypes.func,
  deleteGame: PropTypes.func
};

const mapStateToProps = state => ({
  game: state.game.item,
  auth: state.auth
})

export default connect(mapStateToProps, { changeGameData , fetchGame, deleteGame })(withRouter(GameEditPage));