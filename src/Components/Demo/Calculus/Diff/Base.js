import React from 'react';
import nerdamer from 'nerdamer';
import * as actions from '../../../../store/actions';
import 'nerdamer/all';
import classes from './Base.css';
import Step from './Step';
import C from '../../../../core/calculus';
import DemoBase, {withTIC} from '../../Base';

class Base extends DemoBase {
  methods = () => ['chain', 'table', 'add', 'prod', 'inverse'];


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

  back = () => this.props.history.push(`/math/tasks/${this.withTaskId('parentKind')}/${this.withTaskId('parentId')}`);

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

  backRender = () => (
    <div className={classes.Back}>
      <p>Как только это подзадание будет сделано, вас вернут к основному заданию</p>
      <button onClick={this.back}>
        Вернуться сейчас</button>
    </div>
  );

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
  }
}

export const mSTP = calculus => {
  const withTI = withTIC(calculus);
  return {
    expression: withTI('expression'),
    parentId: withTI('parentId'),
    parentInputId: withTI('parentInputId'),
    parentKind: withTI('parentKind'),
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
