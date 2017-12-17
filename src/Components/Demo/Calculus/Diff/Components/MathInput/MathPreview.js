import React from 'react';
import {connect} from 'react-redux';
import MathJax from '../../../../../../vendor/react-mathjax/src';
import nerdamer from 'nerdamer';

const mathPreview = props => {
  const ex = props.expression(props.taskId, props.inputId);
  return(
    <div className={props.className}>
      {ex.er ? <div>{ex.er}</div> :
      <MathJax.Node inline>{ex.e}</MathJax.Node>}
    </div>
  );
};

const mapStateToProps = ({calculus}) => ({
  expression: (taskId, inputId) => {
    if (!calculus.hasOwnProperty(taskId)) return {e: '', er: 'No Input'};
    if (!calculus[taskId].hasOwnProperty(inputId)) return {e: '', er: 'No Input'};
    try {
      const e = nerdamer(calculus[taskId][inputId]);
      return {e: e.toTeX()};
    } catch (er) {
      return {e: '', er: er.message};
    }
  }
});

export default connect(mapStateToProps)(mathPreview);
