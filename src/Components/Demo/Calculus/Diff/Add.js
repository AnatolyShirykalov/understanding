import {connect} from 'react-redux';
import Base, {mSTP, mDTP, withTIC} from './Base';
import * as actions from '../../../../store/actions';



const params = {
  kind: 'add',
  title: 'Аддитивность производной',
  levels: ['Тренироваться'],
  newTask: {method: 'setRandomExpression', args: i=>[i+2]},
  toDoTex: ex => `f(x)+g(x) = ${ex}`,
  congCondition: { method: 'diffed', args: ['expression', 'answer']},
  steps: [
    {props: {title: 'Делим на слагаемые', keys: ['f(x)', 'g(x)']}},
    ...['f','g'].map(f=>({
      conditions: [{method: 'decomposed', args: ['add']}],
      props: {
        inputId: `${f}(x)`,
        keys: [`${f}'(x)`],
        methods: ['chain', 'table', 'add', 'prod', 'inverse'],
        key: f,
        title: 'Ищем производную',
        noAutoFocus: f === 'g',
      },
    })),
    {
      conditions: ['f','g'].map(f=>({method: 'diffed', args: [f, 'd'+f]})),
      props: {title: 'Складываем', keys: ["f'(x)+g'(x)"]},
    },
  ],
};

class Add extends Base {
  kind = () => params.kind;
  componentDidUpdate() {
    if(this.diffed('expression', 'answer'))
      this.baseGoToParent();
  }
  params = () => params;
}

const mapStateToProps = ({calculus}) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    f: withTI('f(x)'),
    g: withTI('g(x)'),
    df: withTI('f\'(x)'),
    dg: withTI('g\'(x)'),
    answer: withTI("f'(x)+g'(x)"),
  }
}

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, expression) => () => {
    dispatch(actions.setRandomMathAddExpression(taskId, expression));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
