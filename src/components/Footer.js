import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import _ from "lodash";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {fetchPersons} from './actions/personActions';
import {fetchArticles} from './actions/newsActions';

class Footer extends Component{
  componentDidMount() {
    window.scrollTo(0,0);
    this.props.fetchArticles();
    this.props.fetchPersons();
  }
  render(){	
    let articleSort = _.sortBy(this.props.articles, ['date']).reverse();
    let mastersSort = _.sortBy(this.props.persons && this.props.persons.filter(person => person.status === "мастер"
        ), ['rating']).reverse();

    const listItems = articleSort.map((article, index)=>
      <li key={index} className="mt-1 mb-1"><Link className="text-white" to={`/article/${article._id}`}>{article.title.length > 25 ? (article.title.slice(0,25) + "...") : article.title}</Link></li>
    ).slice(0,7);
      const mastersRating = mastersSort.map((master, index) =>
      <Link  key={index} to={`/@${master.name}`} className="text-white"><li><i className="fas fa-star text-warning fa-1x"></i> {master.rating}/5  - {master.name}</li></Link>
    ).slice(0,8)
    return (
      <footer className="pb-5 pt-5" style={{backgroundColor: "#181818"}}>
        <div className="container">
          <div className="row">
            <nav className="col-12 col-md-4 mt-3">
              <h6>НАВИГАЦИЯ</h6>
              <hr width="70%" align="left" color="#a9a9a9"/>
              <ul>
                <li><Link to="/" className="text-white">Главная</Link></li>
                <li><Link to="/about-project" className="text-white">О проекте</Link></li>
                <li><Link to="/library" className="text-white">Библиотека</Link></li>
                <li><Link to="/masters" className="text-white">Мастера канала</Link></li>
                <li><Link to="/art" className="text-white">Фан-арт</Link></li>
                <li><Link to="/streams" className="text-white">Стримы</Link></li>
                <li><Link to="/articles" className="text-white">Новости</Link></li>
                <li><Link to="/shop" className="text-white">Магазин</Link></li>
                <li><Link to="/games" className="text-white">Найти игру</Link></li>
              </ul>
            </nav>
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

          <hr color="#a9a9a9"/>
          <div className="row"> 
            <div className="col-12 col-md-8">
              <p className="text-white">&copy; Copyright 2018 | Random Rules | <a className=" text-white" href="https://github.com/Goolpe" rel="noopener noreferrer" target="_blank">Разработал Goolpe</a></p>
            </div>
            <div className="col-12 col-md-4 text-center">
              <Link to="/support" className="btn btn-danger pl-3 pr-3">ПОДДЕРЖАТЬ ПРОЕКТ</Link>
            </div>
          </div>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  fetchArticles: PropTypes.func,
  fetchPersons: PropTypes.func,
  articles: PropTypes.array,
  persons: PropTypes.array

};

const mapStateToProps = state => ({
  articles: state.articles.items,
  persons: state.persons.items
})

export default connect(mapStateToProps, {fetchPersons, fetchArticles})(Footer);



