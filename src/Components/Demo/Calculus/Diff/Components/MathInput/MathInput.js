import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions';
import {DebounceInput} from 'react-debounce-input';
import MathJax from '../../../../../../vendor/react-mathjax/src';

const mathInput = props => (
  <div className={props.className}>
    <label>
      <MathJax.Node inline>
        {props.label + '='}
      </MathJax.Node>
    </label>
    <DebounceInput
      debounceTimeout={500}
      autoFocus={props.autoFocus}
      className={props.inputClassName}
      onChange={props.change(props.taskId, props.inputId)}
      type="text"
      value={props.value(props.taskId, props.inputId)||''}
    />
  </div>
)

const mapDispatchToProps = dispatch => ({
  change: (taskId, inputId) => event => {
    dispatch(actions.changeMathInput(taskId, inputId, event.target.value))
  }
});

const mapStateToProps = ({calculus}) => ({
  value: (taskId, inputId) => calculus[taskId][inputId]
})

export const MathInput = connect(mapStateToProps, mapDispatchToProps)(mathInput);
export default MathInput;
