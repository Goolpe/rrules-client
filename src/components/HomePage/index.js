import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Games from '../GamesPage/GamesBlock';
import CarouselBlock from './carousel';
import Social from './social';
import { FaYoutube, FaGamepad, FaGlobe } from 'react-icons/fa';
import Streams from './streams';

class HomePage extends Component {

  render(){
    return (
    	<section id="HomePage">
        <div className="container-fluid">
            <div className="container text_card">
                <div className="mb-5">
                    <CarouselBlock />
                </div>
                <div className="mb-5">
                  <span className="text-danger">
                  <FaYoutube size="1.5em"/> Стримы</span> | 
                  <a href="https://www.twitch.tv/random_rules" className="text_card" target="_blank" rel="noopener noreferrer"> Youtube</a> |
                  <a href="https://www.youtube.com/randomrulez" className="text_card" target="_blank" rel="noopener noreferrer"> Twitch</a> 
                  <Streams/>
                </div>
                <div className="mb-5">
                  <span className="text-success">
                  <FaGamepad size="1.5em"/> Игры</span> | <Link to="/games" className="text_card">Все игры</Link>
                  <div className="pt-3">
                    <Games />
                  </div>
                </div>
                <div className="mb-5">
                  <span className="text-info">
                  <FaGlobe size="1.5em"/> Random Rules </span><span className="text_card">в социальных сетях</span>
                  <Social />
                </div>
          </div>
        </div>
		  </section>
    )
  } 
}
export default HomePage;
