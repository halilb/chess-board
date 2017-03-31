import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Chess } from 'chess.js';

import Board from './lib/Board';

export default class ChessBoardExample extends Component {
  constructor(props) {
    super(props);

    const game = new Chess();

    this.state = {
      fen: game.fen(),
    };
  }

  render() {
    const { fen } = this.state;

    return (
      <View style={styles.container}>
        <Board fen={fen} size={360} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#EEEEEE',
  },
});
