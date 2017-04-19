import { Chess } from 'chess.js';
import { UPDATE_FEN, SELECT_PIECE } from './constants';

const DIMENSION = 8;
const COLUMN_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const initialGame = new Chess();
const initialState = {
  game: initialGame,
  board: createBoard(initialGame),
};

function createBoard(game) {
  const board = game.board();
  const squares = [];

  board.forEach((row, rowIndex) => {
    row.forEach((square, columnIndex) => {
      const columnName = COLUMN_NAMES[columnIndex];

      squares.push({
        ...square,
        name: `${columnName}${DIMENSION - rowIndex}`,
        columnName,
        rowIndex,
        columnIndex,
        selected: false,
        canMoveHere: false,
        lastMove: false,
      });
    });
  });

  return squares;
}

function chess(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FEN: {
      state.game.load(action.fen);
      return {
        ...state,
        board: createBoard(state.game),
      };
    }

    case SELECT_PIECE: {
      const index = action.row * DIMENSION + action.column;
      const piece = state.board[index];
      const possibleMoves = state.game.moves({ square: piece.name });

      const newBoard = state.board.map(square => {
        // unselect everything
        if (piece.selected) {
          return {
            ...square,
            selected: false,
            canMoveHere: false,
          };
        }

        const isSelected = square.rowIndex === action.row &&
          square.columnIndex === action.column;
        const canMoveHere = possibleMoves.indexOf(square.name) > -1;

        return {
          ...square,
          selected: isSelected,
          canMoveHere,
        };
      });

      return {
        ...state,
        board: newBoard,
      };
    }

    default:
      return state;
  }
}

export default chess;
