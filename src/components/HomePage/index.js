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

        <div className="container-fluid">

          <div className="row text-white">
            <div className="col-12">
              <Header />
            </div>
            <div className="col-12 col-md-4">
              <p>Youtube</p>
              <iframe width="100%" height="320" className="mb-3" title="youtube" src="https://www.youtube.com/embed?max-results=1&rel=0&listType=user_uploads&list=objectivitytime" frameBorder="0" allowFullScreen></iframe>
              <p>Twitch</p>
              <iframe width="100%" height="320" title="twitch" src="https://player.twitch.tv/?channel=random_rules" frameBorder="0" allowFullScreen></iframe>
            </div>
            <div className="col-12 col-md-4">
              <p>Игры | <Link to="/games">Все игры</Link></p>
              <Games />
              <p>Игры</p>
              <Games />
            </div>
            <div className="col-12 col-md-4">
              <p>Новости | <Link to="/articles">Все новости</Link></p>
              <News />
              <p>Новости</p>
              <News />
            </div>
          </div>
        </div>
        {/*<CarouselBlock />
  			<Videos />
  			<Schedule className="pt-5"/>
        <Games />
  			<Arts />
  			<Merch />
  			<Social />
  			<Reviews />*/}
		  </section>
    )
  } 
}
export default HomePage;
