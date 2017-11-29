import React from 'react';
import { connect } from 'react-redux';
import Task from '../../Components/Demo/Calculus/Diff/Example';

const diff = props => (
  <div>
    <Task expression={props.expression} />
  </div>
);

const mapStateToProps = state => ({
  expression: state.expression
});

export default connect(mapStateToProps)(diff);
