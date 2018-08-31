import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';

class ArticlesPage extends Component {
	constructor(props){
    	super(props);
    	this.state = {
    		articlesNew: [],
    	}
	}
	componentDidMount() {
		window.scrollTo(0,0);
	}
	componentWillMount() {
	    this.props.fetchArticles();
	  }

	render() {		
		let articleSort = _.sortBy(this.props.articles, ['date']).reverse();
	  	const listItems = articleSort.map((article, index) =>
	    	<div className="card text-justify mb-5 border-0 shadow-sm" key={article._id}>
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
			    		<div className="col-12 col-md-6 text-muted mb-2">{article.dateFor}</div>
			    		<div className="col-12 col-md-6 text-right">{article.hashtags}</div>
			    	</div>
			  	</div>	
			</div>
		)
		return (
			<section id="articlesPage" style={{minHeight: "100vh"}}>	  
				<div className="container text-right pt-5 pb-5">
					<div className="row">
						<div className="col-3"></div>
						<div className="col-6">
							<h1 className="text-center mb-5">НОВОСТИ
							</h1>
						</div>
						<div className="col-3">
							{this.props.auth.moderator && <Link to="/new-article" className="btn btn-link bg-transparent border-0" >
								<i className="fas fa-plus-circle fa-3x text-info"></i>
							</Link>}
						</div>
					</div>
					<ul>{listItems}</ul>				
				</div>
			</section>
		)
	}
}

ArticlesPage.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	articles: state.articles.items,
	auth: state.auth
})

export default connect(mapStateToProps, { fetchArticles })(ArticlesPage);


