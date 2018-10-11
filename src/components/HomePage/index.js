import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Games from '../GamesPage/GamesBlock';
import NewsBlock from './news';
import Social from './social';
import { FaYoutube, FaGamepad, FaGlobe } from 'react-icons/fa';
import Streams from './streams';
import '../style/home.css';

class HomePage extends Component {
  
  render(){
    return (
    	<main id="HomePage">
        <NewsBlock />
        <section className="container text_card">
          <section>
            <h1>
              <span className="text-danger">
              <FaYoutube size="1.5em"/> Стримы</span> | 
              <a href="https://www.twitch.tv/random_rules" className="text_card" target="_blank" rel="noopener noreferrer"> Youtube</a> |
              <a href="https://www.youtube.com/randomrulez" className="text_card" target="_blank" rel="noopener noreferrer"> Twitch</a>
            </h1> 
            <Streams/>
          </section>
          <section>
            <h1>
              <span className="text-success">
              <FaGamepad size="1.5em"/> Игры</span> | <Link to="/games" className="text_card">Все игры</Link>
            </h1>
            <Games />
          </section>
          <section>
            <h1>
              <span className="text-info">
              <FaGlobe size="1.5em"/> Random Rules </span>в социальных сетях
            </h1>
            <Social />
          </section>
        </section>
		  </main>
    )
  } 
}
export default HomePage;
