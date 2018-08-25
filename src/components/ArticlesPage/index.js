import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';

class ArticlesPage extends Component {
	componentDidMount() {
		window.scrollTo(0,0);
	
	}
	componentWillMount() {
	    this.props.fetchArticles();
	  }

	componentWillReceiveProps(nextProps) {
	    if (nextProps.newArticle) {
	      this.props.articles.unshift(nextProps.newArticle);
	    }
  	}
	render() {		
		let articleSort = _.sortBy(this.props.articles, ['date']).reverse();

	  	const listItems = articleSort.map((article, index) =>
	    	<div className="card mb-5" key={article._id}>
			  	<div className="card-body">
			  		<div className="row">
			  			<div className="col-12 col-md-3 mb-3">
			  				<img src={article.picture} alt="" />
			  			</div>
			  			<div className="col-12 col-md-8">
			  				<h5 className="card-title">{article.title}</h5>
						    <p className="card-text ">{article.text.slice(0,1000)}</p>
						    <Link to={`/article/${article._id}`} className="btn btn-info">Читать дальше</Link>
						</div>
			  		</div>
			  	</div>
			  	<div className="card-footer text-primary">
			    	<div className="row">
			    		<div className="col-12 col-md-6 text-muted mb-2">{article.date}</div>
			    		<div className="col-12 col-md-6 text-right">{article.hashtags}</div>
			    	</div>
			  	</div>	
			</div>
		)
		return (
			<section id="articlesPage" style={{minHeight: "100vh"}}>	  
				<div className="container text-right mt-5 mb-5">
					<Link to="/new-article" className="btn btn-link bg-transparent position-absolute border-0">
						<i className="fas fa-plus-circle fa-3x text-info"></i>
					</Link>
					<h1 className="text-center mb-5">СТАТЬИ</h1>
					<ul className="container text-left">{listItems}</ul>				
				</div>
			</section>
		)
	}
}

ArticlesPage.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  newArticle: PropTypes.object
};

const mapStateToProps = state => ({
	articles: state.articles.items,
	newArticle: state.articles.item
})

export default connect(mapStateToProps, { fetchArticles })(ArticlesPage);


