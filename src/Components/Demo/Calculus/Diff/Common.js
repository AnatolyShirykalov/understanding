import React from 'react';
import {connect} from 'react-redux';
import Base, {mDTP, mSTP, withTIC} from './Base';
import ToDo from './ToDo';
import GenTask from './GenTask';
import Congs from './Congs';
import classes from './Common.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import * as actions from '../../../../store/actions';

class Common extends Base {
  newTask = (i) => this.props.setRandomExpression(this.taskId(), i+4);

  kind = () => 'common';

  render() {
    return (
      <MathJax.Context>
        <div className={classes.Common}>
          <h2>Задачник по дифференцированию</h2>
          <GenTask
            levels={['Тренироваться', 'Сложнее', 'Очень сложно']}
            parentId={this.withTaskId('parentId')}
            newTask={this.newTask}
            back={this.backRender()}
          />
          {
            this.validExpression() ?
              <div>
                <ToDo tex={'f(x) = ' + this.exTex()}/>
                {this.step('expression', ["f'(x)"], this.methods(), 1, 'Берём производную')}
              </div>
              : null
          }
          { this.diffed('expression', 'answer') ? <Congs /> : null}
        </div>
      </MathJax.Context>
    );
  }
}

const mapStateToProps = ({calculus}) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    answer: withTI("f'(x)"),
  };
};

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, expression) => () => {
    dispatch(actions.setRandomMathCommonExpression(taskId, expression));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Common);
