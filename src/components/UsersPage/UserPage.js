import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayer } from '../actions/playerActions';
import moment from 'moment';
import { FaStar } from "react-icons/fa";
import { logoutUser } from '../actions/authActions';
import ReactPlayer from 'react-player';
import '../style/user.css';

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
    if(this.props.player.name !== prevProps.player.name){
      this.props.fetchPlayer(this.props.match.params.nickname, this.props.history);
    }
  }
  onLogout(e) {
    this.props.logoutUser(this.props.history);
  }

  render() {
    const player = this.props.player;
    return (
      <main id="userPage">    
        <section className="container">
          <div className="shadow bg_card">
            <div className="w-100 position-relative border-bottom userpage__bg" style={{backgroundImage: `url(${player.bgphoto})`}}>
              <figure className="position-absolute userpage__avatar" style={{bottom:"0",left:"0"}}>
                  <img width="100%" alt="player" src={player.photo}/>
              </figure>
            </div>
            <ul className="p-4 text_card">
              <h1>{player.name || ""}</h1>
              <li><span className="text-muted">Статус: </span>{player.status}</li>
              <li><span className="text-muted">Рейтинг: </span><FaStar className="text-warning" /> - {player.rating}/5</li>
              {player.status === "мастер" && <li><span className="text-muted">Проведенных игр: </span>{player.gamesCount}</li>}
              {player.status === "мастер" && <li><span className="text-muted">Платные игры: </span>{player.paidGames ? "водит" : "не водит"}</li>}
              <li><span className="text-muted">Зарегистрирован: </span>{moment(player.date).startOf('hour').fromNow()}</li>

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
              {player.leading &&
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
        </section>
    	</main>
	  )
	}
}

UserPage.propTypes = {
  fetchPlayer: PropTypes.func,
  player: PropTypes.object,
  logoutUser: PropTypes.func,
  auth: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  player: state.player.item
})

export default connect(mapStateToProps, { fetchPlayer, logoutUser })(UserPage);
