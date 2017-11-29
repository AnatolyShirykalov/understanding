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
})
