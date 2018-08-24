import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';
import ArticleForm from './ArticleForm';

class ArticlesPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			articles: [],
			newArticle: false
		}
	}
	componentDidMount() {
		window.scrollTo(0,0);

		fetch("https://randomrulesdb.herokuapp.com//articles")
		.then((resp) => resp.json())
		.then(data => 
			this.setState({articles: data.reverse()}))
	}
	render() {
	  const listItems = this.state.articles.map((article, index) =>
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
	  );
	  return (
	  <section id="articlesPage" style={{minHeight: "100vh"}}>	  
	  	<div className="container text-right mt-5 mb-5">
	  		<Link to="/new-article" className="btn btn-link bg-transparent position-absolute border-0"><i className="fas fa-plus-circle fa-3x text-info"></i></Link>
	  		<h1 className="text-center mb-5">СТАТЬИ</h1>
	  		<ul className="container text-left">{listItems}</ul>				
    	</div>
    	</section>
	  );
	}
}



export default ArticlesPage;


