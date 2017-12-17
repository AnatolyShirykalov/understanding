import { connect } from 'react-redux';
import * as actions from '../../../../store/actions';
import Base, {mDTP, mSTP, withTIC} from './Base';
const params = {
  kind: 'add',
  title: 'Дифференцирование сложной функции',
  levels: ['Тренироваться', 'Сложнее', 'Очень сложно', 'Особые случаи'],
  newTask: (th, i) => {
    if (i===3) return th.props.setExpression(th.taskId(), 'x^x');
    return th.props.setRandomExpression(th.taskId(), i+2);
  },
  toDoTex: ex => `g\\big(f(x)\\big) = ${ex}`,
  congCondition: { method: 'diffed', args: ['expression', 'answer']},
  steps: [
    {props: {title: 'Делим функцию на композицию более простых', keys: ['f(x)', 'g(y)']}},
    ...[{f:'f', v:'x'},{f:'g',v: 'y'}].map(f=>({
      conditions: [{method: 'decomposed', args: ['chain']}],
      props: {
        inputId: `${f.f}(${f.v})`,
        keys: [`${f.f}'(${f.v})`],
        methods: ['chain', 'table', 'add', 'prod', 'inverse'],
        key: f.f,
        title: 'Ищем производную',
        noAutoFocus: f.f === 'g',
      },
    })),
    {
      conditions: ['f','g'].map(f=>({method: 'diffed', args: [f, 'd'+f]})),
      props: {title: 'Подставляем и перемножаем', keys: ["f'(x)g'(f(x))"]},
    },
  ],
}

class Chain extends Base {
  params = ()=> params;

  kind = () => 'chain';
  componentDidUpdate() {
    if (this.diffed('expression', 'answer')) this.baseGoToParent();
  }
}

const mapStateToProps = ({calculus}) => {
  const withTI = withTIC(calculus);
  return {
    ...mSTP(calculus),
    f: withTI('f(x)'),
    g: withTI('g(y)'),
    df: withTI("f'(x)"),
    dg: withTI("g'(y)"),
    answer: withTI("f'(x)g'(f(x))"),
  };
}

const mapDispatchToProps = dispatch => ({
  ...mDTP(dispatch),
  setRandomExpression: (taskId, depth) => () => dispatch(actions.setRandomMathChainExpression(taskId, depth)),
  setExpression: (taskId, expression) => () => {
    dispatch(actions.changeMathExpression(taskId, expression))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Chain);
