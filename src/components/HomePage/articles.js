import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';

class Articles extends Component {	
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

		const listItems = articleSort.map((article, index)=>
			<div className="col-12 col-md-6 col-lg-3 mb-2" key={article._id}>
				<div className="card rounded-0" style={ { backgroundImage: `url(${article.picture})` } }>
				  	<div className="card-body font-weight-bold">
					    <h6 className="card-subtitle mb-2 text-muted">{article.date}</h6>
					    <h5 className="card-title">{article.title.slice(0,50)}</h5>
					    <p className="card-text">{article.text.slice(0,100)}</p>
					    <Link to={`/article/${article._id}`} className="btn btn-info">Читать дальше</Link>
				  	</div>
				</div>	
			</div>
		).slice(0,4);

	    return (
	    	<div className="container-fluid pt-5" id="articles">
				<p className="text-white font-weight-bold">ПОСЛЕДНИЕ СТАТЬИ | <Link to="/articles" className="text-info">Все статьи</Link></p>
	    		<div className="row text-white">
	    			{listItems}
	    		</div>
	    	</div>
	    )
	}
}

Articles.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  newArticle: PropTypes.object
};

const mapStateToProps = state => ({
	articles: state.articles.items,
	newArticle: state.articles.item
})

export default connect(mapStateToProps, { fetchArticles })(Articles);