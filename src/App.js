import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import TopNav from './components/TopNav';

import Routing from './routing/Routes';

import store from './store/configureStore';

// import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopNav />
          <Routing />
        </div>
      </BrowserRouter>
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
