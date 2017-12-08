import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Base, {withTIC} from '../Base';
import GenTask from '../Calculus/Diff/GenTask';
import MathJax from '../../../vendor/react-mathjax/src';
import ToDo from '../ToDo';
import Congs from '../Calculus/Diff/Congs';

class Table extends Base {
  newTask = i => this.props.setFormula(this.taskId(), i+3);

  zeroOnes = varCount => Array(2**varCount).fill(0).map((a, key)=>(
    <tr key={key}>
      {Array(varCount).fill(0).map((v,i,vars)=>(
        <td key={i}>{
          key < 2**(vars.length - i -1) ? 0 :
            key.toString(2)[key.toString(2).length - vars.length + i]
        }</td>
      ))}
      <td>
        <input
          type="number"
          min="0"
          max="1"
          onChange={this.props.updateAnswer(this.taskId(), key)}
          value={this.withTaskId('answer')[key]}
        >
        </input>
      </td>
    </tr>));

  validFormula = () => {
    try {
      return this.withTaskId('formula');
    } catch(er) {
      return null;
    }
  }

  amIRight = () => {
    try {
      const v = this.validFormula().toVector();
      const ans = this.withTaskId('answer');
      for (let i = 0; i< v.length; i++) {
        if (v[i] !== ans[i]) return false;
      }
      return true;
    } catch (er) {
      return false;
    }
  }

  render (){
    return (
      <MathJax.Context>
        <div>
          <GenTask
            levels={['Тренироваться']}
            newTask={this.newTask}
          />
          {this.validFormula() ?
            <div>
              <ToDo tex={this.validFormula().toTeX()} header="Формула"/>
              <table>
                <thead><tr>
                    {this.validFormula().vars.map(v=><th key={v}>{v}</th>)}
                </tr></thead>
                <tbody>
                  {this.zeroOnes(this.validFormula().vars.length)}
                </tbody>
              </table>
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
    formula: withTI('formula'),
    answer: withTI('answer'),
  }
};

const mapDispatchToProps = dispatch => ({
  setFormula: (taskId, depth) => () =>
    dispatch(actions.setRandomBoolTableFormula(taskId, depth, ['x', 'y'])),
  updateAnswer: (taskId, index) => ({target: {value}}) =>
    value === '1' || value === '0' ? dispatch(actions.updateBoolTableAnswer(taskId, index, value)) : null,
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
