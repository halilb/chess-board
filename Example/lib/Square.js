import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';

export default class Board extends Component {
  static propTypes = {
    size: PropTypes.number.isRequired,
    black: PropTypes.bool.isRequired,
    children: PropTypes.node,
  };

  render() {
    const { black, size, children } = this.props;

    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: black ? '#F0D9B5' : '#B58863',
          width: size,
          height: size,
        }}
      >
        {children}
      </View>
    );
  }
}
