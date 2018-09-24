import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayer } from '../actions/playerActions';
import moment from 'moment';
import Msgs from './msgs';
import { FaStar, FaCog, FaAngleLeft, FaSignOutAlt, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { UncontrolledTooltip } from 'reactstrap';
import { logoutUser } from '../actions/authActions';
import { fetchMsgs } from '../actions/msgActions';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state={
      master: this.props.player.master
    }
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.props.fetchPlayer(this.props.match.params.nickname, this.props.history);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.match.params.nickname !== nextProps.match.params.nickname){
      this.props.fetchPlayer(nextProps.match.params.nickname, this.props.history);
    }
  }
  onLogout(e) {
    this.props.logoutUser(this.props.history);
  }

  render() {
    const player = this.props.player;
    const {isAuthenticated, user} = this.props.auth;
    return (
      <section id="userPage">    
        <div className="container">
          <div className="shadow bg_card">
              <div className="w-100 position-relative border-bottom" style={{height:"200px", overflow:"hidden"}}>
                <img style={{width:"100%"}} src={player.bgphoto} />
                <div className="position-absolute border" style={{bottom:"10px",left:"10px"}}>
                    <div className="userpage__avatar" style={{backgroundImage: `url(${player.photo})`}}></div>
                </div>
              </div>
                  <ul className="p-4 text_card">
                    <div className="d-flex justify-content-between">
                      <h2>{player.username || ""} {isAuthenticated && this.props.match.params.nickname === user.name && <button onClick={this.onLogout.bind(this)} className="btn btn-outline-danger text-white"><FaSignOutAlt /> Выйти</button>}
                      </h2>
                      {isAuthenticated && this.props.match.params.nickname === user.name &&
                        <React.Fragment>
                        <Link className="userpage__facog text_card" style={{height:"1.5em"}} id="TooltipSetting" to={`/edit/@${player.username}`}>
                          <FaCog size="1.5em"/>
                        </Link>
                        <UncontrolledTooltip className="mr-2" placement="left" target="TooltipSetting">
                          Настройка профиля
                        </UncontrolledTooltip>
                        </React.Fragment>
                      }

                    </div>

                    <li><span className="text-muted">Статус: </span>{player.master ? "Мастер" : "Игрок"} 
                      
                    </li>
                    <li><span className="text-muted">Рейтинг: </span><FaStar className="text-warning" /> - {player.rating}/5</li>
                    {player.master && <li><span className="text-muted">Проведенных игр: </span>{player.gamesCount}</li>}
                    <li><span className="text-muted">Зарегистрирован: </span>{moment(player.dateReg).format('LL')}</li>

                    {player.fullName || player.gender || player.dateBirth || player.cityLive && <hr/>}

                    {player.fullName && <li><span className="text-muted">Имя: </span>{player.fullName}</li>}
                    {player.gender && <li><span className="text-muted">Пол: </span>{player.gender}</li>}
                    {player.dateBirth && <li><span className="text-muted">День рождения: </span>{moment(player.dateBirth).format('LL')}</li>}
                    {player.cityLive && <li><span className="text-muted">Город: </span>{player.cityLive}</li>}

                    <hr/>
                    
                    {player.master && <li>{player.paidGames ? "Водит платные игры" : "Не водит платные игры"}</li>}
                    {player.discord && <li><span className="text-muted">Discord: </span>{player.discord}</li>}
                    {player.skype && <li><span className="text-muted">Skype: </span>{player.skype}</li>}
                    {player.otherContacts && <li><span className="text-muted">Доп. контакты: </span>{player.otherContacts}</li>}
                    {player.about && <li><span className="text-muted">О себе: </span>{player.about}</li>}
                    {player.systems && <li><span className="text-muted">Любимые системы: </span>{player.systems}</li>}
                    {player.setting && <li><span className="text-muted">Любимые сеттинги: </span>{player.setting}</li>}
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
          {isAuthenticated && this.props.match.params.nickname === user.name && <Msgs />}
        </div>
    	</section>
	  )
	}
}

UserPage.propTypes = {
  fetchPlayer: PropTypes.func.isRequired,
  player: PropTypes.object.isRequired,
  fetchMsgs: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  msgs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player.item,
  msgs: state.msgs.items
})

export default connect(mapStateToProps, { fetchMsgs, fetchPlayer, logoutUser })(UserPage);
