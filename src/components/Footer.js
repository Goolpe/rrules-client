import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles } from './actions/postActions';
import { fetchPlayers } from './actions/playerActions';

class Footer extends Component {
	componentWillMount() {
	    this.props.fetchArticles();
        this.props.fetchPlayers();
	  }
  	render() {
	  	let articleSort = _.sortBy(this.props.articles, ['date']).reverse();
        let mastersSort = _.sortBy(this.props.players.filter(master =>  master.master === true
            ), ['rating']).reverse();

	  	const listItems = articleSort.map((article, index)=>
	  		<li key={article._id} className="mt-1 mb-1"><Link to={`/article/${article._id}`}>{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</Link></li>
	  	).slice(0,7);
        const mastersRating = mastersSort.map(master =>
                    <Link  key={master._id} to={`/@${master.username}`}><li><i className="fas fa-star text-warning fa-1x"></i> - {master.rating}  - {master.username}</li></Link>
            ).slice(0,8)
    return (
    	<footer>
    		<div className="container pt-5 pb-2 text-left text-white">
    			<div className="row">
    				<div className="col-12 col-md-4 mt-3">
    					<h6>НАВИГАЦИЯ</h6>
    					<hr width="70%" align="left" color="#a9a9a9"/>
    					<ul>
    						<li><Link to="/" >Главная</Link></li>
    						<li><Link to="/about-project">О проекте</Link></li>
    						<li><Link to="/library">Библиотека</Link></li>
    						<li><Link to="/masters">Мастера канала</Link></li>
    						<li><Link to="/art">Фан-арт</Link></li>
    						<li><Link to="/streams">Стримы</Link></li>
    						<li><Link to="/articles">Новости</Link></li>
    						<li><Link to="/shop">Магазин</Link></li>
                            <li><Link to="/games">Найти игру</Link></li>
    					</ul>
    				</div>
    				<div className="col-12 col-md-4 mt-3">
    					<h6>РЕЙТИНГ МАСТЕРОВ</h6>
    					<hr width="70%" align="left" color="#a9a9a9"/>
    					<ul>
    						{mastersRating}
    					</ul>
    				</div>
    				<div className="col-12 col-md-4 mt-3">
    					<h6>ПОСЛЕДНИЕ НОВОСТИ</h6>
    					<hr width="70%" align="left" color="#a9a9a9"/>
    					<ul>
    						{listItems}
    					</ul>
    				</div>
    				
    			</div>

    		</div>
    		<hr color="#a9a9a9"/>
    		<div className="container pb-5 pt-3">
    			<div className="row"> 
    				<div className="col-12 col-md-8">
						<p className="text-white">&copy; Copyright 2018 | Random Rules | <a href="https://github.com/Goolpe" target="_blank">Разработал Goolpe</a></p>
					</div>
					<div className="col-12 col-md-4 text-center">
						<Link to="/support" className="btn btn-danger pl-3 pr-3">ПОДДЕРЖАТЬ ПРОЕКТ</Link>
					</div>
				</div>
			</div>
    	</footer>
    );
}
}

Footer.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired

};

const mapStateToProps = state => ({
	articles: state.articles.items,
    players: state.players.items
})

export default connect(mapStateToProps, { fetchArticles, fetchPlayers })(Footer);
