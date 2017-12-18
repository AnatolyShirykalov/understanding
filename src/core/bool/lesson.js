import {Parser} from 'expr-eval';
import {operators} from '.';
export const pairs = [
  ['not (x or y)', 'not x and not y'],
  ['x and (y and z)', '(x and y) and z'],
  ['x and y', 'y and x'],
  ['x and x', 'x'],
  ['not (x and y)', 'not x or not y'],
  ['x and (y or z)', '(x and y) or (x and z)'],
  ['x or y', 'y or x'],
  ['x or (y and z)', '(x or y) and (x or z)'],
  ['x and not x', '0'],
  ['0 or x', 'x']
];

const opts = {
  parser: ex => Parser.parse(ex),
  variables: ex => ex.variables(),
  evaluate: (ex, arg) => ex.evaluate(arg),
};

export const toVector = (ex, vars, ops=opts) => {
  const expr = ops.parser(ex); //Parser.parse(ex);
  const realVs = ops.variables(expr); //expr.variables();
  const vs = vars || realVs;
  const vc = vs.length;
  const ret = [];
  Array(2**vc).fill(0).forEach((a, key)=>{
    const arg = {};
    vs.forEach((v, i)=>{
      if(realVs.includes(v))
        arg[v] = makeArg(vc, key, i);
    });
    //ret.push(expr.evaluate(arg) ? 1 : 0);
    ret.push(ops.evaluate(expr, arg) ? 1 : 0);
  });
  return ret;
};

export const makeArg = (vc, key, i) => {
  const kts = key.toString(2);
  return key < 2**(vc-i-1) ? 0 : parseInt(kts[kts.length - vc + i], 2);
};

export const compare = (ex1, ex2, ops = opts) => {
  const vs = [...new Set([ex1, ex2].reduce((ret, ex)=>
    [...ret, ...ops.variables(ops.parser(ex))]
  , []))];
  const vecs = [ex1, ex2].map(ex=>toVector(ex, vs, ops).join());
  return vecs[0]===vecs[1];
};

export const toTeX = ex =>
  ex.replace(/or/g, operators.OR)
    .replace(/and/g, operators.AND)
    .replace(/not/g, operators.NEG);

export const evaluate = ex =>
  Parser.parse(ex).evaluate();

export const at = (ex, arg) => {
  const ret = Parser.parse(ex).simplify(arg).toString();
  return ret;
  //if( ret[0] !== '(' || ret[ret.length - 1] !== ')') return ret;
  //return ret.slice(1, ret.length - 1);
};



