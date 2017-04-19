import { Chess } from 'chess.js';
import { UPDATE_FEN } from './constants';

const game = new Chess();

const initialState = {
  board: game.board(),
};

function chess(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FEN: {
      const newGame = new Chess(action.fen);
      return {
        ...state,
        board: newGame.board(),
      };
    }

    default:
      return state;
  }
}

export default chess;
