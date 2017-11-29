import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../store/actions';

const mathInput = props => (
  <div>
    <label>{props.label}
    </label>
    <input onChange={props.change(props.inputId)}
      type="text"
    />
  </div>
)

const mapDispatchToProps = dispatch => ({
  change: inputId => event => {
    dispatch(actions.changeMathInput(inputId, event.target.value))
  }
});

export default connect(null, mapDispatchToProps)(mathInput);
