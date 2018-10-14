import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/newsActions';
import moment from 'moment';
import { FaPlus, FaNewspaper} from "react-icons/fa";
import '../../styles/articles.css';

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
		this.props.fetchArticles();
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
	  	<div className="container mb-3 p-0 text_card shadow article__background" style={{backgroundImage: `url(${article.bgImage}`}} key={index}>
        <div className="text-left article__wrapper p-3">
          <p className="text-right">{moment(article.date).format('LL')}</p>
          <h1>{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</h1>
          <hr color="#fff" width="50%" align="left"/>
          <p className="text-justify">{article.text.length > 800 ? article.text.slice(0,800) + "..." : article.text}</p>
          <Link to={`/article/${article._id}`} className="btn btn-outline-light mt-2">Читать дальше</Link>
        </div>
      </div>
		);

		const renderPageNumbers = pageNumbers.map(number => {
      return (
      	<PaginationItem key={number} >
      	{pageNumbers.length > 1 && 
          <PaginationLink id={number} className="shadow bg_card text_card rounded-0 border-0 mr-2"  onClick={this.handleClick}>
            {number}
          </PaginationLink>
        }
      	</PaginationItem>
      );
    });

		return (
			<main>	  
				<section className="container text-left">
					<h1 className="text_card">
						<FaNewspaper size="1.5em"/> Новости
						{user.moderator && 
							<Link to="/article-new" className="ml-2" >
								 | <FaPlus  />
							</Link>
						}
					</h1>
					<section>
						{listItems}
					</section>
					<Pagination aria-label="Page navigation">
      			{renderPageNumbers}
      		</Pagination>				
				</section>
			</main>
		)
	}
}

ArticlesPage.propTypes = {
	fetchArticles: PropTypes.func,
	articles: PropTypes.array,
	auth: PropTypes.object
};

const mapStateToProps = state => ({
	articles: state.articles.items,
	auth: state.auth
})

export default connect(mapStateToProps, { fetchArticles })(ArticlesPage);


