import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import mastersJSON from "./mastersJSON.json";

class MasterPage extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
  	const id = parseInt(this.props.match.params.id.replace(/\D+/g,""), 10);
    const masterYoutube = mastersJSON[id].examples.map((example, index) => 
      <div className="col-12 col-md-6 mb-3" key={index}>
        <iframe
          title={mastersJSON[id].skype}
            src={example}
            width="100%" 
            height="340"
            frameBorder="0"
            allowFullScreen>
        </iframe>
      </div>
    )
	  return (
	  <section id="masterPage">	  
	  	<div className="container mt-5 mb-5">
        <div className="row mb-5 justify-content-center align-items-start">
    	  	<div className="col-12 col-md-4 text-left mb-4"><Link to="/masters" className="text-dark"><i className="fas fa-angle-left "></i> ДРУГИЕ МАСТЕРА</Link></div>
          <div className="col-12 col-md-4 text-center" ><h1>{mastersJSON[id].nickname}</h1></div>
          <div  className="col-12 col-md-4" ></div>
        </div>
          <div className="row">
            <div className="col-12 col-md-6 order-md-2 mb-3 text-center">
              <img src={mastersJSON[id].picture} className="img-fluid" style={{maxHeight: 500}} alt="" />
            </div>
            <div className="col-12 col-md-6">
        	  	<h3 className="mb-4">Контакты:</h3>
                  <p><span className="font-weight-bold">Discord</span> - {mastersJSON[id].discord}<br />
              <span className="font-weight-bold">Skype</span> - {mastersJSON[id].skype}<br />
              </p>
              <p>
                Водит на канале с {mastersJSON[id].date}<br />
                {mastersJSON[id].paidGames ? "Водит" : "Не водит"} платные игры<br />
              </p>
              <h3 className="mb-4">О себе:</h3>
              <p>{mastersJSON[id].text}</p>
              <h3 className="mb-4">Любимые системы:</h3><p>{mastersJSON[id].systems}</p>
              <h3 className="mb-4">Любимые сеттинги:</h3><p>{mastersJSON[id].setting}</p>
              <h3 className="mb-4">Примеры игр</h3>
            </div>
          
        </div>
        <div className="row">
          {masterYoutube}
        </div>
    	</div>
    	</section>
	  );
	}
}

export default MasterPage;
