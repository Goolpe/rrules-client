import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import {
  Carousel,
  CarouselItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';
import moment from 'moment';

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
              <div className="row pt-4 text_card pb-4 justify-content-between">
                <div className="col-12 col-lg-8 text-left">
                  <p>{moment(article.date).format('LL')}</p>
                  <h1 className="text-center">{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</h1>
                  <p className="text-justify">{article.text.length > 800 ? article.text.slice(0,800) + "..." : article.text}</p>
                  <Link to={`/article/${article._id}`} className="btn btn-info mt-2">Читать дальше</Link>
                </div>
                <div className="d-none d-lg-block col-lg-4">
                  <img alt={article.title} className="img-fluid" style={{backgroundSize: "contain", height:"400px"}} src={article.picture} />
                </div>
              </div>
        </CarouselItem>
      ).slice(0,3);
    return (
    	<div className="pt-3 pb-3">
	    	  <Carousel	activeIndex={activeIndex}	next={this.next} previous={this.previous}	interval="5000">
		       {slides}
	      	</Carousel>
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
