import React, {Component} from 'react';
import classes from './Base.css'
import * as actions from '../../store/actions';

class Base extends Component {
  withTaskId = prop => this.props[prop](this.taskId());

  taskId = () => this.props.taskId ||
    (this.props.match && this.props.match.params.taskId);

  back = () => this.props.history.push(`/math/tasks/${this.withTaskId('parentKind')}/${this.withTaskId('parentId')}`);

  baseGoToParent = (answer=this.withTaskId("answer")) => {
    const parentId = this.withTaskId('parentId');
    if(!parentId) return;
    const parentKey = this.withTaskId('parentInputId');
    //if (!parentId || !this.validExpression()) return;
    this.props.goToParent(
      parentId,
      parentKey,
      answer,
      this.props.history,
      this.withTaskId('parentKind')
    );
  }

  backRender = () => (
    <div className={classes.Back}>
      <p>Как только это подзадание будет сделано, вас вернут к основному заданию</p>
      <button onClick={this.back}>
        Вернуться сейчас</button>
    </div>
  );
}

export const withTIC = section => prop => taskId =>
  section[taskId] && section[taskId][prop];

export const baseMSTP = section => {
  const withTI = withTIC(section);
  return {
    parentId: withTI('parentId'),
    parentInputId: withTI('parentKey'),
    parentKind: withTI('parentKind'),
    answer: (taskId) => {
      const ret = [];
      Object.keys(section[taskId]).filter(
        key=>parseInt(key, 10)+'' === key
      ).forEach(key=>ret[key]=section[taskId][key])
      return ret;
    },
  };
}

export const mDTP = dispatch => ({
  goToParent: (parentId, parentKey, formula, history, kind) =>
    dispatch(actions.setBoolFormulaToParentTaskAndRedirect(
      parentId, parentKey, formula, history, kind
    )),
});


export default Base;
