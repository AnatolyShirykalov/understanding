import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import classes from './Chain.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import Step from './Step';
import Base, {mDTP, mSTP, withTIC} from './Base';
import ToDo from './ToDo';
import GenTask from './GenTask';
import Congs from './Congs';


class Example extends Base {
  validDiffs = () => this.diffed('f', 'df') && this.diffed('g', 'dg');

  rightAnswer = () => this.diffed('expression', 'answer');

  kind = () => 'chain';


  componentDidUpdate() {
    if (this.rightAnswer()) this.baseGoToParent();
  }

  newTask = (i) => this.props.setRandomExpression(this.taskId(), i+2);

  render(){
    const methods = this.methods();
    const step1 = 'Первый шаг: делим функцию на композицию более простых';
    const step2 = 'Второй шаг: находим производную f(x)';
    const step3 = 'Второй шаг: находим производную g(y)';
    const step4 = 'Применяем формулу для производной произведения';
    return (
      <MathJax.Context>
        <div className={classes.Diff}>
          <h2>Дифференцирование сложной функции (Chain rule)</h2>
          <GenTask
            levels={['Тренироваться', 'Сложнее', 'Очень сложно']}
            parentId={this.withTaskId('parentId')}
            newTask={this.newTask}
            back={this.backRender()}
          />
          {
            this.validExpression() ?
              <div>
                <ToDo tex={'g\\big(f(x)\\big) = ' + this.exTex()} />
                <Step taskId={this.taskId()} keys={['f(x)', 'g(y)']} title={step1} />
                { this.decomposed('chain') ?
                    [  this.step('f(x)', ["f'(x)"], methods, 1, step2),
                      this.step('g(y)', ["g'(y)"], methods, 2, step3)]
                      : null }
                { this.validDiffs() ?
                    <Step taskId={this.taskId()} keys={["f'(x)g'(f(x))"]} title={step4}/> : null }
                    { this.rightAnswer() ? <Congs /> : null}
              </div>
            : null
          }
        </div>
      </MathJax.Context>
    )
  }
}

const mapStateToProps = ({calculus}) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    f: withTI('f(x)'),
    g: withTI('g(y)'),
    df: withTI("f'(x)"),
    dg: withTI("g'(y)"),
    answer: withTI("f'(x)g'(f(x))"),
  };
}

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, depth) => () => dispatch(actions.setRandomMathChainExpression(taskId, depth)),
  setExpression: (taskId, expression) => () => {
    dispatch(actions.changeMathExpression(taskId, expression))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Example);
