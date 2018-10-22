import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { createGame } from '../actions/gameActions';
import GameForm from './GameForm';

class CreateGamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameGame: '',
      selectedOption: 'sortByTypeOnline',
      cityGame: '',
      priceGame: 0,
      placeAll: 0,
      gamersInsideId: [],
      preview: '',
      infoGame: '',
      placeGame: '',
      videoLink: '',
      from: undefined,
      to: undefined,
    };
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  handleFromChange(from) {
    this.setState({ from });
  }

  handleToChange(to) {
    this.setState({ to });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  notify(word) {
    toast(word);
  }

  notifyError(word) {
    toast.error(word);
  }

  selectOption(e) {
    if (e.target.value !== 'sortByTypeIRL') {
      this.setState({
        cityGame: '',
        placeGame: '',
      });
    }
    this.setState({
      selectedOption: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (Date.parse(this.state.from) > Date.parse(new Date())
    &&
    Date.parse(this.state.from) < Date.parse(this.state.to)) {
      const gameData = {
        nameGame: this.state.nameGame,
        cityGame: this.state.cityGame,
        name: this.props.auth.user.id,
        placeGame: this.state.placeGame,
        priceGame: this.state.priceGame,
        infoGame: this.state.infoGame,
        gamersInsideId: this.state.gamersInsideId,
        videoLink: this.state.videoLink,
        preview: this.state.preview,
        selectedOption: this.state.selectedOption,
        placeAll: this.state.placeAll,
        from: this.state.from,
        to: this.state.to,
      };
      this.props.createGame(gameData);
      this.setState({
        nameGame: '',
        cityGame: '',
        priceGame: 0,
        placeAll: 0,
        selectedOption: 'sortByTypeOnline',
        preview: '',
        infoGame: '',
        placeGame: '',
        from: undefined,
        to: undefined,
        videoLink: '',
      });
      this.notify('Готово!');
    }
    else {
      this.notifyError('Укажите правильную дату!');
    }
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
          handleFromChange = {this.handleFromChange}
          handleToChange = {this.handleToChange}
          selectOption = {this.selectOption}
        />
      </main>
    );
  }
}

CreateGamePage.propTypes = {
  createGame: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createGame })(withRouter(CreateGamePage));