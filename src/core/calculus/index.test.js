import nerdamer from 'nerdamer';
import 'nerdamer/all';
import C from './index';

it('should combine g(f(x))', () => {
  const c = new C('log(x)', 'sin(z)');
  expect(c.combine().text()).toBe('sin(log(x))');
})

it('should compare f(x) and g(x)', ()=>{
  expect(new C('sin(x)', 'cos(x)').compare()).toBe(false);
  expect(new C('sin(x)', 'sin(x+2 * pi)').compare()).toBe(true);
  expect(new C('log(x)', 'tan(x)').compare()).toBe(false);
  expect(new C('log(x^2)', '2*log(x)').compare()).toBe(true);
  expect(new C('csc(x)', '1/cos(x)').compare()).toBe(true);
  expect(new C('diff(cot(e^x))', '-e^x*csc(e^x)^2').compare()).toBe(true);
})

it('sandbox', ()=>{
  //console.log(nerdamer.diff('cot(e^x)').text());
  //console.log(nerdamer.diff('cos(cot(cot(log(x))))').text())
  console.log(nerdamer.diff('cot(x)').sub('x', 'x').text());
})
