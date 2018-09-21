import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Msgs from './msgs';
import Games from './games';
import CarouselBlock from './carousel';
import News from './news';
import Header from './header';
import { FaTwitch, FaYoutube, FaGamepad, FaNewspaper, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import { FiPlay } from "react-icons/fi";
import { UncontrolledCollapse  } from 'reactstrap';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class HomePage extends Component {

  render(){
    return (
    	<section id="HomePage">
        <div className="container-fluid mt-5">
            <div className="container text-white">
              <div className="row">
                <div className="col-12 mb-4">
                  <p><span className="text-warning" >
                  <FaNewspaper size="1.5em"/> Новости </span>
                     | <Link to="/articles">Все новости</Link>
                  </p>
                    <CarouselBlock />
                </div>
                <div className="col-12 mb-4">
                  <p><span className="text-success">
                  <FaGamepad size="1.5em"/> Игры</span> | <Link to="/games">Все игры</Link>
                  </p>
                    <Games />
                </div>
                <div className="col-12">
                  <p>
                    <span className="text-danger">
                    <FaYoutube size="1.5em"/> Стримы</span> | <Link to="/games">Все видео</Link>
                  </p>
                  <div className="row text-white">
                    <div className="col-12 col-md-6 col-lg-3 mt-2">
                      <iframe width="100%" title="video1" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw" frameBorder="0" allowFullScreen></iframe>
                      </div>
                      <div className="col-12 col-md-6 col-lg-3 mt-2">
                      <iframe width="100%" title="video2" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=1" frameBorder="0" allowFullScreen></iframe>
                      </div>
                    <div className="col-12 col-md-6 col-lg-3 mt-2">
                      <iframe width="100%" title="video3" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=2" frameBorder="0" allowFullScreen></iframe>
                    </div>
                    <div className="col-12 col-md-6 col-lg-3 mt-2">
                      <iframe width="100%" title="video4" height="300" src="https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw&index=3" frameBorder="0" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
		  </section>
    )
  } 
}
export default HomePage;
