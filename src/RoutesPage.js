import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import HomePage from './components/HomePage';
import Navigation from './components/Navigation';
import error404Page from './components/error404Page';
import AboutPage from './components/AboutPage';
import LibraryPage from './components/LibraryPage';
import ArtPage from './components/ArtPage';
import ArticlesPage from './components/ArticlesPage';
import ArticlePage from './components/ArticlesPage/ArticlePage';
import ArticleForm from './components/ArticlesPage/ArticleForm';
import ShopPage from './components/ShopPage';

import MastersPage from './components/UsersPage/MastersPage';
import UserPage from './components/UsersPage/UserPage';
import UserPageEditor from './components/UsersPage/UserPageEditor';
import MessagesPage from './components/MessagesPage';

import AgreementPage from './components/AgreementPage';
import SupportPage from './components/SupportPage';
import TechWorksPage from './components/TechWorksPage';
import AuthPage from './components/AuthPage';
import SocialAuth from './components/AuthPage/SocialAuth';
import GamesPage from './components/GamesPage';
import CreateGamePage from './components/GamesPage/CreateGamePage';
import GamePage from './components/GamesPage/GamePage';
import GameEditPage from './components/GamesPage/GameEditPage';
import EmailVerif from './components/AuthPage/EmailVerif';

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

    return (
	      <Router>
		      <div>
				 {this.state.techs ? 
				 	<Switch>
					 	<Route path="/" exact={true} component={TechWorksPage} />
					 	<Route path="*" render={() => <Redirect to="/" />} /> 
				 	</Switch>
			      :
					<React.Fragment>	
						<Navigation/>
				        <Switch>
			            <Route path="/" exact={true} component={HomePage} />
			            <Route path="/about-project" component={AboutPage} />
			            <Route path="/library" component={LibraryPage} />
			            <Route path="/art" component={ArtPage} />
			            <Route path="/articles" component={ArticlesPage} />
			            <Route path="/article/:id" component={ArticlePage} />
			            <Route path="/shop" component={ShopPage} />
			            <Route path="/masters" component={MastersPage} />
			            <Route path="/support" component={SupportPage} />   
			            <Route path="/agreement" component={AgreementPage} />
			            <Route path="/games" component={GamesPage} />   
			            <Route path="/game/:id" component={GamePage} /> 
			            <Route path="/@:nickname" component={UserPage} />
			            <Route path="/msgs" component={MessagesPage} />
					        <Route path="/auth" component={AuthPage} />
					        <Route path="/social-auth/:id" component={SocialAuth} />
					        <Route path="/email-verification" component={EmailVerif} />
					        <Route path="/article-new" component={ArticleForm} />
					        <Route path="/edit/:nickname" component={UserPageEditor} />
					        <Route path="/game-create" component={CreateGamePage} />
					        <Route path="/game-edit/:id" component={GameEditPage} />
					        <Route path="*" component={error404Page} />
					    </Switch>
				    </React.Fragment>	
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
