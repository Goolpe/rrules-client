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
	  <section id="articlePage">
      <div className="container text_card">	 
        <Link to="/articles" className="btn p-0">
          <FaAngleLeft size="1.5em"/> Все статьи 
        </Link> 
  	  	<div className="m-auto pb-5 pt-5 text-left" style={{width:"70%"}}>
            <div className="bg_card">
              <h1 className="text-center mb-5 pt-5">{article.title}</h1>
              <div className="w-100 text-center" style={{height:"300px", overflow: "hidden"}}><img className="img-fluid" style={{height:"300px"}} alt={article.title} src={article.picture} /></div>
              <div className="container">
                <p className="pt-5">{article.text}</p>
                <p className="pt-5 pb-5">{moment(article.date).format('LL')}</p>
              </div>
            </div>
        </div>
      </div>
    	</section>
	  );
	}
}

ArticlePage.propTypes = {
  fetchArticle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article.item,
  auth: state.auth
})

export default connect(mapStateToProps, { fetchArticle })(ArticlePage);