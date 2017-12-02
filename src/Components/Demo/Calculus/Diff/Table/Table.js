import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../../../store/actions';
import nerdamer from 'nerdamer';
import 'nerdamer/all';
import MathJax from '../../../../../vendor/react-mathjax/src';
import {table} from '../../../../../core/calculus/examples';
import C from '../../../../../core/calculus';
import MathPairs from '../MathInput/MathPairs';
import Base, {mDTP, mSTP, withTIC} from '../Base';

class Table extends Base {
  isDegree = () => {
    return this.withTaskId('parentId') && this.withTaskId('fun')==='x^a';
  }

  rightAnswer = () => {
    const ex = nerdamer(this.withTaskId('expression'));
    return new C(this.answer(), ex.text()).compare();
  }

  answer() {
    let ans = '';
    if (this.isDegree()) {
      const a = +this.withTaskId('a');
      ans = nerdamer(this.withTaskId('fun'), {a});
    }
    else ans = nerdamer(this.withTaskId('fun'));
    return ans.text();
  }

  componentDidUpdate() {
    const a = this.withTaskId('a');
    const parentId = this.withTaskId('parentId');
    const parentInputId = this.withTaskId('parentInputId');
    const expression = this.withTaskId('expression');
    if (this.validExpression() && parentId && (
      !this.isDegree() || (!isNaN(+a) && (+a)+'' === a)
    ) && this.rightAnswer() ) this.props.goToParent(
      parentId,
      parentInputId,
      this.setProperVariable(expression, nerdamer.diff(this.answer()).text()),
      this.props.history,
      this.withTaskId('parentKind')
    )
  }

  render () {
    return (
      <MathJax.Context>
        <div>
          <h3>Таблица производных</h3>
          {this.validExpression() ? <div>
            <h4>Вот выражение, от которого надо взять производную</h4>
            <MathJax.Node>{nerdamer(this.withTaskId('expression'), {y: 'x'}).toTeX()}</MathJax.Node>
          </div> : <div>Здесь могло бы быть ваше выражение</div>}
          {this.withTaskId('parentId') ? this.backRender() : null}
          <div>
            <h4>Вот таблица производных</h4>
            {table.map(({fun, diff})=>(
              <div
                key={fun}
                onClick={this.props.selectTableItem(this.taskId(), fun)}>
                <MathJax.Node>
                    {nerdamer(fun).toTeX() + '=' + nerdamer(diff).toTeX()}
                </MathJax.Node>
              </div>
          ))}</div>
          {this.isDegree() ?
              <div>
                <h4>Укажите нужный параметр <MathJax.Node inline>a</MathJax.Node></h4>
                <MathPairs keys={['a']} taskId={this.taskId()}></MathPairs>
              </div>
            : null}
        </div>
      </MathJax.Context>
    );
  }
}

const mapStateToProps = ({calculus}) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    fun: withTI('fun'),
    a: withTI('a'),
  };
};

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  selectTableItem: (taskId, fun) => () =>
    dispatch(actions.selectDiffTableItem(taskId, fun)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
