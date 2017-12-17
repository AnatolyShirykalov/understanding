import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import classes from './Inverse.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import Base, {mDTP, mSTP, withTIC} from './Base';
import C from '../../../../core/calculus';
import {INV, CLEAR_INV, trigConnections} from '../../../../core/calculus/examples';
import scrollToComponent from 'react-scroll-to-component';

const params = {
  kind: 'inverse',
  title: 'Производная обратной функции',
  levels: ['Тренироваться'],
  newTask: {method: 'setRandomExpression', args: i=>[]},
  toDoTex: ex => `y = f(x) = ${ex} \\qquad x = g(y)`,
  congCondition: { method: 'canShowCongs', args: []},
  extra: {
    condition: {method: 'needBeauty', args: []},
    render: {method: 'beauty', args: []},
  },
  steps: [
    {props: {title: 'Находим обратную', keys: ["x=g(y)"]}},
    {
      conditions: [{method: 'inversed', args: []}],
      props: {
        inputId: `x=g(y)`,
        keys: [`g'(y)`],
        methods: ['chain', 'table', 'add', 'prod', 'inverse'],
        key: 'g',
        title: 'Ищем производную',
      },
    },
    {
      conditions: [{method: 'diffed', args: ['g', 'dg']}],
      props: {title: 'Делим', keys: ["\\frac1{g'(y)}"]},
    },
    {
      conditions: [{method: 'fraced', args: []}],
      props: {title: 'Подставляем', keys: ["\\frac1{g'\\big(f(x)\\big))}"]},
    },
  ],
}

class Inverse extends Base {
  kind = () => 'inverse';
  params = ()=> params;
  //newTask = (i) => this.props.setRandomExpression(this.taskId());
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
    if(!this.diffed('expression', 'answer')) return false;
    const ex = this.withTaskId('expression');
    const an = this.withTaskId('answer');
    if (typeof(an)!=='string') return true;
    return (
      (INV.indexOf(ex) !== -1) && CLEAR_INV.filter(i=>an.match(i)).length > 0
    );
  }

  canShowCongs = () => this.diffed('expression', 'answer') && !this.needBeauty();

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
