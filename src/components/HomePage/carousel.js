import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import {
  Carousel,
  CarouselItem,
  CarouselControl
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';

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
    const nextIndex = this.state.activeIndex === 3 - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? 3 - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }
  componentDidMount() {
    this.setState({ activeIndex: 0 });
  }
  componentWillMount() {
      this.props.fetchArticles();
    }
  render(){
    let articleSort = _.sortBy(this.props.articles, ['date']).reverse();

  	const { activeIndex } = this.state;

    const slides = articleSort.map((article, index)=>
        <CarouselItem
          key={article._id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
            <div className="container pt-5 pb-5">
              <div className="row text-white text-center justify-content-between">
                <div className="col-12 col-md-6">
                  <p className="text-left">{article.dateFor}</p>
                  <h1>{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</h1>
                  <p className="text-justify">{article.text.length > 600 ? article.text.slice(0,600) + "..." : article.text}</p>
                  <Link to={`/article/${article._id}`} className="btn btn-info mt-2">Читать дальше</Link>
                </div>
                <div className="col-12 col-md-6">
                  <img alt={article.title} style={{backgroundSize: "contain", height:"400px"}} src={article.picture} />
                </div>
              </div>
            </div>
        </CarouselItem>
      ).slice(0,3);
    return (
    	<div>
        <div id="headerCarousel" className=" bg-dark">
	    	  <Carousel	activeIndex={activeIndex}	next={this.next} previous={this.previous}	interval="3000">
		       {slides}
		        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
		        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
	      	</Carousel>
        </div>
		</div>
    )
  }
}
CarouselBlock.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  articles: state.articles.items
})

export default connect(mapStateToProps, { fetchArticles })(CarouselBlock);
