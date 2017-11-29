import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import classes from './Example.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import MathPairs from './MathInput/MathPairs.js'
import nerdamer from 'nerdamer';
import 'nerdamer/all';
import C from '../../../../core/calculus';
import examples from '../../../../core/calculus/examples';


class Example extends Component {
  validFunc = (prop, v) => {
    try {
      const ex = nerdamer(this.props[prop]);
      const ok = ex.variables().length === 1 && ex.variables()[0] === v;
      if (!ok) return {ok, er:'you can only use ' + v + ' as a variable'};
    } catch (er) {
      return {ok: false, er: er.message};
    }
    return {ok: true}
  }

  canShowDiffForm = () => {
    try {
      const len = this.errorsFunc().length
      const combined = new C(this.props.f, this.props.g).combine().text();
      const equivalent = new C(combined, this.props.expression).compare()
      return (len === 0 && equivalent);
    } catch (e) {
      return false;
    }
  }

  validDiff = prop => {
    try {
      if (
        typeof(this.props[prop]) !== 'string' ||
        this.props[prop].length === 0
      ) return false;
      nerdamer(this.props[prop]); // to throw an exception if need
      const dfReal = nerdamer.diff(this.props[prop]).text();
      const dfUser = this.props['d'+prop];
      nerdamer(dfUser); // to throw an exception if need
      return new C(dfReal, dfUser).compare();
    } catch (er) {
      return false;
    }
  }

  validDiffs = () => {
    return ['f', 'g'].filter(p=>this.validDiff(p)).length === 2;
  }

  errorsFunc = () => {
    return [this.validFunc('f', 'x').er, this.validFunc('g', 'y').er].filter(a=>a);
  }

  expression = () => {
    return nerdamer(this.props.expression);
  }

  exTex = () =>{
    try {
      return this.expression().toTeX()
    } catch (er) {
      return ''
    }
  }

  rightAnswer = () => {
    try {
      const ans = this.props.answer;
      const real= nerdamer.diff(this.props.expression).text()
      return new C(ans, real).compare();
    } catch (er) {
      return false;
    }
  }

  validExpression = () => {
    try {
      if(typeof(this.props.expression) !== 'string' || this.props.expression.length === 0) return false;
      nerdamer(this.props.expression)
      return true;
    } catch(er) {
      return false;
    }
  }

  render(){
    return (
      <MathJax.Context>
        <div className={classes.Diff}>
          <h2>Дифференцирование сложной функции (либо пиши, либо жми)</h2>
          <div>
            <h3>Примеры (жми)</h3>
            {examples.map((example, i)=>(
              <div
                className={classes.Example}
                key={i}
                onClick={this.props.setExpression(example)}
              >
                <MathJax.Node inline>{nerdamer(example).toTeX()}</MathJax.Node>
              </div>
            ))}
          </div>
          <div>
            <h3>Задать свою функцию (пиши)</h3>
            <MathPairs keys={["expression"]} />
          </div>
          {
            this.validExpression() ?
              <div>
                <h3>Решение</h3>
                <div className={classes.Step}>
                  <h4>Вот выражение, от которого надо взять производную</h4>
                  <MathJax.Node>
                    {'g\\big(f(x)\\big) = ' + this.exTex()}
                  </MathJax.Node>
                </div>
                <div className={classes.Step}>
                  <h4>Первый шаг: делим функцию на композицию более простых</h4>
                  <MathPairs keys={['f(x)', 'g(y)']}/>
                  {this.props.showHint ?
                      [...this.errorsFunc().map((er, i)=>(
                        <div key={i}>{er}</div>
                      ))]
                      :
                      null
                  }
                </div>
                {
                  this.canShowDiffForm() ?
                    <div className={classes.Step}>
                      <h4>Второй шаг: находим производные более простых функций</h4>
                      <MathPairs keys={["f'(x)", "g'(y)"]} />
                    </div>
                    : null
                }
                {
                  this.validDiffs() ?
                    <div className={classes.Step}>
                      <h4>Применяем формулу для производной произведения</h4>
                      <MathPairs keys={["f'(x)*g'(f(x))"]} />
                    </div>
                    : null
                }
                {
                  this.rightAnswer() ?
                    <div className={classes.Congs}>
                      <div>Ура!!! Всё верно</div></div> : null
                }
                {
                  !this.validDiffs() || !this.canShowDiffForm() || !this.rightAnswer()?
                    <div>Подумай ещё</div> : null
                }
                <button onClick={this.props.toggleHint}>
                  {this.props.showHint ? 'Скрыть подсказку' : 'Открыть подсказку'}
                </button>
              </div>
            : null
          }
        </div>
      </MathJax.Context>
    )
  }
}

const mapStateToProps = state => ({
  f: state['f(x)'],
  g: state['g(y)'],
  df: state["f'(x)"],
  dg: state["g'(y)"],
  answer: state["f'(x)*g'(f(x))"],
  showHint: state.showHint,
  expression: state.expression
});

const mapDispatchToProps = dispatch => ({
  toggleHint: () => dispatch(actions.calculusDiffToggleHint()),
  setExpression: expression => () => {
    dispatch(actions.changeMathExpression(expression))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Example);
