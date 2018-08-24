import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createPost} from '../actions/postActions';
import { connect } from 'react-redux';

import {
    Link,
} from 'react-router-dom';
import articles from './articles.json';

class ArticleForm extends Component {
	constructor(props){
	super(props);
	this.state = {
		title: '',
		body: ''
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

		const post = {
			title: this.state.title,
			body: this.state.body,
			id: this.state.id
		}

		this.props.createPost(post)
	}
	
  render() {
	  return (
	  <section id="articleform">	  
	  	<div className="container mb-5" style={{minHeight: "100vh"}}>
    		<form onSubmit={this.onSubmit} >
              <div className="form-group text-left">
                <label>Заголовок</label>
                <input type="text" value={this.state.title} onChange={this.onChange} name="title" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="" required/>
              </div>
              <div className="form-group text-left">
                <label>Текст</label>
                <textarea type="text" value={this.state.body} onChange={this.onChange} rows="15" cols="45" name="body" className="form-control" id="InputPassword1" placeholder="" required>
                </textarea>
              </div>
              <button type="submit" className="btn btn-info w-100 p-3">Опубликовать</button>
            </form>
    	</div>	
    	</section>
	  );
	}
}

ArticleForm.propTypes = {
	createPost : PropTypes.func.isRequired
}

export default connect(null, { createPost })(ArticleForm);


