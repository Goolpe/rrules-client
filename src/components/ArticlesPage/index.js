import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/postActions';
import { fetchPlayers } from '../actions/playerActions';
import moment from 'moment';
import { FaPlusCircle, FaNewspaper} from "react-icons/fa";

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
	    	<div className="container pt-5 pb-5 mb-3 bg_card shadow" key={index}>
              <div className="row text-center justify-content-between">
                <div className="col-12 col-lg-8 text-left">
                  <p>{moment(article.date).format('LL')}</p>
                  <h1 className="text-center">{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</h1>
                  <p className="text-justify">{article.text.length > 800 ? article.text.slice(0,800) + "..." : article.text}</p>
                  <Link to={`/article/${article._id}`} className="btn btn-info mt-2">Читать дальше</Link>
                </div>
                <div className="d-none d-lg-block col-lg-4">
                  <img alt={article.title} className="img-fluid" style={{backgroundSize: "contain", height:"400px"}} src={article.picture} />
                </div>
              </div>
            </div>
		);

		const renderPageNumbers = pageNumbers.map(number => {
          return (
          	<PaginationItem key={number} >
  	          <PaginationLink id={number} className="shadow bg_card text-white rounded-0 border-0 mr-2"  onClick={this.handleClick}>
  	            {number}
  	          </PaginationLink>
	        </PaginationItem>
          );
        });

		return (
			<section id="articlesPage">	  
				<div className="container text-left">
					<span className="text-white">
						<FaNewspaper size="1.5em"/> Новости 
					</span>
					{user.moderator && <Link to="/article-new" className="btn btn-link bg-transparent border-0" >
						<FaPlusCircle size="3em" className="text-info" />
					</Link>}
					<ul className="pt-5">{listItems}</ul>
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


