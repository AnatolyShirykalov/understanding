import React, {Component} from 'react';
import ToDo from '../ToDo';
import Subexpr from './Subexpr';
import Congs from '../Calculus/Diff/Components/Congs/Congs';
//import MathJax from '../../../vendor/react-mathjax/src';
import {schemas, boolMethods, subst, toTeX, subExp, definition, transformSub} from '../../../core/set/';
import MathJax from '../../../vendor/react-mathjax/src';
import classes from './Equal.css';

class Equal extends Component {
  state = {
    exs: this.props.exs || schemas.slice(0,2),
    steps: [],
    current: [{}, {}],
  };

  withIN = ex => ['a', 'IN', ex];

  currentExs = () =>{
    const l = this.state.steps.length;
    if(l === 0) return this.state.exs.map(this.withIN);
    return this.state.steps[l-1].exs;
  };

  afterSub = i => moves => {
    const current = [...this.state.current];
    current[i] = {...current[i], moves}
    this.setState({current});
  }

  methods = i => {
    const ex = this.currentExs()[i];
    const moves = this.state.current[i].moves;
    const sub = subExp(ex, moves);
    if(sub[1] === 'IN'){
      const op = sub[2][1];
      if(!['cap', 'cup', 'sdd'].includes(op))
        return [];
      return [{
        name: `Определение оператора `,
        texPostfix: toTeX(['A', op, 'B']),
        ex: transformSub(ex, definition(sub), moves),
      }];
    }
    if(['and', 'or'].includes(sub[1]) || ['not'].includes(sub[0])) {
      const bms =  boolMethods(sub).map((method, i)=>({
        name: 'утверждение '+ i + ' ',
        texPostfix: toTeX(method.map(toTeX).join(' = ')),
        ex: transformSub(ex, subst(sub, ...method), moves),
      }));
      return bms;
    }
    return [];
  }

  implement = (i, method) => {
    const current = [{}, {}];
    const old = this.state.steps;
    const exs = this.currentExs();
    const last = exs[(i+1)%2];
    const steps = [
      ...old,
      {
        exs: i === 0 ? [method.ex, last] : [last, method.ex],
        method: method.name,
        texPostfix: method.texPostfix,
      }
    ];
    this.setState({current, steps});
  };

  cancel = i => {
    const old = this.state.current[(i+1)%2];
    this.setState({current: i===0 ? [{}, old] : [old, {}]});
  }

  popStep = () => this.setState({steps: this.state.steps.slice(0, this.state.steps.length -1)});

  canShowCongs = () => {
    const texs = this.currentExs().map(toTeX);
    return texs[0] === texs[1];
  }

  componentDidUpdate() {
    if (this.canShowCongs() && this.props.done) this.props.done();
  }

  render(){
    return (
      <MathJax.Context>
        <div className={classes.Equal}>
          {this.props.cancel ?
              <button onClick={this.props.cancel}>
                Закрыть</button>
              : null
          }
          <ToDo
            header="Докажите равенство"
            tex={this.state.exs.map(toTeX).join(' = ')}
          />
          <ToDo
            header="То есть одинаковость утверждений"
            tex={this.state.exs.map(this.withIN).map(toTeX)}
          />
          {this.state.steps.length > 0 ?
              <div>
                <h3>Уже преобразовано</h3>
                {this.state.steps.map((step, i)=>(
                  <div key={i}>
                    <ToDo
                      header={`Применив «${step.method}`}
                      texPostfix={step.texPostfix}
                      textPostfix='», имеем'
                      tex={step.exs.map(toTeX).join(' ,\\quad ')}
                    />
                    {this.state.steps.length === i + 1 ?
                        <button
                          onClick={this.popStep}
                        >Отмена</button>:
                        null}
                </div>
                ))}
              </div>
              : null}
          {this.currentExs().map((ex, i)=>(
            <div key={i} className={classes.Subexpr}>
              {this.state.current[i].moves ?
                <div>
                  <h4>{this.methods(i).length > 0 ? 'Ч' : 'Неч'}его применить</h4>
                  {this.methods(i).map(method=>(
                    <button
                      className={classes.MethodBtn}
                      key={method.name}
                      onClick={()=>this.implement(i, method)}
                    >
                      <span>{method.name}</span>
                      <MathJax.Node inline>{method.texPostfix}</MathJax.Node>
                    </button>
                  ))}
                  <button
                    className={classes.MethodBtn}
                    onClick={() => this.cancel(i)}
                  >Отменить</button>
                </div>
                  :
                <Subexpr title="Что преобразовывать?" ex={ex} done={this.afterSub(i)}/>
              }
            </div>
            ))}
            {this.canShowCongs() ? <Congs /> : null}
        </div>
      </MathJax.Context>
    );
  }
}

export default Equal;

