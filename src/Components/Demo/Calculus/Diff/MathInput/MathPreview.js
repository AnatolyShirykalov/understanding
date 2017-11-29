import React from 'react';
import {connect} from 'react-redux';
import MathJax from '../../../../../vendor/react-mathjax/src';
import nerdamer from 'nerdamer';

const mathPreview = props => {
  const ex = props.expression(props.inputId);
  return(
    <div className={props.className}>
      {ex.er ? <div>{ex.er}</div> :
      <MathJax.Node inline>{ex.e}</MathJax.Node>}
    </div>
  );
};

const mapStateToProps = state => ({
  expression: inputId => {
    if (!state.hasOwnProperty(inputId)) return {e: '', er: 'No Input'};
    try {
      const e = nerdamer(state[inputId]);
      return {e: e.toTeX()};
    } catch (er) {
      return {e: '', er: er.message};
    }
  }
});

export default connect(mapStateToProps)(mathPreview);
