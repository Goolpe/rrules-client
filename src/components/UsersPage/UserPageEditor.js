import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../actions/playerActions';

class UserPageEditor extends Component {
  constructor(props){
    super(props);
    this.state ={
      pictureEdit: false,
      photo: '',
      rating: 0,
      gamesCount: 0,
      about: '',
      master: false,
      skype: '',
      discord: '',
      examples: [],
      systems: '',
      setting: '',
      paidGames: false
    }

  }
  componentDidMount() {
    window.scrollTo(0,0);

  }
  componentWillMount() {
      this.props.fetchPlayers();
    }
  render() {
    const searchId = this.props.players.filter(player=> player.username === this.props.match.params.nickname)
    .map(player =>
        <div key={player.userId}>
            <div className="row mb-5 justify-content-center align-items-start">
              <div className="col-12 col-md-4 text-left mb-4"><Link to="/masters" className="text-dark"><i className="fas fa-angle-left "></i> ДРУГИЕ МАСТЕРА</Link></div>
              <div className="col-12 col-md-4 text-center" ><h1>{player.username}</h1></div>
              <div  className="col-12 col-md-4 text-right" ><Link to={`/@${player.username}`} className="btn btn-link bg-transparent border-0" >
              <i className="fas fa-window-close fa-3x text-info"></i>
            </Link></div>
            </div>
            <div className="row">
                <div className="col-12 col-md-6 order-md-2 mb-3 text-center">
                  {this.state.pictureEdit ?  
                  <div>
                    <button className="btn btn-outline-info" onClick={()=>{this.setState({pictureEdit:false})}}><i className="fas fa-times"></i></button>
                    <input type="text" value={this.state.picture} onChange={this.onChange} name="picture" className="form-control" placeholder="" required />
                    
                  </div>
                  :
                  <div>
                    <img src={player.picture} className="img-fluid" style={{maxHeight: 500}} alt="" />
                    <button className="btn btn-outline-info" onClick={()=>{this.setState({pictureEdit:true})}}><i className="fas fa-pencil-alt"></i></button>
                  </div>}
                 
                </div>
                <div className="col-12 col-md-6">
                  <h3 className="mb-4">Контакты:</h3>
                      <p><span className="font-weight-bold">Discord</span> - {player.discord}<br />
                  <span className="font-weight-bold">Skype</span> - {player.skype}<br />
                  </p>
                  <p>
                    Водит на канале с {player.dateReg}<br />
                    {player.paidGames ? "Водит" : "Не водит"} платные игры<br />
                  </p>
                  <h3 className="mb-4">О себе:</h3>
                  <p>{player.about}</p>
                  <h3 className="mb-4">Любимые системы:</h3><p>{player.systems}</p>
                  <h3 className="mb-4">Любимые сеттинги:</h3><p>{player.setting}</p>
                  <h3 className="mb-4">Примеры игр</h3>
                </div>
            </div>
          </div>)

    const masterYoutube = this.props.players.map((player) => 
      <div className="col-12 col-md-6 mb-3" key={player.username}>
        <iframe
          title={player.userId}
            src={player.example}
            width="100%" 
            height="340"
            frameBorder="0"
            allowFullScreen>
        </iframe>
      </div>
    )
	  return (
  	  <section id="masterPage" style={{minHeight: "100vh"}}>	  
  	  	<div className="container mt-5 mb-5">
          {searchId}
          <div className="row">
            {masterYoutube}
          </div>
      	</div>
    	</section>
	  )
	}
}

UserPageEditor.propTypes = {
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  players: state.players.items
})

export default connect(mapStateToProps, { fetchPlayers })( UserPageEditor);
