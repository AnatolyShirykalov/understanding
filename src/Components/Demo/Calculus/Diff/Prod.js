import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import classes from './Prod.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import Step from './Step';
import Base, {mDTP, mSTP, withTIC} from './Base';
import ToDo from './ToDo';
import GenTask from './GenTask';
import Congs from './Congs';

class Prod extends Base {
  kind = () => 'prod';
  newTask = (i) => this.props.setRandomExpression(this.taskId(), i+2);
  componentDidUpdate() {
    if (this.diffed('expression', 'answer')) this.baseGoToParent();
  }
  render () {
    const methods = this.methods();
    return (
      <MathJax.Context>
        <div className={classes.Prod}>
          <h2>Правило Лейбница</h2>
          <GenTask
            levels={['Тренироваться']}
            parentId={this.withTaskId('parentId')}
            newTask={this.newTask}
            back={this.backRender()}
          />
          {this.validExpression() ? <div>
              <ToDo tex={'f(x)g(x) = ' + this.exTex() } />
              <Step taskId={this.taskId()} keys={['f(x)', 'g(x)']} title="Разделяй и властвуй" />
              {this.decomposed('prod') ? ['f','g'].map(f=>(
                this.step(`${f}(x)`, [`${f}'(x)`], methods, f, 'Ищем производную', f==='g')
              )) : null}
              {this.diffed('f', 'df') && this.diffed('g', 'dg') ?
                  <Step taskId={this.taskId()} keys={["f'(x)g(x)+f(x)g'(x)"]} title="Перемножаем" />
                  : null }
              {this.diffed('expression', 'answer') ? <Congs /> : null}
            </div> : null
          }
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
    df: withTI("f'(x)"),
    dg: withTI("g'(x)"),
    answer: withTI("f'(x)g(x)+f(x)g'(x)"),
  };
}

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, depth) => () => dispatch(actions.setRandomMathProdExpression(taskId, depth)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Prod);
