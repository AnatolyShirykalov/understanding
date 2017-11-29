import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';
//import MathJax from '../../../../../vendor/react-mathjax/src';

const mathInput = props => (
  <div className={props.className}>
    <label>
      {props.label + '='}
    </label>
    <input
      autoFocus={props.autoFocus}
      className={props.inputClassName}
      onChange={props.change(props.inputId)}
      type="text"
      value={props.value(props.inputId)||''}
    />
  </div>
)

const mapDispatchToProps = dispatch => ({
  change: inputId => event => {
    dispatch(actions.changeMathInput(inputId, event.target.value))
  }
});

const mapStateToProps = state => ({
  value: inputId => state[inputId]
})

export default connect(mapStateToProps, mapDispatchToProps)(mathInput);
