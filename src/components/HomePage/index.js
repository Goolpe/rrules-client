import React, { Component } from 'react';
import CarouselBlock from './carousel';
import Articles from './articles';
import Schedule from './schedule';
import Arts from './arts';
import Merch from './merch';
import Reviews from './reviews';
import Social from './social';
import Support from './support';

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

  			<Arts />
  			
  			<Merch />

  			<Social />

  			<Reviews />

        <Support />
		  </div>
    );
}
}
export default HomePage;
