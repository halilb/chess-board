import { Chess } from 'chess.js';
import { UPDATE_FEN, SELECT_PIECE, MOVE_PIECE } from './constants';

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
  const history = game.history({ verbose: true });
  const lastMove = history[history.length - 1] || {};
  const inCheck = game.in_check();
  const turn = game.turn();

  board.forEach((row, rowIndex) => {
    row.forEach((square, columnIndex) => {
      const columnName = COLUMN_NAMES[columnIndex];
      const position = `${columnName}${DIMENSION - rowIndex}`;
      const type = square ? square.type : '';
      const color = square ? square.color : '';

      squares.push({
        ...square,
        position,
        columnName,
        rowIndex,
        columnIndex,
        selected: false,
        canMoveHere: false,
        lastMove: position === lastMove.to || position === lastMove.from,
        inCheck: inCheck && turn === color && type === game.KING,
      });
    });
  });

  return squares;
}

function selectPiece(state, action) {
  const { board, game } = state;
  const index = action.row * DIMENSION + action.column;
  const piece = board[index];

  // remove the piece
  if (piece.canMoveHere) {
    return movePiece(state, action);
  }

  // do not select if it's not your turn
  if (game.turn() !== piece.color) {
    return state;
  }

  const possibleMoves = game
    .moves({
      square: piece.position,
      verbose: true,
    })
    .map(item => item.to);

  const newBoard = board.map(square => {
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
    const canMoveHere = possibleMoves.indexOf(square.position) > -1;

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

function movePiece(state, action) {
  const selectedPiece = state.board.find(item => item.selected);
  state.game.move({
    from: selectedPiece.position,
    to: action.position,
  });

  return {
    ...state,
    board: createBoard(state.game),
  };
}

function ChessReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FEN: {
      state.game.load(action.fen);
      return {
        ...state,
        board: createBoard(state.game),
      };
    }

    case SELECT_PIECE:
      return selectPiece(state, action);

    case MOVE_PIECE:
      return movePiece(state, action);

    default:
      return state;
  }
}

export default ChessReducer;
