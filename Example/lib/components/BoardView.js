import React, { Component, PropTypes } from 'react';
import { View, StyleSheet } from 'react-native';

import Square from './Square';
import Piece from './Piece';

const DIMENSION = 8;

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
    const { actions, board, size, showNotation } = this.props;
    const squareSize = size / DIMENSION;
    const rowSquares = [];

    board.forEach(square => {
      const {
        rowIndex,
        columnIndex,
        columnName,
        position,
        selected,
        canMoveHere,
        lastMove,
      } = square;

      const squareView = (
        <Square
          key={`square_${rowIndex}_${columnIndex}`}
          size={squareSize}
          showNotation={showNotation}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          columnName={columnName}
          position={position}
          dimension={DIMENSION}
          selected={selected}
          canMoveHere={canMoveHere}
          lastMove={lastMove}
          onSelected={actions.movePiece}
        />
      );

      if (!rowSquares[rowIndex]) {
        rowSquares[rowIndex] = [];
      }
      rowSquares[rowIndex].push(squareView);
    });

    return rowSquares.map((r, index) => {
      return (
        <View key={`row_${index}`} style={styles.row}>
          {r}
        </View>
      );
    });
  }

  renderPieces() {
    const { actions, size, board } = this.props;

    return board.map(square => {
      const { type, color, rowIndex, columnIndex } = square;
      if (type) {
        return (
          <Piece
            key={`piece_${rowIndex}_${columnIndex}`}
            type={type}
            color={color}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            pieceSize={size / DIMENSION}
            onSelected={actions.selectPiece}
          />
        );
      }
      return null;
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
