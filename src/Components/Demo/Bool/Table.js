import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Base, {withTIC, mDTP, baseMSTP} from '../Base';
import MathJax from '../../../vendor/react-mathjax/src';
import ToDo from '../ToDo';
import {Congs, GenTask} from '../Calculus/Diff/Components';
import BoolInput from './Input';
import {getVars, toVector, toTeX, at, makeArg} from '../../../core/bool/mjs';

class Table extends Base {
  newTask = i => this.props.setFormula(this.taskId(), i+3);

  inputValue = key => {
    const v = (this.withTaskId('answer') || [] )[key];
    if (typeof(v) !== 'number') return '';
    return v;
  }

  row = (varCount, key) => {
    return Array(varCount).fill(0).map((v, i)=>(
      //key < 2**(vars.length - i -1) ? 0 :
        //key.toString(2)[key.toString(2).length - vars.length + i]
      makeArg(varCount, key, i)
    ));
  }

  zeroOnes = varCount => Array(2**varCount).fill(0).map((a, key)=>(
    <tr key={key}>
      { this.row(varCount, key).map((v, i)=>(
        <td key={i}>{v}</td>
      ))}
      <td>
        <BoolInput
          onChange={this.props.updateAnswer(this.taskId(), key)}
          value={ this.inputValue(key)}
        />
      </td>
      <td>
        <button
          onClick={
            this.props.childClick(
              this.taskId(),
              key,
              at(this.withTaskId('formula'), this.row(varCount, key)),
              this.props.history
            )
          }
        >
          Отдельно
        </button>
      </td>
    </tr>));

  validFormula = () => {
    const f = this.withTaskId('formula');
    if (typeof(f) !== 'string' || f.length === 0) return null;
    return f;
  }

  amIRight = () => {
    try {
      const v = toVector(this.validFormula());
      const ans = this.withTaskId('answer');
      //console.log(v, ans);
      return v.join() === ans.join();
    } catch (er) {
      return false;
    }
  }

  componentDidMount() {
    if(this.amIRight())
      this.baseGoToParent();
  }

  componentDidUpdate() {
    console.log('update');
    if(this.amIRight()) {
      this.baseGoToParent();
      //console.log('I am right');
    }
  }


  render (){
    return (
      <MathJax.Context>
        <div>
          <GenTask
            levels={['Тренироваться']}
            newTask={this.newTask}
            parentId={this.withTaskId('parentId')}
            back={this.backRender()}
          />
          {this.validFormula() ?
            <div>
              <ToDo tex={toTeX(this.validFormula())} header="Формула"/>
              <table>
                <thead><tr>
                    {getVars(this.validFormula()).map(v=><th key={v}>{v}</th>)}
                </tr></thead>
                <tbody>
                  {this.zeroOnes(getVars(this.validFormula()).length)}
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
    ...baseMSTP(bool),
    formula: withTI('formula'),
  }
};

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  updateAnswer: (taskId, index) => ({target: {value}}) =>{
    if(value !== '1' && value !== '0' && value.length !== 0) return;
    dispatch(actions.updateBoolTableAnswer(taskId, index, value))
  },
  setFormula: (taskId, depth) => () =>
    dispatch(actions.setRandomBoolTableFormula(taskId, depth, ['x', 'y'])),
  childClick: (taskId, key, formula, history) => () =>
    dispatch(actions.setBoolChildTaskAndRedirect(taskId, key, 'booltable', formula, history, 'booleval')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
