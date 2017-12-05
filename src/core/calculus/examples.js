import C from './index';
import nerdamer from 'nerdamer';
import 'nerdamer/all';

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
]

export const table = SEP.map(fun=>({
  fun, diff: nerdamer.diff(fun, 'x').text()
}));

const generate = (depth, combiners=['chain']) => {
  const l = sE.length;
  const rand = (s = l) => Math.floor(Math.random() * s);
  const comb = () => combiners[rand(combiners.length)];
  let ret = sE[rand()];
  for (let k = 1; k < depth; k++ )
    ret = new C(sE[rand()], ret).combine(comb()).text();
  return ret;
};

export const chain  = (depth = 2) => generate(depth, ['chain']);
export const add    = (depth = 2) => generate(depth, ['add']);
export const prod   = (depth = 2) => generate(depth, ['prod']);
export const common = (depth = 2) => generate(depth, ['chain', 'add', 'prod']);

export default examples;
