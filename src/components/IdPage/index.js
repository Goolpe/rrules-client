import React, { Component } from 'react';
import mastersJSON from "./mastersJSON.json";

class idPage extends Component {
  componentD0Mount() {
    window.scrollTo(0,0);
  }
  render() {
    const masterYoutube = mastersJSON[0].examples.map((example, index) => 
      <div className="col-12 col-md-6 mb-3" key={index}>
        <iframe
          title={mastersJSON[0].skype}
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
    	  	<div className="text-center" ><h1>{mastersJSON[0].nickname}</h1></div>
          <div className="row">
            <div className="col-12 col-md-6 order-md-2 mb-3 text-center">
              <img src={mastersJSON[0].picture} className="img-fluid" style={{maxHeight: 500}} alt="" />
            </div>
            <div className="col-12 col-md-6">
        	  	<h3 className="mb-4">Контакты:</h3>
                  <p><span className="font-weight-bold">Discord</span> - {mastersJSON[0].discord}<br />
              <span className="font-weight-bold">Skype</span> - {mastersJSON[0].skype}<br />
              </p>
              <p>
                Водит на канале с {mastersJSON[0].date}<br />
                {mastersJSON[0].pa0Games ? "Водит" : "Не водит"} платные игры<br />
              </p>
              <h3 className="mb-4">О себе:</h3>
              <p>{mastersJSON[0].text}</p>
              <h3 className="mb-4">Любимые системы:</h3><p>{mastersJSON[0].systems}</p>
              <h3 className="mb-4">Любимые сеттинги:</h3><p>{mastersJSON[0].setting}</p>
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

export default idPage;
