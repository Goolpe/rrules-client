import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayer } from '../actions/playerActions';
import moment from 'moment';
import Msgs from './msgs';
import Games from '../HomePage/games';
import { FaStar, FaCog, FaAngleLeft } from "react-icons/fa";
import { UncontrolledTooltip } from 'reactstrap';

class UserPage extends Component {

  componentWillMount() {
      this.props.fetchPlayer(this.props.match.params.nickname, this.props.history);
    }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    const player = this.props.player;
    const {isAuthenticated, user} = this.props.auth;
    return (
      <section id="userPage">    
        <div className="container">
            {this.props.match.params.nickname !== user.name && <p className="text-white pb-4">
              <Link to="/masters" className="p-0 btn">
                <FaAngleLeft size="1.5em"/> Все мастера&nbsp;
              </Link>
            </p>}
            <div className="shadow bg_card">
              <div className="w-100 position-relative border-bottom" style={{height:"200px", overflow:"hidden"}}>
                <img style={{width:"100%"}} src="https://cdn.pixabay.com/photo/2016/09/29/13/08/planet-1702788_960_720.jpg" />
                <div className="position-absolute border" style={{bottom:"10px",left:"10px"}}>
                    <div className="userpage__avatar" style={{backgroundImage: `url(${player.photo})`}}></div>
                </div>
              </div>
                  <ul className="p-4">
                    <div className="d-flex justify-content-between">
                      <h2>{player.username || ""} {player.master && <p>мастер</p>}</h2>
                      {isAuthenticated &&
                        <React.Fragment>
                        <Link className="userpage__facog" style={{height:"1.5em"}} id="TooltipSetting" to={`/edit/@${player.username}`}>
                          <FaCog size="1.5em"/>
                        </Link>
                        <UncontrolledTooltip className="mr-2" placement="left" target="TooltipSetting">
                          Настройка профиля
                        </UncontrolledTooltip>
                        </React.Fragment>
                      }
                    </div>
                    <li>Рейтинг: <FaStar className="text-warning" /> - {player.rating}/5</li>
                    <li>Зарегистрирован: {moment(player.dateReg).format('LL')}</li>
                    <hr/>
                    <li>Имя: {player.fullName ? player.fullName : "-"}</li>
                    <li>Пол: {player.gender ? "Мужской" : "Женский"}</li>
                    {player.dateBirth && <li>День рождения: {moment(player.dateBirth).format('LL')}</li>}
                    <hr/>
                    <li>{player.master && <p>{player.paidGames ? "Водит" : "Не водит"} платные игры</p>}</li>
                    {player.discord && <li><span className="font-weight-bold">Discord</span> - {player.discord}</li>}
                    {player.skype && <li><span className="font-weight-bold">Skype</span> - {player.skype}</li>}
                    {player.otherContacts && <li><span className="font-weight-bold">Доп. контакты</span> - {player.otherContacts}</li>}
                    <li>О себе: {player.about || "-"}</li>
                    <li>Любимые системы: {player.systems || "-"}</li>
                    <li>Любимые сеттинги: {player.setting || "-"}</li>
                    {(player.example1 || player.example2 || player.example3 || player.example4) &&
                      <React.Fragment>
                      <li>Примеры игр: {player.setting}</li>
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
                  </ul>                
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
