import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

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
import MastersPage from './components/MastersPage';
import MasterPage from './components/MastersPage/MasterPage';
import SupportPage from './components/SupportPage';
import TechWorksPage from './components/TechWorksPage';
import AuthPage from './components/AuthPage';
import IdPage from './components/IdPage';

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}

class App extends Component {
  constructor(props){
    	super(props);
	    this.state = {
	      techs: false,
	      isAuthenticated: false
	    }
	    this.authenticate = this.authenticate.bind(this);
	    this.signout = this.signout.bind(this);
    }	

  	authenticate(cb) {
    	this.setState({isAuthenticated: true});
    	setTimeout(cb, 100); // fake async
  	}
  	signout(cb) {
    	this.setState({isAuthenticated: false});
    	setTimeout(cb, 100);
  	}

  render(){  
	const PrivateRoute = ({ component: Component, ...rest }) => (
	  <Route
	    {...rest}
	    render={props =>
	      this.state.isAuthenticated ? (
	        <Component {...props} />
	      ) : (
	        <Redirect
	          to={{
	            pathname: "/auth",
	            state: { from: props.location }
	          }}
	        />
	      )
	    }
	  />
	);
    return (
      <Router >
	      <div>
			 {this.state.techs ? 
			 	<Switch>
				 	<Route path="/" exact={true} component={TechWorksPage} />
				 	<Route path="*" render={() => <Redirect to="/" />} /> 
			 	</Switch>
		      :
		        <div>

		          <Navigation auth={this.state.isAuthenticated} signout={this.signout}/>
		          <Switch>
		            <Route path="/" exact={true} component={HomePage} />
		            <Route path="/about-project" component={AboutPage} />
		            <Route path="/library" component={LibraryPage} />
		            <Route path="/art" component={ArtPage} />
		            <Route path="/articles" component={ArticlesPage} />
		            <Route path="/article/:id" component={ArticlePage} />
		            <Route path="/shop" component={ShopPage} />
		            <Route path="/streams" component={StreamsPage} />
		            <Route path="/masters" component={MastersPage} />
		            <Route path="/master/:id" component={MasterPage} />
		            <Route path="/support" component={SupportPage} />
		            <PrivateRoute path="/new-article" component={ArticleForm} />
			        <PropsRoute path="/auth" component={AuthPage} auth={this.state.isAuthenticated} signout={this.signout} authenticate={this.authenticate}/>
			        <PrivateRoute path="/id/:id" component={IdPage} />
			        <Route path="*" render={() => <Redirect to="/" />} />
			       </Switch>
		          <Footer />
		          
		        </div>
		        }
		        
	      </div>
      </Router>
    );
  }
}

export default App;
