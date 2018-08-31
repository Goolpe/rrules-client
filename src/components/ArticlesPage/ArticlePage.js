import React, { Component } from 'react';
import {
    Link,
} from 'react-router-dom';
import moment from 'moment';

class ArticlePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    window.scrollTo(0,0);
    const id = this.props.match.params.id
    
    fetch("https://randomrulesdb.herokuapp.com/articles/" + id)
      .then((resp) => resp.json())
      .then(data => this.setState({articles: data}))
    }
  render() {
	  return (
	  <section id="articlePage">	  
	  	<div className="container pt-5 pb-5" style={{minHeight: "100vh"}}>
      <Link to="/articles" className="text-dark"><i className="text-dark fas fa-angle-left "></i> ВСЕ СТАТЬИ</Link>
	  	<h1 className="text-center mb-5">{this.state.articles.title}</h1>
        <div className="row">
          <div className="col-12 col-md-4 order-md-2 text-right">
            <img className="img-fluid" alt={this.state.articles.title} src={this.state.articles.picture} />
            
          </div>
          <div className="col-12 col-md-8">
            <p>{this.state.articles.text}</p>
            <p className="mt-5">{moment(this.state.articles.date).format('LL')}</p>
          </div>
        </div>
    	</div>
    	</section>
	  );
	}
}

export default ArticlePage;