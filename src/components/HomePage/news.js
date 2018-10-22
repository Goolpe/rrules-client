import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import {
  Carousel,
  CarouselControl,
  CarouselItem,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { fetchArticles } from '../actions/newsActions';

class NewsBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentDidMount() {
    this.setState({
      activeIndex: 0,
    });
    this.props.fetchArticles();
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

  render() {
    const articleSort = _.sortBy(this.props.articles, ['date']).reverse();

    const { activeIndex } = this.state;

    const slides = articleSort.map((article, index) =>
      <CarouselItem
        key={index}
        onExiting={this.onExiting}
        onExited={this.onExited}
        className='news__carousel'
      >
        <div className='news__wrapper' style={ { backgroundImage: `url(${article.bgImage}` } }>
          <div className='news__item'>
            <section className='text-left news__article'>
              {/*  <time>{moment(article.date).format('LL')}</time>  */}
              <h1 className='text-left'>
                {article.title.length > 25
                  ?
                  (article.title.slice(0, 40).toUpperCase() + '...')
                  :
                  article.title.toUpperCase()
                }
              </h1>
              <hr color='#fff' width='50%' align='left'/>
              <article className='text-justify'>
                {article.text.length > 800
                  ?
                  article.text.slice(0, 500) + '...'
                  :
                  article.text
                }
              </article>
              <Link to={`/article/${article._id}`} className='btn btn-outline-light mt-5'>Читать дальше</Link>
            </section>
          </div>
        </div>
      </CarouselItem>,
    ).slice(0, 3);
    return (
      <div className='bg_card d-flex align-items-center' >
         <Carousel activeIndex={activeIndex} next={this.next} previous={this.previous} interval='10000'>
          {slides}
          <CarouselControl direction='prev' directionText='Previous' onClickHandler={this.previous} />
          <CarouselControl direction='next' directionText='Next' onClickHandler={this.next} />
         </Carousel>
      </div>
    );
  }
}

NewsBlock.propTypes = {
  fetchArticles: PropTypes.func,
  articles: PropTypes.array,
};

const mapStateToProps = state => ({
  articles: state.articles.items,
});

export default connect(mapStateToProps, { fetchArticles })(NewsBlock);
