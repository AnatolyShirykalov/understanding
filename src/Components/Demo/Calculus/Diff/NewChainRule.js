import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';
import {withRouter} from 'react-router-dom';
import classes from './NewChainRule.css';

const newChainRule = props => {
  const expression = props.expression(props.taskId, props.inputId)
  return (
  <button
    className={classes.Button}
    onClick={
      props.click(
        props.taskId,
        props.parentInputId,
        expression,
        props.history
      )
    }
  >Chain Rule</button>
  );
}

const mapStateToProps = ({calculus}) => {
  return {
    expression: (taskId, inputId) => calculus[taskId][inputId]
  };
}

const mapDispatchToProps = dispatch => ({
  click: (taskId, inputId, expression, history) => () => dispatch(
    actions.createChildMathTaskAndRedirect(taskId, inputId, expression, history)
  )
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(newChainRule)
);
