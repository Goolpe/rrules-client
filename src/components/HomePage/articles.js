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
  	render() {
	  	let articleSort = _.sortBy(this.props.articles, ['date']).reverse();

		const listItems = articleSort.map((article, index)=>

			<div className="col-12 col-md-6 col-lg-3 mb-2"  key={article._id}>
				<div className="card rounded-0 border-0" style={ { backgroundImage: `url(${article.picture})` } }>
				  	<div className="card-body font-weight-bold" style={ {backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
					    <h6 className="card-subtitle text-right mb-2">{article.dateFor}</h6>
					    <h5 className="card-title">{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</h5>
					    <p className="card-text">{article.text.length > 150 ? article.text.slice(0,150) + "..." : article.text}</p>
					    <Link to={`/article/${article._id}`} className="btn btn-info mt-2">Читать дальше</Link>
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
  articles: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	articles: state.articles.items
})

export default connect(mapStateToProps, { fetchArticles })(Articles);

