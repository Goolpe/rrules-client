import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';
import { fetchPlayers } from '../actions/playerActions';
import moment from 'moment';
import { FaPlusCircle } from "react-icons/fa";

class ArticlesPage extends Component {
	constructor(props){
    	super(props);
    	this.state = {
    		currentPage: 1,
          	todosPerPage: 4
    	}
    	this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		window.scrollTo(0,0);
	}
	componentWillMount() {
	    this.props.fetchArticles();
	    this.props.fetchPlayers();
	  }
	handleClick(event) {
		this.setState({
		  currentPage: Number(event.target.id)
		});
		window.scrollTo(0,0);
	}
	render() {	
		const {user} = this.props.auth;	

		let articleSort = _.sortBy(this.props.articles, ['date']).reverse();

		const {currentPage, todosPerPage } = this.state;

        // Logic for displaying page numbers
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = articleSort.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(articleSort.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

	  	const listItems = currentTodos.map((article, index) =>
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
			    		<div className="col-12 col-md-6 text-muted mb-2">{moment(article.date).format('LL')}</div>
			    		<div className="col-12 col-md-6 text-right">{article.hashtags}</div>
			    	</div>
			  	</div>	
			</div>
		);

		const renderPageNumbers = pageNumbers.map(number => {
          return (
          	<PaginationItem key={number} >
  	          <PaginationLink id={number} className="shadow-sm text-dark rounded-0 border-0"  onClick={this.handleClick}>
  	            {number}
  	          </PaginationLink>
	        </PaginationItem>
          );
        });

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
							{user.moderator && <Link to="/article-new" className="btn btn-link bg-transparent border-0" >
								<FaPlusCircle size="3em" className="text-info" />
							</Link>}
						</div>
					</div>
					<ul>{listItems}</ul>
					<Pagination aria-label="Page navigation">
      			    	{renderPageNumbers}
      		    	</Pagination>				
				</div>
			</section>
		)
	}
}

ArticlesPage.propTypes = {
	fetchPlayers: PropTypes.func.isRequired,
  	players: PropTypes.array.isRequired,
  	fetchArticles: PropTypes.func.isRequired,
  	articles: PropTypes.array.isRequired,
  	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	players: state.players.items,
	articles: state.articles.items,
	auth: state.auth
})

export default connect(mapStateToProps, { fetchArticles, fetchPlayers })(ArticlesPage);


