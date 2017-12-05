import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions';
import {withRouter} from 'react-router-dom';
import classes from './NewTask.css';

const labels = {
  chain: 'Сложная функция',
  table: 'Таблица',
  add: 'Аддитивность',
  prod: 'Лейбниц',
};

class NewTask extends Component {
  render() {
    const expression = this.props.expression(
      this.props.taskId, this.props.inputId);
    return (
      <button
        className={classes.Button}
        onClick={
          this.props.click(
            this.props.taskId,
            this.props.parentInputId,
            this.props.parentInputKind,
            expression,
            this.props.history,
            this.props.kind
          )
        }
      >{labels[this.props.kind]}</button>
    );
  }
}

NewTask.propTypes = {
  taskId: PropTypes.string.isRequired,
  inputId: PropTypes.string.isRequired,
  parentInputId: PropTypes.string.isRequired,
  parentInputKind: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
}

const mapStateToProps = ({calculus}) => {
  return {
    expression: (taskId, inputId) => calculus[taskId][inputId]
  };
}

const mapDispatchToProps = dispatch => ({
  click: (taskId, inputId, parentKind, expression, history, kind) => () => dispatch(
    actions.createChildMathTaskAndRedirect(taskId, inputId, parentKind, expression, history, kind)
  )
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewTask)
);
