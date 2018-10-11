import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import {
  Carousel,
  CarouselControl,
  CarouselItem
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';
import moment from 'moment';

class NewsBlock extends Component {
  constructor(props){
    super(props);
    this.state = { 
      activeIndex: 0
     };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    this.setState({ 
      activeIndex: 0 });
    this.props.fetchArticles()
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

  render(){
    let articleSort = _.sortBy(this.props.articles, ['date']).reverse();

  	const { activeIndex } = this.state;

    const slides = articleSort.map((article, index)=>
      <CarouselItem
        key={index}
        onExiting={this.onExiting}
        onExited={this.onExited}
        className="news__carousel"
      >
      <div  style={{height:"100%", background: "url(https://images4.alphacoders.com/823/thumb-1920-82368.jpg)"}}>
        <div className="news__item">
        <div className="row text_card justify-content-between align-items-center" style={{height:"100%"}}>
          <section className="col-12 col-lg-8 text-left">
            {/*<time>{moment(article.date).format('LL')}</time>*/}
            <h1 className="text-left">{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</h1>
            <article className="text-justify">{article.text.length > 800 ? article.text.slice(0,300) + "..." : article.text}</article>
            <Link to={`/article/${article._id}`} className="btn btn-info mt-2">Читать дальше</Link>
          </section>
          <figure className="d-none d-lg-block col-lg-4">
            <img alt={article.title} className="img-fluid" style={{backgroundSize: "contain", height:"400px"}} src={article.picture} />
          </figure>
        </div>
        </div>
      </div>
      </CarouselItem>
      ).slice(0,3);
    return (
      <div className="homepage__news d-flex align-items-center" >
    	   <Carousel activeIndex={activeIndex}	next={this.next} previous={this.previous}	interval="5000" >
    		  {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
    	   </Carousel>
      </div>
    )
  }
}

NewsBlock.propTypes = {
  fetchArticles: PropTypes.func,
  articles: PropTypes.array
};

const mapStateToProps = state => ({
  articles: state.articles.items
})

export default connect(mapStateToProps, { fetchArticles })(NewsBlock);
