import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import classes from './Example.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import nerdamer from 'nerdamer';
import 'nerdamer/all';
import C from '../../../../core/calculus';
import examples from '../../../../core/calculus/examples';
import Step from './Step';


class Example extends Component {
  withTaskId = prop => this.props[prop](this.taskId());

  taskId = () => this.props.taskId ||
    (this.props.match && this.props.match.params.taskId);

  validFunc = (prop, v) => {
    try {
      const ex = nerdamer(this.withTaskId(prop));
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
      const combined = new C(
        this.withTaskId('f'),
        this.withTaskId('g')
      ).combine().text();
      const equivalent = new C(combined, this.withTaskId('expression')).compare()
      return (len === 0 && equivalent);
    } catch (e) {
      return false;
    }
  }

  validDiff = prop => {
    try {
      if (
        typeof(this.withTaskId(prop)) !== 'string' ||
        this.withTaskId(prop).length === 0
      ) return false;
      nerdamer(this.withTaskId(prop)); // to throw an exception if need
      const dfReal = nerdamer.diff(this.withTaskId(prop)).text();
      const dfUser = this.withTaskId('d'+prop);
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
    return nerdamer(this.withTaskId('expression'));
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
      const ans = this.withTaskId('answer');
      const real= nerdamer.diff(this.withTaskId('expression')).text()
      return new C(ans, real).compare();
    } catch (er) {
      return false;
    }
  }

  validExpression = () => {
    try {
      if(typeof(this.withTaskId('expression')) !== 'string' ||
        this.withTaskId('expression').length === 0) return false;
      nerdamer(this.withTaskId('expression'))
      return true;
    } catch(er) {
      return false;
    }
  }

  render(){
    const step1 = 'Первый шаг: делим функцию на композицию более простых';
    const step2 = 'Второй шаг: находим производную f(x)';
    const step3 = 'Второй шаг: находим производную g(y)';
    const step4 = 'Применяем формулу для производной произведения';
    return (
      <MathJax.Context>
        <div className={classes.Diff}>
          <h2>Дифференцирование сложной функции (Chain rule)</h2>
          <div>
            <h3>Примеры (жми)</h3>
            {examples.slice(0, 3).map((example, i)=>(
              <div
                className={classes.Example}
                key={i}
                onClick={this.props.setExpression(this.taskId(), example)}
              >
                <MathJax.Node inline>{nerdamer(example).toTeX()}</MathJax.Node>
              </div>
            ))}
            <div
              className={classes.Example}
              onClick={this.props.setRandomExpression(this.taskId())}
            >Ещё</div>
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
                <Step taskId={this.taskId()} keys={['f(x)', 'g(y)']} title={step1} />
                { this.canShowDiffForm() ?
                    [<Step taskId={this.taskId()} inputId={'f(x)'} key="1" methods={[1]} keys={["f'(x)"]} title={step2} />,
                      <Step taskId={this.taskId()} inputId={'g(x)'} key="2" methods={[2]} keys={["g'(y)"]} title={step3} />]
                      : null }
                { this.validDiffs() ?
                    <Step taskId={this.taskId()} keys={["f'(x)*g'(f(x))"]} title={step4}/> : null }
                { this.rightAnswer() ?
                    <div className={classes.Congs}> Ура! Всё верно</div> : null }
                { !this.validDiffs() || !this.canShowDiffForm() || !this.rightAnswer() ?
                    <div>Подумай ещё</div> : null }
              </div>
            : null
          }
        </div>
      </MathJax.Context>
    )
  }
}

const mapStateToProps = ({calculus}) => {
  const withTI = prop => taskId => calculus[taskId] && calculus[taskId][prop];
  return {
    f: withTI('f(x)'),
    g: withTI('g(y)'),
    df: withTI("f'(x)"),
    dg: withTI("g'(y)"),
    answer: withTI("f'(x)*g'(f(x))"),
    expression: withTI('expression'),
    parent: withTI('parent')
  };
}

const mapDispatchToProps = dispatch => ({
  setRandomExpression: taskId => () => dispatch(actions.setRandomMathExpression(taskId)),
  setExpression: (taskId, expression) => () => {
    dispatch(actions.changeMathExpression(taskId, expression))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Example);
