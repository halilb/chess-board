import * as types from './constants';

export const updateFen = fen => ({ type: types.UPDATE_FEN, fen });
export const selectPiece = (row, column) => ({
  type: types.SELECT_PIECE,
  row,
  column,
});
