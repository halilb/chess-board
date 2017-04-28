import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Navigator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  PlayerVsRandom,
  PlayerVsLichessAI,
  PlayerVsPlayer,
  ChessTraining,
  RandomVsRandom,
} from './scenes';

const EXAMPLES = [
  {
    title: 'Player vs Random',
    component: PlayerVsRandom,
    description: 'Play vs Random computer moves',
  },
  {
    title: 'Player vs Lichess AI',
    component: PlayerVsLichessAI,
    description: 'Play vs Lichess StockFish AI',
  },
  {
    title: 'Player vs Lichess Player',
    component: PlayerVsPlayer,
    description: 'Play against Lichess friend',
  },
  {
    title: 'Chess Training',
    component: ChessTraining,
    description: 'Solve a Lichess puzzle',
  },
  {
    title: 'Random vs Random',
    component: RandomVsRandom,
    description: 'Who will win in this riveting game of Math.random() vs Math.random()?',
  },
];

export default class ExampleList extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      dataSource: dataSource.cloneWithRows(EXAMPLES),
    };
  }

  openExample(example) {
    this.refs.nav.push(example);
  }

  renderRow = (rowData, sectionID, rowID) => {
    const example = EXAMPLES[rowID];

    return (
      <TouchableOpacity onPress={() => this.openExample(example)}>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>{rowData.title}</Text>
          <Text style={styles.rowDescription}>{rowData.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderScene = route => {
    if (route.index === 0) {
      return (
        <View style={styles.container}>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
          />
        </View>
      );
    }

    return <route.component />;
  };

  render() {
    return (
      <Navigator
        ref="nav"
        initialRoute={{ index: 0 }}
        renderScene={this.renderScene}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingTop: 54,
    paddingLeft: 16,
  },
  row: {
    flex: 1,
    padding: 8,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
  rowTitle: {
    fontSize: 14,
  },
  rowDescription: {
    fontSize: 12,
  },
});
