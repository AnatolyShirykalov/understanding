import math from 'mathjs';
import {pairs, toVector as toV, compare as cmp} from './lesson';

export const opts = {
  parser: ex => math.parse(ex),
  variables: ex => [...new Set(
    ex.filter(node=>node.isSymbolNode).map(n=>n.name))].sort(),
  evaluate: (ex, scope) => ex.eval(scope) ? 1 : 0,
};

const simpleAt = (ex, arg) => {
  return math.parse(ex).transform(node=>{
    if (node.isSymbolNode && arg.hasOwnProperty(node.name))
      return math.parse(arg[node.name]);
    return node;
  }).toString();
};


const rand = max=>Math.floor(Math.random()*max);
const sample = ar => ar[rand(ar.length)];
export {makeArg} from './lesson';

export const getVars = ex => opts.variables(opts.parser(ex));

export const toVector = (ex, vars) => toV(ex, vars, opts);

export const compare = (ex1, ex2) => cmp(ex1, ex2, opts);

export const toTeX = ex => math.parse(ex).toTex();

export const at = (ex, arg) => {
  if(Array.isArray(arg)) {
    const vs = opts.variables(opts.parser(ex));
    if (vs.length !== arg.length) throw new Error("wrong number of arguments");
    const a = {};
    vs.forEach((v,k)=>a[v]=arg[k]);
    return at(ex, a);
  }
  const f = {}, g = {};
  for(let key in arg) {
    f[key] = 'safekey'+key;
    g[f[key]] = arg[key];
  }
  return simpleAt(simpleAt(ex, f), g);
};

export const evaluate = ex => opts.evaluate(opts.parser(ex));

export const makeFormula = (vars, depth = 1) => {
  if (depth === 1) return sample(vars);
  const leftarg = makeFormula(vars, depth - 1);
  const rightarg = makeFormula(vars, depth - 1);
  const op = sample(['and', 'or', 'not']);
  if(op === 'not')
    return at('not (rightarg)', {rightarg});
  return at(`leftarg ${op} rightarg`, {leftarg, rightarg});
};


export const makeEquality = (vars, depth = 1) => {
  const l = makeFormula(vars, depth);
  let i = 0;
  while(i<200000) {
    const r = makeFormula(vars, depth);
    if(!compare(l,r) || toTeX(r) === toTeX(l)) {
      i++;
      continue;
    }
    return [l, r];
  }
  throw new Error('cannot create equality');
};
export {pairs};
