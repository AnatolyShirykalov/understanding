import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import classes from './Example.css';
import MathJax from '../../../../vendor/react-mathjax/src';
import MathPairs from './MathInput/MathPairs.js'
import nerdamer from 'nerdamer';
import 'nerdamer/all';
import C from '../../../../core/calculus';


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

  render(){
    return (
      <MathJax.Context>
        <div className={classes.Diff}>
          <h2>Дифференцирование сложной функции</h2>
          <div>
            <MathJax.Node>
              {'g\\big(f(x)\\big) = ' + this.exTex()}
            </MathJax.Node>
          </div>
          <MathPairs keys={['f(x)', 'g(y)']}/>
          {this.props.showHint ?
              this.errorsFunc().map((er, i)=>(
                <div key={i}>{er}</div>
              ))
              :
              null
          }
          {
            this.canShowDiffForm() ?
              <MathPairs keys={["f'(x)", "g'(y)"]} />
              : <div>Подумай ещё</div>
          }
          <button onClick={this.props.toggleHint}>
            {this.props.showHint ? 'Скрыть подсказку' : 'Открыть подсказку'}
          </button>
        </div>
      </MathJax.Context>
    )
  }
}

const mapStateToProps = state => ({
  f: state['f(x)'],
  g: state['g(y)'],
  showHint: state.showHint,
});

const mapDispatchToProps = dispatch => ({
  toggleHint: () => dispatch(actions.calculusDiffToggleHint())
})

export default connect(mapStateToProps, mapDispatchToProps)(Example);
