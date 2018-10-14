import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createArticle } from '../actions/newsActions';
import { FaAngleLeft } from "react-icons/fa";

class ArticleForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: '',
			text: '',
			hashtags: '',
			picture: '',
			status: false
			}
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentDidMount() {
    window.scrollTo(0,0);
    if(this.props.auth.isAuthenticated && (this.props.auth.user.name === "moderator" || this.props.auth.user.name === "admin")){
    	this.props.history.push("/article-new")
    }
    else{
    	this.props.history.push("/")
    }
	}
	onChange(e){
		this.setState({ [e.target.name]: e.target.value})
	}
	onSubmit(e){
		e.preventDefault();
		const article = {
		  title: this.state.title,
			text: this.state.text,
			hashtags: this.state.hashtags,
			picture: this.state.picture
		}
		this.props.createArticle(article);
		this.setState({
			title: '',
			text: '',
			hashtags: '',
			picture: ''
		})
	}
  render() {
	  return (
	  	<main>	
	  		<section className="container text_card"> 
					<Link to="/articles">
						<FaAngleLeft size="1.5em"/> Выйти
					</Link>	
	    		<form onSubmit={this.onSubmit} className="pt-5">
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
        </section>
    	</main>
	  )
	}
}

ArticleForm.propTypes = {
  createArticle: PropTypes.func,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { createArticle })(withRouter(ArticleForm));