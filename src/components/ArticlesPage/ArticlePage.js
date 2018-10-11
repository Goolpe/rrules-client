import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticle } from '../actions/postActions';
import moment from 'moment';
import { FaAngleLeft } from "react-icons/fa";

class ArticlePage extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
    this.props.fetchArticle(this.props.match.params.id, this.props.history);
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
            <div className="w-100 text-center" style={{height:"300px", overflow: "hidden"}}><img className="img-fluid" style={{height:"300px"}} alt={article.title} src={article.picture} /></div>
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
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  article: state.article.item,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchArticle })(ArticlePage);