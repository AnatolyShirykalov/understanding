import React from 'react';
import Step from './Step';
import Base, {baseMSTP, mDTP, withTIC} from '../Base';
import ToDo from '../ToDo';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {GenTask, Congs} from '../Calculus/Diff/Components';
import {toVector, toTeX} from '../../../core/bool/mjs';
import classes from '../Base.css';

class Equal extends Base {
  newTask = i => this.props.setFormula(this.taskId(), i+3);

  validFormula = () => {
    const f = this.withTaskId('formula');
    if (!Array.isArray(f) || f.length !== 2) return null;
    return f;
  }

  canShowCongs = () => {
    try{
      const answer = this.withTaskId('answer');
      if(!answer || answer.length < 2) return false;
      const formula = this.withTaskId('formula');
      return answer.filter((ans, key)=>{
        return ans.join() !== toVector(formula[key]).join()
      }).length === 0;
    } catch(er) {
      return false;
    }
  }

  mu = () => {
    if(this.canShowCongs()) this.baseGoToParent();
  }

  componentDidMount() {
    this.mu();
  }

  componentDidUpdate(){
    this.mu();
  }

  render(){
    return(
        <div className={classes.Base}>
          <h2>Сравнение</h2>
          <GenTask
            levels={['Тренироваться']}
            newTask={this.newTask}
            parentId={this.withTaskId('parentId')}
            back={this.backRender()}
          />
          {this.validFormula() ?
              <div>
                <ToDo tex={this.validFormula().map(toTeX).join('=')} header="Докажите"/>
                {this.validFormula().map((f, key)=>(
                  <Step
                    key={key}
                    title={`Считаем значение ${key+1}-го выражения`}
                    answer={this.withTaskId('answer')[key]}
                    formula={toTeX(f)}
                    onClick={this.props.childClick(
                      this.taskId(), key, f, this.props.history)}
                  />
                ))}
                {this.canShowCongs() ? <Congs /> : null}
              </div> : null}
        </div>
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
