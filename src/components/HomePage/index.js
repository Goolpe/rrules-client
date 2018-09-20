import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Msgs from './msgs';
import Games from './games';
import News from './news';
import Header from './header';


class HomePage extends Component {
 
  componentDidMount() {
    window.scrollTo(0,0);
  }
  
  render(){

    return (
    	<section id="HomePage">
        <div className="container-fluid mt-5">
            <div className="container text-white">
              <div className="row">
                <div className="col-12 col-md-6">
                  <p>Игры | <Link to="/games">Все игры</Link></p>
                  <Games />
                  </div>
                <div className="col-12 col-md-6">
                  <p>Новости | <Link to="/articles">Все новости</Link></p>
                  <News />
                 </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                 <p>Youtube | <Link to="/games">Все видео</Link></p>
                  <iframe width="100%" height="320" className="mb-3" title="youtube" src="https://www.youtube.com/embed?max-results=1&rel=0&listType=user_uploads&list=objectivitytime" frameBorder="0" allowFullScreen></iframe>
                </div>
                <div className="col-12 col-md-6">
                  <p>Twitch | <Link to="/games">Все видео</Link></p>
                  <iframe width="100%" height="320" title="twitch" src="https://player.twitch.tv/?channel=random_rules" frameBorder="0" allowFullScreen></iframe>
                </div>
              </div>
          </div>
        </div>
		  </section>
    )
  } 
}
export default HomePage;
