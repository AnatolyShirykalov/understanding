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

export const generate = () => {
  const l = sE.length;
  const i = Math.floor(Math.random() * l);
  const j = Math.floor(Math.random() * l);
  return new C(sE[i], sE[j]).combine().text();
};

export default examples;
