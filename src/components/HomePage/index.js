import React, { Component } from 'react';
import CarouselBlock from './carousel';
import Articles from './articles';
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
    	<div>
        <CarouselBlock />
  			<Articles />
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
