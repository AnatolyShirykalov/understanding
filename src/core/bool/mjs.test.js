import {pairs, compare, toTeX, at, makeFormula, makeEquality} from './mjs';
it('should compare all pairs', () => {
  pairs.forEach(pair=>
    expect(compare(...pair)).toBe(true)
  )
});

it('should mark false equalities', () => {
  expect(compare('x', 'x and z')).toBe(false);
  expect(compare('x', 'x or z')).toBe(false);
});

it('should make tex string', ()=> {
  pairs.forEach(pair=>
    expect(typeof(toTeX(pair[0]))).toBe('string')
  );
});

it('should implement «́at»', () => {
  expect(at('x and y', {x: 1})).toBe('1 and y');
  expect(at('x and y', {x: 0})).toBe('0 and y');
  expect(at('x and y', {x: '(x and z)'})).toBe('(x and z) and y');
  expect(at('x or y', {y: 'x'})).toBe('x or x');
  expect(at('x or (not (y))', [0, 1])).toBe('0 or (not(1))');
});

it('should make Formula', ()=> {
  for(let depth = 1; depth<8; depth++ ){
    expect(toTeX(makeFormula(['x', 'y'], depth)).length>0).toBe(true);
  }
});

it('should make equality', ()=>{
  for(let i = 0; i < 2; i++) {
    expect(compare(...makeEquality(['x', 'y'], 4))).toBe(true);
  }
});

