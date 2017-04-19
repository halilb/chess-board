import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BoardView from './BoardView';
import * as ChessActions from '../state/actions';

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ChessActions, dispatch),
  size: 340,
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardView);
