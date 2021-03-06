import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import RoutesPage from './RoutesPage';
import store from './components/store';

class App extends Component {
  render() {
    const theme = {
      bg_card: {
        background: '#3b3c40',
      },
    };
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RoutesPage />
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
