import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';
import {withRouter} from 'react-router-dom';

const newChainRule = props => {
  const expression = props.expression(props.taskId, props.inputId)
  return (
  <button
    onClick={props.click(props.taskId, expression, props.history)}
  >Chain Rule</button>
  );
}

const mapStateToProps = ({calculus}) => {
  return {
    expression: (taskId, inputId) => calculus[taskId][inputId]
  };
}

const mapDispatchToProps = dispatch => ({
  click: (taskId, inputId, history) => () => dispatch(
    actions.createChildMathTaskAndRedirect(taskId, inputId, history)
  )
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(newChainRule)
);
