import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { Chess } from 'chess.js';

import ChessBoard from '../lib';

const HTTP_BASE_URL = 'https://en.lichess.org';
const SOCKET_BASE_URL = 'wss://socket.lichess.org';

export default class PlayerVsPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: new Chess(),
    };
  }

  componentDidMount() {
    // get lila token
    fetch(`${HTTP_BASE_URL}/account/info`).then(() => {
      this.clientId = Math.random().toString(36).substring(2);
      this.createGame();
    });
  }

  createGame() {
    fetch(`${HTTP_BASE_URL}/setup/friend`, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.lichess.v2+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        variant: '1',
        timeMode: '1',
        days: '2',
        time: '10',
        increment: '0',
        color: 'white',
        mode: '0',
      }),
    })
      .then(res => res.json())
      .then(res => {
        const socketId = res.challenge.id;
        const socketUrl = `${SOCKET_BASE_URL}/challenge/${socketId}/socket/v2?sri=${this.clientId}&mobile=1`;
        this.createSocket(socketUrl, socketId);
      });
  }

  createSocket = (socketUrl, socketId) => {
    console.log('socket: ' + socketUrl);
    this.ws = new WebSocket(socketUrl);

    this.ws.onmessage = e => {
      // a message was received
      console.log(`received: ${e.data}`);
      const data = JSON.parse(e.data);

      if (data.t === 'reload' && data.v === 3 && !this.gameFetched) {
        this.gameFetched = true;

        // this sets cookie
        fetch(`${HTTP_BASE_URL}/challenge/${socketId}`).then(() => {
          fetch(`${HTTP_BASE_URL}/${socketId}`, {
            headers: {
              Accept: 'application/vnd.lichess.v2+json',
              'Content-Type': 'application/json',
            },
          })
            .then(res => res.json())
            .then(res => {
              if (res.url && res.url.socket) {
                const socketUrl = `${SOCKET_BASE_URL}${res.url.socket}?sri=${this.clientId}&mobile=1`;
                clearInterval(this.intervalId);
                this.createSocket(socketUrl);
              }
            });
        });
      }

      let uci;
      if (data.t === 'move' && data.d.ply % 2 === 0) {
        uci = data.d.uci;
      } else if (data.t === 'b') {
        const first = data.d[0];
        if (first && first.d.status && first.d.status.name === 'mate') {
          uci = first.d.uci;
        }
      }

      if (uci) {
        const from = uci.substring(0, 2);
        const to = uci.substring(2, 4);
        this.board.movePiece(to, from);
      }
    };

    this.ws.onerror = e => {
      // an error occurred
      console.log(e.message);
    };

    this.ws.onclose = e => {
      console.log(e.code, e.reason);
    };

    this.ws.onopen = () => {
      console.log('ws open');
      // ping every second
      this.intervalId = setInterval(
        () => {
          this.sendMessage({ t: 'p', v: 2 });
        },
        1000,
      );
    };
  };

  sendMessage(obj) {
    const str = JSON.stringify(obj);
    console.log(`sending: ${str}`);
    this.ws.send(str);
  }

  onMove = ({ from, to }) => {
    const { game } = this.state;
    game.move({
      from,
      to,
    });

    if (game.turn() === 'b') {
      this.sendMessage({
        t: 'move',
        d: {
          from,
          to,
        },
      });
    }
  };

  shouldSelectPiece = piece => {
    const { game } = this.state;
    const turn = game.turn();
    if (
      game.in_checkmate() === true ||
      game.in_draw() === true ||
      turn !== 'w' ||
      piece.color !== 'w'
    ) {
      return false;
    }
    return true;
  };

  render() {
    const { fen } = this.state;

    return (
      <View style={styles.container}>
        <ChessBoard
          ref={board => this.board = board}
          fen={fen}
          size={340}
          shouldSelectPiece={this.shouldSelectPiece}
          onMove={this.onMove}
        />
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
