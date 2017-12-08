import {makeFormula, Formula, operators} from '.';

it('should make Formula', () => {
  const f = makeFormula(['x', 'y', 'z'], 3);
  expect(f).toBeInstanceOf(Formula);
  expect(f.toTeX()).toMatch(/\b[xyz]\b/);
});

it('should transform to function', () => {
  const [l, r] = ['x', 'y'];
  expect(new Formula({l,r,op: operators.OR}).toVector().join('')).toBe('0111');
  expect(new Formula({l,r,op: operators.AND}).toVector().join('')).toBe('0001');
});
