import React, { Component } from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaTimes, FaPlus } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { fetchPersons } from '../actions/personActions';
import { addPlayerGameData, fetchGames } from '../actions/gameActions';

class Msgs extends Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated){
      this.props.fetchGames();
      this.props.fetchPersons()
    }
    else{
      this.props.history.push('/auth');
    }
  }
  handleAccept(game, sender) {
    const gameData = {
      id: game,
      gamerInsideId: sender,
      accept: true,
      decline: false,
      show: true,
    };
    this.props.addPlayerGameData(gameData);
  }

  handleDecline(game, sender, msgAcc, msgDec) {
    if(msgDec === false && msgAcc === false){
      msgDec = true;
    }
    const gameData = {
      id: game,
      gamerInsideId: sender,
      accept: msgAcc,
      decline: msgDec,
      show: false,
    };
    this.props.addPlayerGameData(gameData);
  }

  render() {
    let messagesItems;
    this.props.games && (messagesItems = this.props.games.filter(
    game => game.name === this.props.auth.user.id).map(game =>
      game.gamersInsideId.filter(gamer => gamer.show === true)
      .map((msg,index) => 
        <div className='shadow bg_card text_card pb-2 pl-2 pr-2 mb-3' key={index}>
          <div className='row align-items-center'>
            <div className='col-12 col-md-2 mt-2'>
              {this.props.persons.filter(player => msg.user === player.id).map(player =>
                <React.Fragment key={index}>
                  <Link target='_blank' className='mr-3' to={`/@${player.name}`}>{player.name}</Link>
                </React.Fragment>
              )}
            </div>
            <div className='col-12 col-md-8 mt-2'>
              <Link target='_blank' to={`/game/${game._id}`}>{game.nameGame}</Link>
            </div>
            <div className='col-12 col-md-2 mt-2 text-right'>
              {!msg.accept && !msg.decline ? 
                <React.Fragment>
                  <button className='btn bg-transparent text_card userpage__facog'
                    onClick={ () => {this.handleAccept(game._id, msg.user)} }
                  >
                    <FaPlus size='1.5em'/>
                  </button>
                </React.Fragment>
              :
                <React.Fragment>
                  {msg.accept && 'Добавлен'}
                </React.Fragment>
              }
              <button className='btn bg-transparent text_card userpage__facog'
                onClick={ () => {this.handleDecline(game._id, msg.user, msg.accept, msg.decline)} }
              >
                <FaTimes size='1.5em'/>
              </button>
            </div>
          </div>
        </div>,
      )
    ))

  return (
    <main>
      <section className='container'>
        <h1 className='text_card'>
          <FiMail size='1.5em'/> Сообщения
        </h1>
        <section>
          {messagesItems}
        </section>
      </section>
    </main>
  )
  }
}

Msgs.propTypes = {
  auth: PropTypes.object,
  fetchPersons: PropTypes.func,
  persons: PropTypes.array,
  addPlayerGameData: PropTypes.func,
  fetchGames: PropTypes.func,
  games: PropTypes.array,
};

const mapStateToProps = state => ({
  games: state.games.items,
  persons: state.persons.items,
  auth: state.auth,
});

export default connect(mapStateToProps, { addPlayerGameData, fetchGames, fetchPersons })(withRouter(Msgs));

