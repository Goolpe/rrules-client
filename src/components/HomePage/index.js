import React, { Component } from 'react';
import CarouselBlock from './carousel';
import Videos from './videos';
import Schedule from './schedule';
import Games from './games';
import Arts from './arts';
import Merch from './merch';
import Reviews from './reviews';
import Social from './social';


class HomePage extends Component {
 
  componentDidMount() {
    window.scrollTo(0,0);
  }
  
  render(){
    return (
    	<section id="HomePage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6">
              <Games />
            </div>
            <div className="col-12 col-md-6">
              <div className="shadow page_card">123</div>
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
