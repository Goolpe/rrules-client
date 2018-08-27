import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';
import moment from 'moment';

class UserPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }
  componentDidMount() {
    window.scrollTo(0,0);

  }
  componentWillMount() {
      this.props.fetchPlayers();
    }
  render() {
    const searchId = this.props.players
    .filter(player => player.username === this.props.match.params.nickname)
    .map(player =>
      <div key={player.userId}>
            <div className="row mb-5 justify-content-center align-items-start">
              <div className="col-12 col-md-4 text-left mb-4"><Link to="/masters" className="text-dark"><i className="fas fa-angle-left "></i> ДРУГИЕ {player.master ? "МАСТЕРА" : "ИГРОКИ"}</Link></div>
              <div className="col-12 col-md-4 text-center"><h1>{player.username}</h1>{player.master && <p>мастер</p>}</div>
              <div  className="col-12 col-md-4 text-right">{this.state.isAuthenticated && <Link to={`/edit/@${player.username}`} className="btn btn-link bg-transparent border-0" >
                <i className="fas fa-pen-square fa-3x text-info"></i>
              </Link>}</div>
            </div>
            <div className="row">
              <div className="col-12 col-md-6 order-md-2 mb-3 text-center">
                <img src={player.photo} className="img-fluid" style={{maxHeight: 500}} alt="" />
              </div>
              <div className="col-12 col-md-6">
                <h3 className="mb-4">Рейтинг: <div className="btn btn-outline-warning">{player.rating}</div></h3>
                <h3 className="mb-4">Контакты:</h3>
                <p><span className="font-weight-bold">Discord</span> - {player.discord}<br />
                <span className="font-weight-bold">Skype</span> - {player.skype}<br />
                </p>
                <p>Зарегистрирован {moment(player.dateReg).format('LL')}</p>
                  {player.master && <p>{player.paidGames ? "Водит" : "Не водит"} платные игры</p>}
                <h3 className="mb-4">О себе:</h3>
                <p>{player.about}</p>
                <h3 className="mb-4">Любимые системы:</h3><p>{player.systems}</p>
                <h3 className="mb-4">Любимые сеттинги:</h3><p>{player.setting}</p>
                <h3 className="mb-4">Примеры игр</h3>
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
  	  <section id="masterPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container mt-5 mb-5">
          {searchId}
      	</div>
    	</section>
	  )
	}
}

UserPage.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items
})

export default connect(mapStateToProps, { fetchPlayers })(UserPage);
