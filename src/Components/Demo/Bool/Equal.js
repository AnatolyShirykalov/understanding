import React from 'react';
import Step from './Step';
import Base, {baseMSTP, mDTP, withTIC} from '../Base';
import ToDo from '../ToDo';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import MathJax from '../../../vendor/react-mathjax/src';
import {GenTask, Congs} from '../Calculus/Diff/Components';

class Equal extends Base {
  newTask = i => this.props.setFormula(this.taskId(), i+3);

  validFormula = () => {
    try {
      const f = this.withTaskId('formula');
      if (f.length === 2) return f;
    } catch(er) {
      return null;
    }
  }

  canShowCongs = () => {
    const answer = this.withTaskId('answer');
    if(!answer || answer.length < 2) return false;
    const formula = this.withTaskId('formula');
    return answer.filter((ans, key)=>{
      return ans.join() !== formula[key].toVector().join()
    }).length === 0;
  }

  render(){
    return(
      <MathJax.Context>
        <div>
          <h2>Сравнение</h2>
          <GenTask
            levels={['Тренироваться']}
            newTask={this.newTask}
            parentId={this.withTaskId('parentId')}
            back={this.backRender()}
          />
          {this.validFormula() ?
              <div>
                <ToDo tex={this.validFormula().map(f=>f.toTeX()).join('=')} header="Докажите"/>
                {this.validFormula().map((f, key)=>(
                  <Step
                    key={key}
                    title={`Считаем значение ${key+1}-го выражения`}
                    answer={this.withTaskId('answer')[key]}
                    formula={f.toTeX()}
                    onClick={this.props.childClick(
                      this.taskId(), key, f, this.props.history)}
                  />
                ))}
                {this.canShowCongs() ? <Congs /> : null}
              </div> : null}
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
  };
};
const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setFormula: (taskId, depth) => () =>
    dispatch(actions.setRandomBoolEqualFormula(taskId, depth)),
  childClick: (taskId, key, formula, history) => () =>
    dispatch(actions.setBoolChildTaskAndRedirect(taskId, key, 'boolequal', formula, history, 'booltable')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Equal);
