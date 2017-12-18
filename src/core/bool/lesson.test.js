import {pairs, compare, at, makeFormula} from './lesson';
import {Parser} from 'expr-eval';
it('should have correct tasks', ()=>{
  for (let i in pairs){
    const [l,r] = pairs[i];
    expect(compare(l, r));
  }
});

it('should not mark unequival as equival', ()=>{
  expect(compare('x', 'x and z')).toBe(false);
  expect(compare('x', 'x or z')).toBe(false);
});

it('should at', () => {
  expect(at('x and y', {x: 1})).toBe('(1 and y)');
  expect(at('x and y', {x: 0})).toBe('(0 and y)');
  expect(at('x and y', {x: Parser.parse('x and z')})).toBe('((x and z) and y)');
  expect(at('x or y', {y: Parser.parse('x')})).toBe('(x or x)');
});

