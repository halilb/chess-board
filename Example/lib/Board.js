import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { Chess } from 'chess.js';

import Square from './Square';

export default class Board extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    fen: PropTypes.string,
  };

  renderRow = (row, rowIndex) => {
    const { size } = this.props;
    const pieceSize = size / 8;
    const pieces = row.map((piece, pieceIndex) => (
      <Square
        key={`square_${pieceIndex}`}
        size={pieceSize}
        black={(rowIndex + pieceIndex) % 2 === 0}
      >
        <Text>{`${rowIndex}-${pieceIndex}`}</Text>
      </Square>
    ));

    return (
      <View key={`row_${rowIndex}`} style={styles.row}>
        {pieces}
      </View>
    );
  };

  render() {
    const { fen } = this.props;
    const game = new Chess(fen);
    const board = game.board();

    return (
      <View style={styles.container}>
        {board.map(this.renderRow)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
});
