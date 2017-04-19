import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const COLUMN_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export default class Board extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    showNotation: PropTypes.bool,
    rowIndex: PropTypes.number.isRequired,
    columnIndex: PropTypes.number.isRequired,
    dimension: PropTypes.number.isRequired,
    highlighted: PropTypes.bool,
  };

  renderNotations(isBlack) {
    const {
      showNotation,
      rowIndex,
      columnIndex,
      dimension,
    } = this.props;
    const notations = [];

    if (showNotation) {
      if (columnIndex + 1 === dimension) {
        notations.push(
          <Text
            key={'row_notations'}
            style={[
              styles.notation,
              {
                color: isBlack ? '#B58863' : '#F0D9B5',
                top: 0,
                right: 0,
              },
            ]}
          >
            {dimension - rowIndex}
          </Text>
        );
      }

      if (rowIndex + 1 === dimension) {
        notations.push(
          <Text
            key={'column_notation'}
            style={[
              styles.notation,
              {
                color: isBlack ? '#B58863' : '#F0D9B5',
                bottom: 0,
                left: 0,
              },
            ]}
          >
            {COLUMN_NAMES[columnIndex]}
          </Text>
        );
      }
    }

    return notations;
  }

  render() {
    const { size, rowIndex, columnIndex, highlighted } = this.props;
    const isBlack = (rowIndex + columnIndex) % 2 === 0;
    let backgroundColor = isBlack ? '#F0D9B5' : '#B58863';

    if (highlighted) {
      backgroundColor = '#656E41';
    }

    return (
      <View
        style={{
          backgroundColor,
          width: size,
          height: size,
        }}
      >
        {this.renderNotations(isBlack)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notation: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
