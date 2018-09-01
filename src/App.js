import React, { Component } from 'react';
import { Provider } from 'react-redux';
import RoutesPage from './RoutesPage';
import store from './components/store';



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
