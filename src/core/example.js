import {Expression, Variable} from './set';
import * as ops from './operators';
export const example = new Expression(
  new Expression(
    new Expression(
      new Variable('A'),
      ops.CUP,
      new Variable('B')
    ),
    ops.CAP,
    new Variable('C')
  ),
  ops.EQ,
  new Expression(
    new Expression(
      new Variable('A'),
      ops.CAP,
      new Variable('C')
    ),
    ops.CUP,
    new Expression(
      new Variable('B'),
      ops.CAP,
      new Variable('C')
    )
  )
);
