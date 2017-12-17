import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import Base, {mDTP, mSTP, withTIC} from './Base';

const params = {
  kind: 'add',
  title: 'Правило Лейбница',
  levels: ['Тренироваться'],
  newTask: {method: 'setRandomExpression', args: i=>[i+2]},
  toDoTex: ex => `f(x)g(x) = ${ex}`,
  congCondition: { method: 'diffed', args: ['expression', 'answer']},
  steps: [
    {props: {title: 'Делим на сомножители', keys: ['f(x)', 'g(x)']}},
    ...['f','g'].map(f=>({
      conditions: [{method: 'decomposed', args: ['prod']}],
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
      props: {title: 'Перемножаем и складываем', keys: ["f'(x)g(x)+f(x)g'(x)"]},
    },
  ],
}

class Prod extends Base {
  kind = () => 'prod';
  params = () => params;
  componentDidUpdate() {
    if (this.diffed('expression', 'answer')) this.baseGoToParent();
  }
}

const mapStateToProps = ({calculus}) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    f: withTI('f(x)'),
    g: withTI('g(x)'),
    df: withTI("f'(x)"),
    dg: withTI("g'(x)"),
    answer: withTI("f'(x)g(x)+f(x)g'(x)"),
  };
}

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, depth) => () => dispatch(actions.setRandomMathProdExpression(taskId, depth)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Prod);
