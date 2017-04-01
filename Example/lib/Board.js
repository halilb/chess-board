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

      for (let columnIndex = 0; columnIndex < DIMENSION; columnIndex++) {
        const square = (
          <Square
            key={`square_${rowIndex}_${columnIndex}`}
            size={squareSize}
            showNotation={showNotation}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
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

  renderPieces(board) {
    return board.map((row, rowIndex) => {
      return row.map((piece, columnIndex) => {
        if (piece) {
          return (
            <Piece
              type={piece.type}
              color={piece.color}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              pieceSize={this.props.size / DIMENSION}
            />
          );
        }
        return null;
      });
    });
  }

  render() {
    const { fen } = this.props;
    const game = new Chess(fen);
    const board = game.board();

    return (
      <View style={styles.container}>
        {this.renderSquares()}
        {this.renderPieces(board)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
});
