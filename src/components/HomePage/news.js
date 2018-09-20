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

class News extends Component {
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

	  	const listItems = articleSort.map((article, index) =>
		    	<Link to={`/article/${article._id}`} className="m-0 p-0 mb-4 btn text-left w-100" key={article._id}>
		    		<div className="shadow news_card">
		    			<div className="position-relative" style={{height: "150px", overflow: "hidden"}}><img src={article.picture} alt="" />
		    				<div className="position-absolute news_card__wrapper" ></div>
		    				<div className="position-absolute bg-white text-dark p-2" style={{bottom:"5px", left: "5px"}}>{moment(article.date).format('ll').slice(0,moment.length-9)}</div>
		    			</div>
				  		<p className="text-center text-white p-3">{article.title}</p>
				  	</div>
				</Link>
		).slice(0,3);
	return (
		<React.Fragment>
			{listItems}
		</React.Fragment>
	)
	}
}

News.propTypes = {
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


export default connect(mapStateToProps, { fetchArticles, fetchPlayers })(News);

