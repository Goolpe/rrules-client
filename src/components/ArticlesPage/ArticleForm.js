import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createArticle } from '../actions/postActions';

class ArticleForm extends Component {
	constructor(props){
		super(props);
		var dayArticle = new Date();
		var dateNow =  dayArticle.getDate() + '/' + (dayArticle.getMonth() + 1) + '/' + dayArticle.getFullYear();
		this.state = {
			title: '',
			text: '',
			date: dayArticle,
			dateFor: dateNow,
			hashtags: '',
			picture: '',
			status: false
			}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
	    window.scrollTo(0,0);
	}
	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}
	onSubmit(e){
		e.preventDefault();

		const article = {
		      	title: this.state.title,
				text: this.state.text,
				id: this.state.id,
				date: this.state.date,
				dateFor: this.state.dateFor,
				hashtags: this.state.hashtags,
				picture: this.state.picture
		     }
		this.props.createArticle(article);
		this.setState({
			title: '',
			text: '',
			hashtags: '',
			picture: ''})
	}
  render() {
	  return (
	  	<section id="articleform" style={{minHeight: "100vh"}}>	 
		  	<div className="container text-right mt-5 mb-5">
		  		<Link to="/articles" className="btn btn-link bg-transparent position-absolute border-0" style={{top:"14%",left:"70%"}}>
		  			<i className="fas fa-times-circle fa-3x text-info"></i>
		  		</Link>
	  			<h1 className="text-center mb-5">СОЗДАТЬ СТАТЬЮ</h1>	
		  	
	    		<form onSubmit={this.onSubmit} >
	    			<div className="form-group text-left">
	                	<label>Картинка</label>
	                	<input type="text" value={this.state.picture} onChange={this.onChange} name="picture" className="form-control" placeholder="" required />
		            </div>
		            <div className="form-group text-left">
		                <label>Заголовок</label>
		                <input type="text" value={this.state.title} onChange={this.onChange} name="title" className="form-control" aria-describedby="emailHelp" placeholder="" required/>
		            </div>
		            <div className="form-group text-left">
		                <label>Текст</label>
		                <textarea type="text" value={this.state.text} onChange={this.onChange} rows="15" cols="45" name="text" className="form-control" placeholder="" required>
		                </textarea>
		            </div>
		               <div className="form-group text-left">
		                <label>Теги</label>
		                <input type="text" value={this.state.hashtags} onChange={this.onChange} name="hashtags" className="form-control" placeholder="" required />
		            </div>
		            <button type="submit" className="btn btn-info w-100 p-3">Опубликовать</button>
	            </form>
	    	</div>	
    	</section>
	  )
	}
}

ArticleForm.propTypes = {
  createArticle: PropTypes.func.isRequired
};

export default connect(null, { createArticle })(ArticleForm);