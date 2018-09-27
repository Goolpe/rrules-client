import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayer } from '../actions/playerActions';
import moment from 'moment';
import { FaStar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { UncontrolledTooltip } from 'reactstrap';
import { logoutUser } from '../actions/authActions';
import ReactPlayer from 'react-player';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.props.fetchPlayer(this.props.match.params.nickname, this.props.history);
  }

  componentDidUpdate(prevProps){
    if(this.props.match.params.nickname !== prevProps.match.params.nickname){
      this.props.fetchPlayer(this.props.match.params.nickname, this.props.history);
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
              <div className="w-100 position-relative border-bottom userpage__bg" style={{backgroundImage: `url(${player.bgphoto})`}}>
                <div className="position-absolute userpage__avatar" style={{bottom:"0",left:"0"}}>
                    <img width="100%" alt="player-photo" src={player.photo}/>
                </div>
              </div>
                  <ul className="p-4 text_card">
                    <div className="d-flex justify-content-between">
                      <h2>{player.name || ""} {isAuthenticated && this.props.match.params.nickname === user.name && <button onClick={this.onLogout.bind(this)} className="btn btn-outline-danger text-white"><FaSignOutAlt /> Выйти</button>}
                      </h2>
                      {isAuthenticated && this.props.match.params.nickname === user.name &&
                        <React.Fragment>
                        <Link className="userpage__facog text_card" style={{height:"1.5em"}} id="TooltipSetting" to={`/edit/@${player.name}`}>
                          <FaCog size="1.5em"/>
                        </Link>
                        <UncontrolledTooltip className="mr-2" placement="left" target="TooltipSetting">
                          Настройка профиля
                        </UncontrolledTooltip>
                        </React.Fragment>
                      }

                    </div>
                    <li><span className="text-muted">Статус: </span>{player.status}</li>
                    <li><span className="text-muted">Рейтинг: </span><FaStar className="text-warning" /> - {player.rating}/5</li>
                    {player.status === "мастер" && <li><span className="text-muted">Проведенных игр: </span>{player.gamesCount}</li>}
                    {player.status === "мастер" && <li><span className="text-muted">Платные игры: </span>{player.paidGames ? "водит" : "не водит"}</li>}
                    <li><span className="text-muted">Зарегистрирован: </span>{moment(player.dateReg).startOf('day').fromNow()}</li>

                    {(player.fullName || player.sex || player.dateBirth || player.cityLive) && <hr/>}

                    {player.fullName && <li><span className="text-muted">Имя: </span>{player.fullName}</li>}
                    {player.sex && <li><span className="text-muted">Пол: </span>{player.sex}</li>}
                    {player.dateBirth && <li><span className="text-muted">Возраст: </span>{moment().diff(player.dateBirth, 'years')} лет</li>}
                    {player.cityLive && <li><span className="text-muted">Город: </span>{player.cityLive}</li>}
                    {player.discord && <li><span className="text-muted">Discord: </span>{player.discord}</li>}
                    {player.skype && <li><span className="text-muted">Skype: </span>{player.skype}</li>}
                    {player.otherContacts && <li><span className="text-muted">Доп. контакты: </span>{player.otherContacts}</li>}

                    {(player.about || player.systems || player.setting) && <hr/>}
                    
                    {player.about && <li><span className="text-muted">О себе: </span>{player.about}</li>}
                    {player.systems && <li><span className="text-muted">Любимые системы: </span>{player.systems}</li>}
                    {player.setting && <li><span className="text-muted">Любимые сеттинги: </span>{player.setting}</li>}
                    {(player.example1 || player.example2 || player.example3 || player.example4) &&
                      <React.Fragment>
                      <hr/>
                      <li><span className="text-muted">Примеры игр: </span></li>
                      <div className="row mt-3">
                        {player.example1 && <div className="col-12 col-md-6 mb-3">
                          <ReactPlayer url={player.example1} width="100%" height="300px" controls />
                        </div>}
                        {player.example2 && <div className="col-12 col-md-6 mb-3">
                          <ReactPlayer url={player.example2} width="100%" height="300px" controls />
                        </div>}
                        {player.example3 && <div className="col-12 col-md-6 mb-3">
                          <ReactPlayer url={player.example3} width="100%" height="300px" controls />
                        </div>}
                        {player.example4 && <div className="col-12 col-md-6 mb-3">
                          <ReactPlayer url={player.example4} width="100%" height="300px" controls />
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
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player.item
})

export default connect(mapStateToProps, { fetchPlayer, logoutUser })(UserPage);
