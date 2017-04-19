import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Chess } from 'chess.js';

import ChessBoard from '../lib';

export default class RandomVsRandom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Chess(),
    };
  }

  componentDidMount() {
    setTimeout(this.makeRandomMove, 500);
  }

  makeRandomMove = () => {
    const { game } = this.state;
    const possibleMoves = game.moves();

    // exit if the game is over
    if (
      game.game_over() === true ||
      game.in_draw() === true ||
      possibleMoves.length === 0
    ) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    game.move(possibleMoves[randomIndex]);
    this.setState({
      fen: game.fen(),
    });

    setTimeout(this.makeRandomMove, 500);
  };

  render() {
    const { fen } = this.state;

    return (
      <View style={styles.container}>
        <ChessBoard fen={fen} size={340} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#EEEEEE',
  },
});
