import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';
import moment from 'moment';
import { fetchArticle } from '../actions/newsActions';

class ArticlePage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchArticle(this.props.match.params.id, this.props.history);
  }
  componentDidUpdate(prevProps){
    if(this.props.match.params.id !== prevProps.match.params.id){
      window.scrollTo(0, 0);
      this.props.fetchArticle(this.props.match.params.id, this.props.history);
    }
  }
  render() {
    const article = this.props.article;
    return (
      <main>
        <section className="container text_card">
          <Link to="/articles" className="btn p-0 text_card">
            <FaAngleLeft size="1.5em"/> Все статьи
          </Link>
          <section className="text-left bg_card mt-3">
            <h1 className="text-center mb-5">{article.title}</h1>
            <div className="w-100 text-center" style={ { overflow: 'hidden' } }>
              <img className="img-fluid" style={ { width: '100%' } } alt={article.title} src={article.bgImage} />
            </div>
            <div className="container">
              <p className="pt-5">{article.text}</p>
              <p className="pt-5 pb-5">{moment(article.date).format('LL')}</p>
            </div>
          </section>
        </section>
      </main>
    );
  }
}

ArticlePage.propTypes = {
  fetchArticle: PropTypes.func,
  article: PropTypes.object,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  article: state.article.item,
  auth: state.auth,
});

export default connect(mapStateToProps, { fetchArticle })(ArticlePage);