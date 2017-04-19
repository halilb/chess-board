import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ChessReducer from './state/reducer';
import BoardViewContainer from './components/BoardViewContainer';

const store = createStore(ChessReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BoardViewContainer size={this.props.size} />
      </Provider>
    );
  }
}
