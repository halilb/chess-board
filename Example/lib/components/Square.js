import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Board extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    showNotation: PropTypes.bool,
    rowIndex: PropTypes.number.isRequired,
    columnName: PropTypes.string.isRequired,
    columnIndex: PropTypes.number.isRequired,
    dimension: PropTypes.number.isRequired,
    selected: PropTypes.bool,
    canMoveHere: PropTypes.bool,
    lastMove: PropTypes.bool,
  };

  renderNotations(isBlack) {
    const {
      showNotation,
      rowIndex,
      columnIndex,
      columnName,
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
          </Text>,
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
            {columnName}
          </Text>,
        );
      }
    }

    return notations;
  }

  renderMoveIndicator() {
    const { canMoveHere } = this.props;

    if (canMoveHere) {
      return <View style={styles.moveIndicator} />;
    }
    return null;
  }

  render() {
    const {
      size,
      rowIndex,
      columnIndex,
      selected,
      lastMove,
    } = this.props;
    const isBlack = (rowIndex + columnIndex) % 2 === 0;
    let backgroundColor = isBlack ? '#F0D9B5' : '#B58863';

    if (selected) {
      backgroundColor = '#656E41';
    } else if (lastMove) {
      backgroundColor = '#CDD26B';
    }

    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor,
            width: size,
            height: size,
          },
        ]}
      >
        {this.renderMoveIndicator()}
        {this.renderNotations(isBlack)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  notation: {
    position: 'absolute',
    fontSize: 11,
    fontWeight: 'bold',
  },
  moveIndicator: {
    width: 12,
    height: 12,
    opacity: 0.3,
    backgroundColor: '#208530',
    borderRadius: 6,
  },
});
