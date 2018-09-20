import React, { Component } from 'react';
import CarouselBlock from './carousel';
import Msgs from './msgs';
import Games from './games';
import News from './news';
import Header from './header';
import Reviews from './reviews';
import Social from './social';


class HomePage extends Component {
 
  componentDidMount() {
    window.scrollTo(0,0);
  }
  
  render(){
    
    return (
    	<section id="HomePage">
        <div className="grid-container">
          <div className="grid-item item-header"><Header /></div>
          <div className="grid-item item-msgs"><Msgs /></div>
          <div className="grid-item item2">2</div>
          <div className="grid-item item-games"><Games /></div>  
          <div className="grid-item item-news"><News /></div>
        </div>
{/*        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-4">
              
            </div>
            <div className="col-12 col-md-4">
              
            </div>
            <div className="col-12 col-md-4">
              
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-4">
              <Msgs />
            </div>
            <div className="col-12 col-md-4">
              <Games />
            </div>
          </div>
        </div>*/}
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
