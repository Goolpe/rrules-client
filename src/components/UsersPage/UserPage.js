import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayer } from '../actions/playerActions';
import moment from 'moment';

class UserPage extends Component {

  componentWillMount() {
      this.props.fetchPlayer(this.props.match.params.nickname);
    }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    const {user} = this.props.auth;
    const player = this.props.player;

	  return (
  	  <div id="userPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container pt-5 pb-5">
            {player.master && <Link to="/masters" className="text-dark"><i className="fas fa-angle-left "></i>ДРУГИЕ МАСТЕРА</Link>}
            <span className="text-center"><h1>{player.username}</h1>{player.master && <p>мастер</p>}</span>
            <div className="row">
              <div className="col-12 col-md-6 order-md-2 mb-3 text-center">
                  <img src={player.photo || player.gender ? "https://pp.userapi.com/c841430/v841430607/a334/JyoSS0cW0YA.jpg" : "https://pp.userapi.com/c639319/v639319542/3bcfc/-w1TeyATW-o.jpg"} className="img-fluid" style={{maxHeight: 500}} alt="" />
                <h3><i className="fas fa-star text-warning fa-1x mt-4 mb-2"></i> - {player.rating}/5</h3>
                {user.name === player.username && user.master && <Link to="/create-game" className="btn btn-info pl-5 pr-5">Создать игру</Link>}
              </div>
              <div className="col-12 col-md-6">
                <h4 className="mb-4 mt-4">Основная информация:</h4>
                <hr />
                <ul>

                  {player.fullName && player.fullName.length > 0 && <li><span className="font-weight-bold">Имя:</span> {player.fullName}</li>}
                  <li><span className="font-weight-bold">Пол:</span> {player.gender ? "Мужской" : "Женский"}</li>
                  {player.dateBirth && <li><span className="font-weight-bold">День рождения:</span> {moment(player.dateBirth).format('LL')}</li>}
                  <li><span className="font-weight-bold">Зарегистрирован:</span> {moment(player.dateReg).format('LL')}</li>
                  <li>{player.master && <p>{player.paidGames ? "Водит" : "Не водит"} платные игры</p>}</li>
                </ul>
                <h4 className="mb-4 mt-4">Контакты:</h4>
                <hr />
                <ul>
                  {player.discord && <li><span className="font-weight-bold">Discord</span> - {player.discord}</li>}
                  {player.skype && <li><span className="font-weight-bold">Skype</span> - {player.skype}</li>}
                  {player.otherContacts && <li><span className="font-weight-bold">Доп. контакты</span> - {player.otherContacts}</li>}
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

              </div>
            </div>

            <h4 className="mb-4 mt-4">Примеры игр</h4><hr />
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <iframe width="100%" title={player.example1} height="300" src={player.example1} frameBorder="0" allowFullScreen></iframe>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <iframe width="100%" title={player.example2} height="300" src={player.example2} frameBorder="0" allowFullScreen></iframe>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <iframe width="100%" title={player.example3} height="300" src={player.example3} frameBorder="0" allowFullScreen></iframe>
              </div>
              <div className="col-12 col-md-6 mb-3">
                <iframe width="100%" title={player.example4} height="300" src={player.example4} frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>
      	</div>
    	</div>
	  )
	}
}

UserPage.propTypes = {
  fetchPlayer: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  player: state.player.item,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchPlayer })(UserPage);
