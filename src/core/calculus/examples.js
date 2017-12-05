import C from './index';
import nerdamer from 'nerdamer';
import 'nerdamer/all';

window.nerdamer = nerdamer;
const core = nerdamer.getCore();
core.Expression.prototype.funs = function(){
  return this.symbol.funs();
}

core.Symbol.prototype.funs = function() {
  let ret = [];
  if (this.fname) ret.push(this.fname);
  if (this.args) this.args.forEach(arg => ret = [...ret, ...arg.funs()]);
  if (this.group === core.groups.EX) {
    // степенная функция тоже функция
    ret.push('exp');
    // если основание a не натуральное, то это exp(x log(a))
    if(this.value !== 'e') ret.push('log');
    // её аргументы функции
    ret = [...ret, ...this.power.funs()];
  }
  if (this.symbols)
    Object.keys(this.symbols).forEach(
      sym => ret = [...ret, ...this.symbols[sym].funs()]
    );
  return ret;
}

const examples = [
  'log(tan(x))',
  'log(sin(x))',
  'sin(log(x))',
  'e^(e^x)',
  'log(log(x))',
  'tan(log(x))',
  'sin(cos(x))',
  'cos(2 * x)',
  'cos(x^2)'
];

export const sE = [
  'sin(x)',
  'cos(x)',
  'tan(x)',
  'cot(x)',
  'e^x',
  'log(x)',
  'x^2',
]

const SEP = [
  'sin(x)',
  'cos(x)',
  'tan(x)',
  'cot(x)',
  'e^x',
  'log(x)',
  'x^a',
];

export const CLEAR_INV = [
  'asin', 'acos', 'atan', 'log'
];

export const INV = CLEAR_INV.map(i=>i+'(x)');


export const table = SEP.map(fun=>({
  fun, diff: nerdamer.diff(fun, 'x').text()
}));

const generate = (depth, combiners=['chain'], useInverse=false, includeInverse=false) => {
  let list = [...sE];
  if(useInverse || includeInverse) list = [...list, ...INV];
  const l = list.length;
  const rand = (s = l) => Math.floor(Math.random() * s);
  const comb = () => combiners[rand(combiners.length)];
  if(useInverse && depth === 1) return INV[rand(INV.length)];
  let doneWithInverse = !useInverse;
  let ret = list[rand()];
  for (let k = 1; k < depth; k++ ) {
    if (!doneWithInverse && k + 1 === depth) {
      const toAdd = INV[rand(INV.length)];
      const combined = new C(toAdd, ret).combine(comb());
      return combined.text();
    }
    const toAdd = list[rand()];
    if (INV.indexOf(toAdd) !== -1) doneWithInverse = true;
    ret = new C(toAdd, ret).combine(comb()).text();
  }
  return ret;
};

export const chain  = (depth = 2) => generate(depth, ['chain']);
export const add    = (depth = 2) => generate(depth, ['add']);
export const prod   = (depth = 2) => generate(depth, ['prod']);
export const common = (depth = 2) => generate(depth, ['chain', 'add', 'prod'], false, true);
export const inverse = (depth = 1) => generate(depth, ['chain', 'add', 'prod'], true);

export const trigConnections = (f, g) => {
  const fs = [nerdamer(f), nerdamer(g)];
  const names = fs.map(fn=>fn.funs().filter(fun=>fun!=='exp'&&fun!=='log')[0]).sort();
  if (names.filter(e=>!!e).length < 2) return [];
  const all = {
    main: '\\mathrm{cos}^2(y)+\\mathrm{sin}^2(y) = 1',
    costan: '1 + \\mathrm{tan}(y)^2 = \\frac1{\\mathrm{cos}^2(y)}',
    seccos: '\\mathrm{cos}(y) = \\frac1{\\mathrm{sec}(y)}',
    cscsin: '\\mathrm{sin}(y) = \\frac1{\\mathrm{csc}(y)}',
  }
  switch(names.join('')) {
    case 'coscsc': return [all.main, all.cscsin];
    case 'cossin': return [all.main];
    case 'costan': return [all.costan];
    case 'sectan': return [all.costan, all.seccos];
    case 'secsin': return [all.main, all.seccos];
    default: return [];
  }
}




export default examples;
