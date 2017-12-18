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

it('should eval', () => {
  Array(100).fill(0).forEach(()=>{
    expect(makeFormula(['x', '1'], 3).eval).toThrow();
    const f = makeFormula(['0','1'], 3);
    expect(typeof(eval(f.eval()))).toBe('boolean');
  });
});

it('should set nums via «at» method', () => {
  expect(typeof(makeFormula(['x', 'y'], 2).at([1,0]).toTeX())).toBe('string');
});
