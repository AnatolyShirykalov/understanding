import React from 'react';
import {connect} from 'react-redux';
import MathJax from '../../../../vendor/react-mathjax/src';
import Base, {mSTP, mDTP, withTIC} from './Base';
import GenTask from './GenTask';
import ToDo from './ToDo';
import Step from './Step';
import Congs from './Congs';
import * as actions from '../../../../store/actions';
import classes from './Add.css';

class Add extends Base {
  kind = () => 'add';

  newTask = i => this.props.setRandomExpression(this.taskId(), i+2);

  componentDidUpdate() {
    if(this.diffed('expression', 'answer'))
      this.baseGoToParent();
  }

  render() {
    const methods = this.methods();
    return (
      <MathJax.Context>
        <div className={classes.Add}>
          <h2>Аддитивность производной</h2>
          <GenTask
            levels={['Тренироваться']}
            parentId={this.withTaskId('parentId')}
            newTask={this.newTask}
            back={this.backRender()}
          />
          { this.validExpression() ? <div>
            <ToDo tex={`f(x) + g(x) = ${this.exTex()}`} />
            <Step taskId={this.taskId()} keys={['f(x)', 'g(x)']} title="Делим на слагаемые" />
            {this.decomposed('add') ? ['f','g'].map(f=>(
                this.step(`${f}(x)`, [`${f}'(x)`], methods, f, 'Ищем производную')
            )): null}
            {this.diffed('f', 'df') && this.diffed('g', 'dg') ?
                <Step taskId={this.taskId()} keys={["f'(x)+g'(x)"]} title="Складываем" /> : null}
            {this.diffed('expression', 'answer') ? <Congs /> : null}
          </div> : null}
        </div>
      </MathJax.Context>
    );
  }
}

const mapStateToProps = ({calculus}) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    f: withTI('f(x)'),
    g: withTI('g(x)'),
    df: withTI('f\'(x)'),
    dg: withTI('g\'(x)'),
    answer: withTI("f'(x)+g'(x)"),
  }
}

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, expression) => () => {
    dispatch(actions.setRandomMathAddExpression(taskId, expression));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
