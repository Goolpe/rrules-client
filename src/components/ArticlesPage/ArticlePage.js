import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticle } from '../actions/postActions';
import moment from 'moment';

class ArticlePage extends Component {
  componentDidMount() {
    window.scrollTo(0,0);
  }
  componentWillMount(){
    this.props.fetchArticle(this.props.match.params.id, this.props.history);
  }

  render() {
    const article = this.props.article;

	  return (
	  <section id="articlePage">	  
	  	<div className="container pt-5 pb-5" style={{minHeight: "100vh"}}>
      <Link to="/articles" className="text-dark"><i className="text-dark fas fa-angle-left "></i> ВСЕ СТАТЬИ</Link>
	  	<h1 className="text-center mb-5">{article.title}</h1>
        <div className="row">
          <div className="col-12 col-md-4 order-md-2 text-right">
            <img className="img-fluid" alt={article.title} src={article.picture} />
            
          </div>
          <div className="col-12 col-md-8">
            <p>{article.text}</p>
            <p className="mt-5">{moment(article.date).format('LL')}</p>
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