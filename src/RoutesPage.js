import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import ArrowUp from './components/ArrowUp';
import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import LibraryPage from './components/LibraryPage';
import ArtPage from './components/ArtPage';
import ArticlesPage from './components/ArticlesPage';
import ArticlePage from './components/ArticlesPage/ArticlePage';
import ArticleForm from './components/ArticlesPage/ArticleForm';
import ShopPage from './components/ShopPage';
import StreamsPage from './components/StreamsPage';

import MastersPage from './components/UsersPage/MastersPage';
import UsersPage from './components/UsersPage';
import UserPage from './components/UsersPage/UserPage';
import UserPageEditor from './components/UsersPage/UserPageEditor';

import AgreementPage from './components/AgreementPage';
import SupportPage from './components/SupportPage';
import TechWorksPage from './components/TechWorksPage';
import AuthPage from './components/AuthPage';
import GamesPage from './components/GamesPage';
import CreateGamePage from './components/GamesPage/CreateGamePage';
import GamePage from './components/GamesPage/GamePage';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';

import setAuthToken from './components/setAuthToken';
import { setCurrentUser, logoutUser } from './components/actions/authActions';

import store from './components/store';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser(this.history));
    window.location.href = '/auth'
  }
}

class RoutesPage extends Component {
  	constructor(props){
    	super(props);
	    this.state = {
	      techs: false
	    }
    }	

  render(){  
  	const {isAuthenticated, user} = this.props.auth;

	const PrivateRoute = ({ component: Component, ...rest }) => (
	  <Route {...rest} render={props => 
	      isAuthenticated ? (
	        <Component {...props} />
	      ) : (	<Redirect to={{	pathname: "/auth", state: { from: props.location }}}/> )
	    }
	  />
	);
    return (
	      <Router>
		      <div>
				 {this.state.techs ? 
				 	<Switch>
					 	<Route path="/" exact={true} component={TechWorksPage} />
					 	<Route path="*" render={() => <Redirect to="/" />} /> 
				 	</Switch>
			      :
			        <div>
					<Navigation/>
			          <Switch>
			            <Route path="/" exact={true} component={HomePage} />
			            <Route path="/about-project" component={AboutPage} />
			            <Route path="/library" component={LibraryPage} />
			            <Route path="/art" component={ArtPage} />
			            <Route path="/articles" component={ArticlesPage} />
			            <Route path="/article/:id" component={ArticlePage} />
			            <Route path="/shop" component={ShopPage} />
			            <Route path="/streams" component={StreamsPage} />
			            <Route path="/users" component={UsersPage} />
			            <Route path="/masters" component={MastersPage} />
			            <Route path="/support" component={SupportPage} />   
			            <Route path="/agreement" component={AgreementPage} />
			            <Route path="/games" component={GamesPage} />    
			            <Route path="/game/:id" component={GamePage} /> 
			            <Route path="/@:nickname" component={UserPage} />
				        <Route path="/auth" component={AuthPage} />
				        <PrivateRoute path="/new-article" component={ArticleForm} />
				        <PrivateRoute path="/edit/:nickname" component={UserPageEditor} />
				        <PrivateRoute path="/create-game" component={CreateGamePage} />
				        <Route path="*" render={() => <Redirect to="/" />} />
				       </Switch>
			        <Footer />
			        <ArrowUp />
			        </div>
			        }
			        
		      </div>
	      </Router>
    );
  }
}

RoutesPage.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {})(RoutesPage);
