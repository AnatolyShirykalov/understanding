import React from 'react';
import {ToDo, GenTask, Congs, Step} from './Components';
import classes from './Base.css';
import nerdamer from 'nerdamer';
import * as actions from '../../../../store/actions';
import 'nerdamer/all';
import C from '../../../../core/calculus';
import DemoBase, {withTIC, baseMSTP} from '../../Base';

class Base extends DemoBase {
  methods = () => ['chain', 'table', 'add', 'prod', 'inverse'];

  newTask = (arg) => {
    if(typeof(arg) === 'function')
      return i => arg(this, i);
    const {method, args} = arg;
    try{
      const tid = this.taskId();
      return i => this.props[method](tid, ...args(i));
    } catch(er) {
      console.error(method, args);
      throw er;
    }
  }

  decomposed = combiner => {
    try {
      const combined = new C(
        this.withTaskId('f'),
        this.withTaskId('g')
      ).combine(combiner).text();
      const valid = new C(combined, this.withTaskId('expression')).compare()
      return valid;
    } catch (e) {
      return false;
    }
  }

  diffed = (inputId, ansInputId) => {
    try {
      const expected = nerdamer.diff(this.withTaskId(inputId)).text();
      const obtained = this.withTaskId(ansInputId);
      if (typeof(obtained) !== 'string' || obtained.length === 0) return false;
      return new C(expected, obtained).compare();
    } catch (er) {
      return false;
    }
  }

  setProperVariable = (expr, ans) => {
    const ex = nerdamer(ans);
    const to = nerdamer(expr).variables()[0];
    const from = ex.variables()[0];
    return ex.sub(from, to).text();
  }

  done = ({method, args}) => this[method](...args);

  newStep = ({inputId, keys, methods, key, title, noAutoFocus}) =>
    this.step(inputId, keys, methods, key, title, noAutoFocus);

  step = (inputId, keys, methods, key, title, noAutoFocus) => (
    <Step
      taskId={this.taskId()}
      inputId={inputId}
      key={key}
      methods={methods}
      keys={keys}
      kind={this.kind()}
      title={title}
      noAutoFocus={noAutoFocus}
    />
  );


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

  expression = () => {
    return nerdamer(this.withTaskId('expression'), {y: 'x'});
  }

  exTex = () =>{
    try {
      return this.expression().toTeX()
    } catch (er) {
      return ''
    }
  }

  baseGoToParent = (answer=this.withTaskId("answer")) => {
    const parentId = this.withTaskId('parentId');
    const parentInputId = this.withTaskId('parentInputId');
    const expression = this.withTaskId('expression');
    if (!parentId || !this.validExpression()) return;
    this.props.goToParent(
      parentId,
      parentInputId,
      this.setProperVariable(expression, answer),
      this.props.history,
      this.withTaskId('parentKind')
    );
  };

  render() {
    const params = this.params();
    return (
        <div className={classes.Diff}>
          <h2>{params.title}</h2>
          <GenTask
            levels={params.levels}
            parentId={this.withTaskId('parentId')}
            newTask={this.newTask(params.newTask)}
            back={this.backRender()}
          />
          { this.validExpression() ? <div>
            <ToDo tex={params.toDoTex(this.exTex())} />
            {
              params.steps.map((step, k)=>{
                if(step.conditions) {
                  const good = step.conditions.reduce((res, cond)=>{
                    return res && this.done(cond);
                  }, true);
                  if(!good) return null;
                }
                if (step.props.methods) return this.newStep(step.props);
                return (<Step key={k} taskId={this.taskId()} {...step.props} />);
              })
            }
            {this.done(params.congCondition) ? <Congs /> : null}
            {params.extra && this.done(params.extra.condition) ?
                this.done(params.extra.render)
                : null}
          </div> : null}
        </div>
    );
  }
}

export const mSTP = calculus => {
  const withTI = withTIC(calculus);
  return {
    expression: withTI('expression'),
    ...baseMSTP(calculus),
    parentInputId: withTI('parentInputId'),
  };
}

export const mDTP = dispatch => ({
  goToParent: (parentId, parentInputId, expression, history, kind) =>
    dispatch(actions.setMathExpressionToParentTaskAndRedirect(
      parentId, parentInputId, expression, history, kind
    ))
});

export {withTIC};

export default Base;
