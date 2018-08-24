import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Link,
} from 'react-router-dom';

class ArticleForm extends Component {
	constructor(props){
	super(props);
	var today = new Date(),	dateNow =  today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	this.state = {
		title: '',
		text: '',
		date: dateNow,
		hashtags: '',
		picture: '',
		redirect: false
		}
	this.onChange = this.onChange.bind(this);
	this.onSubmit = this.onSubmit.bind(this);
	this.renderRedirect = this.renderRedirect.bind(this);
	}
	componentDidMount() {
	    window.scrollTo(0,0);
	}
	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}
	onSubmit(e){
		e.preventDefault();
		if(fetch('https://randomrulesdb.herokuapp.com/randomrulesdb',{
			  method: 'post',
			  headers: {
			    'Accept': 'application/json, text/plain, */*',
			    'Content-Type': 'application/json'
			  },
		     body: JSON.stringify({
		      	title: this.state.title,
				text: this.state.text,
				id: this.state.id,
				date: this.state.date,
				hashtags: this.state.hashtags,
				picture: this.state.picture
		     })
	 	}))
		this.setState({ redirect: true })
	}
	renderRedirect(){
	    if (this.state.redirect) {
	      return <Redirect to='/articles' />
	    }
	}
  render() {
	  return (
	  	<section id="articleform" style={{minHeight: "100vh"}}>	 
			
		  	<div className="container text-right mt-5 mb-5">
		  		{this.renderRedirect()}
		  		<Link to="/articles" className="btn btn-link bg-transparent position-absolute border-0"><i className="fas fa-times-circle fa-3x text-info"></i></Link>
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

export default ArticleForm;