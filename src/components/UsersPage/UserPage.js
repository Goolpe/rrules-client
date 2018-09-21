import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayer } from '../actions/playerActions';
import moment from 'moment';
import Msgs from './msgs';
import Games from '../HomePage/games';
import { FaStar } from "react-icons/fa";

class UserPage extends Component {

  componentWillMount() {
      this.props.fetchPlayer(this.props.match.params.nickname, this.props.history);
    }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    const {user} = this.props.auth;
    const player = this.props.player;

    return (
      <section id="userPage">    
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3">
            </div>
            <div className="col-12 col-md-6 shadow bg_card pt-4 pb-4">
              <span className="text-center"><p>{player.username || ""} <FaStar className="text-warning" /> - {player.rating}/5</p>{player.master && <p>мастер</p>}</span>
              <h4 className="mb-4 mt-4">Основная информация:</h4>
              <ul>
                {player.fullName && player.fullName.length > 0 && <li>Имя: {player.fullName}</li>}
                <li>Пол: {player.gender ? "Мужской" : "Женский"}</li>
                {player.dateBirth && <li>День рождения: {moment(player.dateBirth).format('LL')}</li>}
                <li>Зарегистрирован: {moment(player.dateReg).format('LL')}</li>
                <li>{player.master && <p>{player.paidGames ? "Водит" : "Не водит"} платные игры</p>}</li>
              </ul>
              <hr/>
              <h4 className="mb-4 mt-4">Контакты:</h4>
              <ul>
                {player.discord && <li><span className="font-weight-bold">Discord</span> - {player.discord}</li>}
                {player.skype && <li><span className="font-weight-bold">Skype</span> - {player.skype}</li>}
                {player.otherContacts && <li><span className="font-weight-bold">Доп. контакты</span> - {player.otherContacts}</li>}
              </ul>
              <hr />
              <h4 className="mb-4 mt-4">О себе:</h4>
              
              <p>{player.about || "Обычный кот: сплю, ем, ловлю мышей"}</p>
              <hr />
              <h4 className="mb-4 mt-4">Любимые системы:</h4>

              <p>{player.systems || "Нет"}</p>
              <hr />

              <h4 className="mb-4 mt-4">Любимые сеттинги:</h4>
              <p>{player.setting || "Нет"}</p>
                {(player.example1 || player.example2 || player.example3 || player.example4) &&
              <React.Fragment>
                <h4 className="mb-4 mt-4">Примеры игр</h4><hr />
                <div className="row">
                  {player.example1 && <div className="col-12 col-md-6 mb-3">
                    <iframe width="100%" title="sample1" height="300" src={player.example1} frameBorder="0" allowFullScreen></iframe>
                  </div>}
                  {player.example2 && <div className="col-12 col-md-6 mb-3">
                    <iframe width="100%" title="sample2" height="300" src={player.example2} frameBorder="0" allowFullScreen></iframe>
                  </div>}
                  {player.example3 && <div className="col-12 col-md-6 mb-3">
                    <iframe width="100%" title="sample3" height="300" src={player.example3} frameBorder="0" allowFullScreen></iframe>
                  </div>}
                  {player.example4 && <div className="col-12 col-md-6 mb-3">
                    <iframe width="100%" title="sample4" height="300" src={player.example4} frameBorder="0" allowFullScreen></iframe>
                  </div>}
                </div>
              </React.Fragment>}
            </div>
            <div className="col-12 col-md-3">
            </div>
      	</div>
        </div>
    	</section>
	  )
	}
}

UserPage.propTypes = {
  fetchPlayer: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  player: state.player.item,
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { fetchPlayer })(UserPage);
