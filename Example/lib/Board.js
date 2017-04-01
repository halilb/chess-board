import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import { Chess } from 'chess.js';

import Square from './Square';
import Piece from './Piece';

const DIMENSION = 8;

export default class Board extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    fen: PropTypes.string,
    showNotation: PropTypes.bool,
  };

  static defaultProps = {
    showNotation: true,
  };

  renderSquares() {
    const { size, showNotation } = this.props;
    const squareSize = size / DIMENSION;
    const rows = [];

    for (let rowIndex = 0; rowIndex < DIMENSION; rowIndex++) {
      const squares = [];

      for (let squareIndex = 0; squareIndex < DIMENSION; squareIndex++) {
        const square = (
          <Square
            key={`square_${rowIndex}_${squareIndex}`}
            size={squareSize}
            showNotation={showNotation}
            rowIndex={rowIndex}
            squareIndex={squareIndex}
            dimension={DIMENSION}
          />
        );
        squares.push(square);
      }

      rows.push(
        <View key={`row_${rowIndex}`} style={styles.row}>
          {squares}
        </View>
      );
    }

    return rows;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSquares()}
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
