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
    	<div id="HomePage">
        <CarouselBlock />
  			<Videos />
  			<Schedule className="pt-5"/>
        <Games />
  			<Arts />
  			<Merch />
  			<Social />
  			<Reviews />
		  </div>
    )
  } 
}
export default HomePage;
