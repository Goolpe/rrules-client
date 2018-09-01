import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import moment from 'moment';
import Rating from 'react-rating';

class UserPage extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
  componentWillMount() {
      this.props.fetchPlayers();
    }
  render() {
    const {isAuthenticated, user} = this.props.auth;

    const searchId = this.props.players
    .filter(player => player.username === this.props.match.params.nickname)
    .map(player =>
      <React.Fragment key={player._id}>
            <span className="text-center"><h1>{player.username}</h1>{player.master && <p>мастер</p>}</span>
            <div className="row">
              <div className="col-12 col-md-6 order-md-2 mb-3 text-center">
                <img src={player.photo} className="img-fluid" style={{maxHeight: 500}} alt="" />
                <h3><i className="fas fa-star text-warning fa-1x mt-4"></i> - {player.rating}/5</h3>
              </div>
              <div className="col-12 col-md-6">
                <h4 className="mb-4 mt-4">Основная информация:</h4>
                <hr />
                <ul>
                  <li><span className="font-weight-bold">Имя:</span> {player.fullName}</li>
                  <li><span className="font-weight-bold">День рождения:</span> {moment(player.dateBirth).format('LL')}</li>
                  <li><span className="font-weight-bold">Зарегистрирован:</span> {moment(player.dateReg).format('LL')}</li>
                  <li>{player.master && <p>{player.paidGames ? "Водит" : "Не водит"} платные игры</p>}</li>
                </ul>
                <h4 className="mb-4 mt-4">Контакты:</h4>
                <hr />
                <ul>
                  <li><span className="font-weight-bold">Discord</span> - {player.discord}</li>
                  <li><span className="font-weight-bold">Skype</span> - {player.skype}</li>
                  <li><span className="font-weight-bold">Доп. контакты</span> - {player.otherContacts}</li>
                </ul>

                <h4 className="mb-4 mt-4">О себе:</h4>
                <hr />
                <p>{player.about}</p>
                <h4 className="mb-4 mt-4">Любимые системы:</h4>
                <hr />
                <p>{player.systems}</p>
                <h4 className="mb-4 mt-4">Любимые сеттинги:</h4>
                <hr />
                <p>{player.setting}</p>

                {player.examples > 0 && player.master && <h4 className="mb-4 mt-4">Примеры игр</h4>}
              </div>
            </div>
            <div className="row">
            {player.examples.map((example, index) => 
              <div className="col-12 col-md-6 mb-3" key={index}>
                <iframe
                    title={player.userId}
                    src={example}
                    width="100%" 
                    height="340"
                    frameBorder="0"
                    allowFullScreen>
                </iframe>
              </div>
            )}
            </div>
          </React.Fragment>
          )

	  return (
  	  <div id="userPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container pt-5 pb-5">
          <Link to="/masters" className="text-dark"><i className="fas fa-angle-left "></i> ДРУГИЕ МАСТЕРА</Link>
          {searchId}
      	</div>
    	</div>
	  )
	}
}

UserPage.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchPlayers })(UserPage);
