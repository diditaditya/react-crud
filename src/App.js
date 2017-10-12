import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from './store/configureStore';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2>Up and Running</h2>
      </div>
    );
  }
}

const AppWithProvider = () => {
  return (
    <Provider store={store} >
      <App />
    </Provider>
  );
}


export default AppWithProvider;
