import C from './index';
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

const sE = [
  'sin(x)',
  'cos(x)',
  'tan(x)',
  'cot(x)',
  'e^x',
  'log(x)',
  'x^2',
]

export const generate = (depth = 2) => {
  const l = sE.length;
  const rand = () => Math.floor(Math.random() * l);
  let ret = sE[rand()];
  for (let k = 1; k < depth; k++ )
    ret = new C(sE[rand()], ret).combine().text();
  return ret;
};

export default examples;
