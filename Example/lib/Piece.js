import React, { Component, PropTypes } from 'react';
import { TouchableWithoutFeedback, Image } from 'react-native';

const PIECE_IMAGES = {
  b: {
    w: require('../images/pieces/wB.png'),
    b: require('../images/pieces/bB.png'),
  },
  k: {
    w: require('../images/pieces/wK.png'),
    b: require('../images/pieces/bK.png'),
  },
  n: {
    w: require('../images/pieces/wN.png'),
    b: require('../images/pieces/bN.png'),
  },
  p: {
    w: require('../images/pieces/wP.png'),
    b: require('../images/pieces/bP.png'),
  },
  q: {
    w: require('../images/pieces/wQ.png'),
    b: require('../images/pieces/bQ.png'),
  },
  r: {
    w: require('../images/pieces/wR.png'),
    b: require('../images/pieces/bR.png'),
  },
};

export default class Piece extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    rowIndex: PropTypes.number.isRequired,
    columnIndex: PropTypes.number.isRequired,
    pieceSize: PropTypes.number.isRequired,
    reverseBoard: PropTypes.bool,
    onSelected: PropTypes.func.isRequired,
  };

  onSelected = () => {
    const { position, onSelected } = this.props;
    onSelected(position);
  };

  render() {
    const {
      type,
      color,
      rowIndex,
      columnIndex,
      pieceSize,
      reverseBoard,
    } = this.props;
    const pieceImageSource = PIECE_IMAGES[type][color];

    return (
      <TouchableWithoutFeedback onPress={this.onSelected}>
        <Image
          style={{
            position: 'absolute',
            top: pieceSize * rowIndex,
            left: pieceSize * columnIndex,
            width: pieceSize,
            height: pieceSize,
            transform: [
              {
                rotate: reverseBoard ? '180deg' : '0deg',
              },
            ],
          }}
          source={pieceImageSource}
        />
      </TouchableWithoutFeedback>
    );
  }
}
