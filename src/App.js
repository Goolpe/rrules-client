import React, { Component } from 'react';
import { Provider } from 'react-redux';

import jwt_decode from 'jwt-decode';
import setAuthToken from './components/setAuthToken';
import { setCurrentUser, logoutUser } from './components/actions/authActions';
import store from './components/store';
import RoutesPage from './RoutesPage';

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

class App extends Component {
  render(){  
    return (
    	<Provider store={store}>
	      <RoutesPage />
	    </Provider>
    );
  }
}

export default App;
