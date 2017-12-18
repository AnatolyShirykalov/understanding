import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Base, {withTIC, baseMSTP, mDTP} from '../Base';
import {GenTask, Congs} from '../Calculus/Diff/Components';
import MathJax from '../../../vendor/react-mathjax/src';
import ToDo from '../ToDo';
import BoolInput from './Input';
import {evaluate, toTeX} from '../../../core/bool/mjs';
import classes from '../Base.css';

class Eval extends Base {
  newTask = i => this.props.setFormula(this.taskId(), i+3);

  validFormula = () => {
    const f = this.withTaskId('formula');
    if (typeof(f) !== 'string' || f.length === 0) return null;
    return f;
  }

  amIRight = () => {
    try {
      const v = evaluate(this.validFormula());
      const ans = this.withTaskId('answer');
      return ans === v;
    } catch (er) {
      return false;
    }
  }

  inputValue = () => {
    const v = this.withTaskId('answer');
    if (typeof(v) !== 'number') return '';
    return v;
  }

  componentDidUpdate() {
    if(this.amIRight()) {
      this.baseGoToParent();
    }
  }


  render (){
    return (
      <MathJax.Context>
        <div className={classes.Base}>
          <GenTask
            levels={['Тренироваться']}
            newTask={this.newTask}
            parentId={this.withTaskId('parentId')}
            back={this.backRender()}
          />
          {this.validFormula() ?
            <div>
              <ToDo tex={toTeX(this.validFormula())} header="Формула"/>
              { this.amIRight() ? <Congs /> : null}
              <BoolInput
                onChange={this.props.updateAnswer(this.taskId())}
                value={this.inputValue()}
              />
              { this.amIRight() ? <Congs /> : null}
            </div>
          : null}
        </div>
      </MathJax.Context>
    );
  }
}

const mapStateToProps = ({bool}) => {
  const withTI = withTIC(bool);
  return {
    ...baseMSTP(bool),
    formula: withTI('formula'),
    answer: withTI('answer'),
  }
};

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setFormula: (taskId, depth) => () =>
    dispatch(actions.setRandomBoolTableFormula(taskId, depth, ['0', '1'])),
  updateAnswer: taskId => ({target: {value}}) =>{
    if(value !== '1' && value !== '0' && value.length !== 0) return;
    dispatch(actions.updateBoolEvalAnswer(taskId, value))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Eval);
