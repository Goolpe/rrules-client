import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Games from './games';
import CarouselBlock from './carousel';
import Social from './social';
import { FaYoutube, FaGamepad, FaNewspaper, FaGlobe } from 'react-icons/fa';
import Streams from './streams';

class HomePage extends Component {

  render(){
    return (
    	<section id="HomePage">
        <div className="container-fluid">
            <div className="container text-white">
                <div className="mb-5">
                  <span className="text-warning" >
                  <FaNewspaper size="1.5em"/> Новости </span>
                     | <Link to="/articles">Все новости</Link>
                    <CarouselBlock />
                </div>
                <div className="mb-5">
                  <span className="text-danger">
                  <FaYoutube size="1.5em"/> Стримы</span> | 
                  <a href="https://www.twitch.tv/random_rules" target="_blank" rel="noopener noreferrer"> Youtube</a> |
                  <a href="https://www.youtube.com/randomrulez" target="_blank" rel="noopener noreferrer"> Twitch</a> 
                  <Streams/>
                </div>
                <div className="mb-5">
                  <span className="text-success">
                  <FaGamepad size="1.5em"/> Игры</span> | <Link to="/games">Все игры</Link>
                  <Games />
                </div>
                <div className="mb-5">
                  <span className="text-info">
                  <FaGlobe size="1.5em"/> Random Rules </span><span className="text-white">в социальных сетях</span>
                  <Social />
                </div>
          </div>
        </div>
		  </section>
    )
  } 
}
export default HomePage;
