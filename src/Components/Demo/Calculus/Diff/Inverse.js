import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import classes from './Inverse.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import Step from './Step';
import Base, {mDTP, mSTP, withTIC} from './Base';
import ToDo from './ToDo';
import GenTask from './GenTask';
import Congs from './Congs';
import C from '../../../../core/calculus';
import {INV, CLEAR_INV, trigConnections} from '../../../../core/calculus/examples';
import scrollToComponent from 'react-scroll-to-component';

class Inverse extends Base {
  kind = () => 'inverse';
  newTask = (i) => this.props.setRandomExpression(this.taskId());
  inversed = () => {
    try {
      return new C(
        new C(this.withTaskId('expression'), this.withTaskId('g')).combine('chain'),
        'x').compare();
    } catch (er) {
      return false;
    }
  }
  fraced = () => {
    try {
      return this.diffed('g', 'dg') && new C(
        `1/(${this.withTaskId('invDg')})`, this.withTaskId('dg')
      ).compare();
    } catch (er) {
      return false;
    }
  }

  needBeauty = () => {
    const ex = this.withTaskId('expression');
    const an = this.withTaskId('answer');
    if (typeof(an)!=='string') return true;
    return (
      (INV.indexOf(ex) !== -1) && CLEAR_INV.filter(i=>an.match(i)).length > 0
    );
  }

  beauty = () => {
    const g = this.withTaskId('g');
    const f = this.withTaskId('invDg');
    const con = trigConnections(f,g);
    let inner = "Что-то можно сократить";
    if (con.length > 0) inner = [
      <span key={0}>Верно! Но упростите выражение в последней ячейке. Можно использовать для первой и третьей ячейки следующие формулы</span>,
      con.map(c=><MathJax.Node key={c}>{c}</MathJax.Node>)
    ];
    return <div className={classes.Hint} ref={e=>this.Hint=e}>{inner}</div>;
  }
  componentDidUpdate() {
    if (this.diffed('expression', 'answer')) this.baseGoToParent();
    if (this.needBeauty) scrollToComponent(this.Hint, {offset: 100});
  }
  render () {
    const methods = this.methods();
    return (
      <MathJax.Context>
        <div className={classes.Inverse}>
          <h2>Правило Лейбница</h2>
          <GenTask
            levels={['Тренироваться']}
            parentId={this.withTaskId('parentId')}
            newTask={this.newTask}
            back={this.backRender()}
          />
          {this.validExpression() ? <div>
              <ToDo tex={'y = f(x) = ' + this.exTex() + '\\qquad x = g(y)' } />
              <Step taskId={this.taskId()} keys={['x=g(y)']} title="Находим обратную" />
              {this.inversed() ?
                this.step(`x=g(y)`, [`g'(y)`], methods, 1, 'Ищем производную')
               : null}
              {this.diffed('g', 'dg') ?
                  <Step taskId={this.taskId()} keys={["\\frac1{g'(y)}"]} title="Делим" />
                  : null }
              {this.fraced() ?
                  <Step taskId={this.taskId()} keys={["\\frac1{g'\\big(f(x)\\big))}"]} title="Подставляем" />
                  : null}
                  {this.diffed('expression', 'answer') ?
                      ( this.needBeauty() ? this.beauty() : <Congs />)
                   : null}
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
    g: withTI('x=g(y)'),
    dg: withTI("g'(y)"),
    invDg: withTI("\\frac1{g'(y)}"),
    answer: withTI("\\frac1{g'\\big(f(x)\\big))}"),
  };
}

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, depth) => () => dispatch(actions.setRandomMathInverseExpression(taskId, depth)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Inverse);
