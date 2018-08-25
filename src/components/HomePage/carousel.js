import React, { Component } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from 'reactstrap';

const items = [
  {
    src: 'headerBG.jpg',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: 'headerBG2.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'headerBG3.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

class CarouselBlock extends Component {
  constructor(props){
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }
  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  componentDidMount() {
    this.setState({ activeIndex: 0 });
  }
  
  render(){
  	const { activeIndex } = this.state;

    const slides = items.map((item) => 
        <CarouselItem

          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} style={{width:"100%"}} alt={item.altText} />
        </CarouselItem>
      )
    return (
    	<div>
        <div id="headerCarousel" className="bg-dark">
	    	  <Carousel	activeIndex={activeIndex}	next={this.next}	previous={this.previous}	interval="3000">
		        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
		        {slides}
		        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
		        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
	      	</Carousel>
        </div>
		</div>
    )
  }
}
export default CarouselBlock;
