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
    constructor(props) {
    super(props);
    this.state={
      newsToggle: true,
      gamesToggle: true,
      youtubeToggle: true
    }
  }

  render(){
    return (
    	<section id="HomePage">
        <div className="container-fluid mt-5">
            <div className="container text-white">
              <div className="row">
                <div className="col-12 mb-4">
                  <p><span className="text-warning" >
                  <button className="btn bg-transparent text-white" onClick={()=>this.setState({newsToggle: !this.state.newsToggle})}>
                      {this.state.newsToggle ? <FaAngleUp/> : <FaAngleDown/>}
                  </button>
                  <FaNewspaper size="1.5em"/> Новости </span>
                     | <Link to="/articles">Все новости</Link>
                  </p>
                   <Collapse isOpen={this.state.newsToggle}>
                    <CarouselBlock />
                  </Collapse>
                </div>
                <div className="col-12 mb-4">
                  <p><span className="text-success">
                  <button className="btn bg-transparent text-white" onClick={()=>this.setState({gamesToggle: !this.state.gamesToggle})}>
                    {this.state.gamesToggle ? <FaAngleUp/> : <FaAngleDown/>}
                  </button>
                  <FaGamepad size="1.5em"/> Игры</span> | <Link to="/games">Все игры</Link>
                  </p>
                  <Collapse isOpen={this.state.gamesToggle}>
                    <Games />
                  </Collapse>

                </div>
                <div className="col-12">
                  <p>
                    <span className="text-danger">
                    <button className="btn bg-transparent text-white" onClick={()=>this.setState({youtubeToggle: !this.state.youtubeToggle})}>
                      {this.state.youtubeToggle ? <FaAngleUp/> : <FaAngleDown/>}
                    </button>
                    <FaYoutube size="1.5em"/> Стримы</span> | <Link to="/games">Все видео</Link>
                  </p>
                  <Collapse isOpen={this.state.youtubeToggle}>
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
                  </Collapse>
                </div>
              </div>
          </div>
        </div>
		  </section>
    )
  } 
}
export default HomePage;
