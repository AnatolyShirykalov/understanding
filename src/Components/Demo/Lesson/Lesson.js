import React from 'react';
import Base, {baseMSTP, mDTP, withTIC} from '../Base';
import * as actions from '../../../store/actions';
import {connect} from 'react-redux';
import {pairs, toTeX} from '../../../core/bool/mjs';
import MathJax from '../../../vendor/react-mathjax/src';
import Step from '../Bool/Step';
import classes from '../Base.css';

class Lesson extends Base {
  done = key => {
    try {
      const ans = this.withTaskId('answer');
      if (!ans || !ans.hasOwnProperty(key)) return false;
      return true;
    } catch (er) {
      return false;
    }
  }

  render(){
    return (
      <MathJax.Context>
        <div className={classes.Base}>
          {pairs.map((pair, key)=>(
            <Step
              key={key}
              title='Докажите, что'
              formula={pair.map(toTeX).join(' = ')}
              done={this.done(key)}
              onClick={this.props.childClick(
                this.taskId(), key, pair, this.props.history
              )}
            />
          ))}
        </div>
      </MathJax.Context>);
  }
}

const mapStateToProps = ({bool}) => {
  const withTI = withTIC(bool);
  return {
    ...baseMSTP(bool),
    formula: withTI('formula'),
  };
};
const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setFormula: (taskId, depth) => () =>
    dispatch(actions.setRandomBoolEqualFormula(taskId, depth)),
  childClick: (taskId, key, formula, history) => () =>
    dispatch(actions.setBoolChildTaskAndRedirect(taskId, key, 'lesson', formula, history, 'boolequal')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lesson);
