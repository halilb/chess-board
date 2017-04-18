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

  constructor(props) {
    super(props);

    const game = new Chess(props.fen);
    this.state = {
      game,
      board: game.board(),
      highlightRow: -1,
      highlightColumn: -1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextFen = nextProps.fen;
    if (this.props.fen !== nextFen) {
      const game = new Chess(nextFen);
      this.setState({
        game,
        board: game.board(),
      });
    }
  }

  renderSquares() {
    const { size, showNotation } = this.props;
    const { highlightRow, highlightColumn } = this.state;
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
            highlighted={
              rowIndex === highlightRow && columnIndex === highlightColumn
            }
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
              onSelected={() => {
                this.setState({
                  highlightRow: rowIndex,
                  highlightColumn: columnIndex,
                });
              }}
            />
          );
        }
        return null;
      });
    });
  }

  render() {
    const { board } = this.state;

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
