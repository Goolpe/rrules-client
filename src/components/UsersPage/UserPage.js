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
      <div key={player._id}>
            <div className="row mb-5 justify-content-center align-items-start">
              <div className="col-12 col-md-4 text-left mb-4"><Link to="/masters" className="text-dark"><i className="fas fa-angle-left "></i> ДРУГИЕ {player.master ? "МАСТЕРА" : "ИГРОКИ"}</Link></div>
              <div className="col-12 col-md-4 text-center"><h1>{player.username}</h1>{player.master && <p>мастер</p>}</div>
              <div  className="col-12 col-md-4 text-right">{user.name === player.username && <Link to={`/edit/@${user.name}`} className="btn btn-link bg-transparent border-0" >
                <i className="fas fa-pen-square fa-3x text-info"></i>
              </Link>}</div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 order-md-2 mb-3 text-center">
                <img src={player.photo} className="img-fluid" style={{maxHeight: 500}} alt="" />
              </div>
              <div className="col-12 col-md-6">
                <h3 className="mb-4">
                  <Rating  emptySymbol="far fa-star text-warning fa-1x"  initialRating={player.rating} fullSymbol="fas fa-star text-warning fa-1x" fractions={2} readonly/>
                  </h3>
                <p><span className="font-weight-bold">Discord</span> - {player.discord}<br />
                <span className="font-weight-bold">Skype</span> - {player.skype}<br />
                <span className="font-weight-bold">Допю контакты</span> - {player.otherContacts}<br />
                </p>
                <p>Имя: {player.fullName}</p>
                <p>День рождения: {moment(player.dateBirth).format('LL')}</p>
                <p>Зарегистрирован {moment(player.dateReg).format('LL')}</p>
                  {player.master && <p>{player.paidGames ? "Водит" : "Не водит"} платные игры</p>}
                <h3 className="mb-4">О себе:</h3>
                <p>{player.about}</p>
                <h3 className="mb-4">Любимые системы:</h3><p>{player.systems}</p>
                <h3 className="mb-4">Любимые сеттинги:</h3><p>{player.setting}</p>
                {player.examples > 0 && player.master && <h3 className="mb-4">Примеры игр</h3>}
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
          </div>
          )

	  return (
  	  <div id="userPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container pt-5 pb-5">
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
