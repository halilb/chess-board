import React, { Component, PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import ChessReducer from './state/reducer';
import BoardViewContainer from './components/BoardViewContainer';
import { updateFen } from './state/actions';

const store = createStore(ChessReducer);
console.disableYellowBox = true;

export default class App extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    fen: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    const nextFen = nextProps.fen;
    if (this.props.fen !== nextFen) {
      store.dispatch(updateFen(nextFen));
    }
  }

  render() {
    return (
      <Provider store={store}>
        <BoardViewContainer size={this.props.size} />
      </Provider>
    );
  }
}
