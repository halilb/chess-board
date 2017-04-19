import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import Square from './Square';
import Piece from './Piece';

export default class BoardView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
    board: PropTypes.array.isRequired,
    showNotation: PropTypes.bool,
  };

  static defaultProps = {
    showNotation: true,
  };

  renderSquares() {
    const { board, size, showNotation } = this.props;
    const dimension = board.length;
    const squareSize = size / dimension;
    const rows = [];

    for (let rowIndex = 0; rowIndex < dimension; rowIndex++) {
      const squares = [];

      for (let columnIndex = 0; columnIndex < dimension; columnIndex++) {
        const square = (
          <Square
            key={`square_${rowIndex}_${columnIndex}`}
            size={squareSize}
            showNotation={showNotation}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            dimension={dimension}
          />
        );
        squares.push(square);
      }

      rows.push(
        <View key={`row_${rowIndex}`} style={styles.row}>
          {squares}
        </View>,
      );
    }

    return rows;
  }

  renderPieces() {
    const { size, board } = this.props;
    const dimension = board.length;
    return board.map((row, rowIndex) => {
      return row.map((piece, columnIndex) => {
        if (piece) {
          return (
            <Piece
              type={piece.type}
              color={piece.color}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              pieceSize={size / dimension}
            />
          );
        }
        return null;
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderSquares()}
        {this.renderPieces()}
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
