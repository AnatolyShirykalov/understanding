import React, {Component} from 'react';
import nerdamer from 'nerdamer';
import * as actions from '../../../../store/actions';
import 'nerdamer/all';

class Base extends Component {
  withTaskId = prop => this.props[prop](this.taskId());

  taskId = () => this.props.taskId ||
    (this.props.match && this.props.match.params.taskId);

  setProperVariable = (expr, ans) => {
    const ex = nerdamer(ans);
    const to = nerdamer(expr).variables()[0];
    const from = ex.variables()[0];
    return ex.sub(from, to).text();
  }

  back = () => {
    this.props.history.goBack();
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

  backRender = () => (
    <div>
      <p>Как только это подзадание будет сделано, вас вернут к основному заданию</p>
      <button onClick={this.back}>
        Вернуться сейчас</button>
    </div>
  );
}

export const withTIC = calculus => prop => taskId =>
  calculus[taskId] && calculus[taskId][prop];

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


export default Base;
