import {ubd, match, at, expandedBools, schemas, makeEx, toArrays, toTeX, definition} from './';
import {toVector} from '../bool/lesson';
import {opts as ops} from '../bool/mjs';



it('should understard schema', () => {
  schemas.forEach(schema => console.log(toTeX(schema)));
});

it('should understand definitions', () => {
  schemas.slice(0,2).forEach(schema=>{
    const ex = ['x', 'IN', schema];
    console.log(toTeX(definition(ex)));
  });
});

it('should match', () => {
  const ex = [
    [
      ['a', 'IN', 'A'],
      'and',
      ['not', ['a', 'IN', 'B']]
    ],
    'and',
    [
      ['a', 'IN', 'A'],
      'and',
      ['not', ['a', 'IN', 'C']]
    ]
  ];
  expect(match(ex, ['x', 'and', 'y'])).toBeTruthy();
  expect(match(ex, [['x', 'and', ['not', 'y']], 'and', ['x', 'and', ['not', 'z']]])).toBeTruthy();
  expandedBools.forEach(pair=>{
    //console.log(pair);
    let [l, r] = pair;
    let m = match(ex, l);
    if(m) at(r, m);
  });
});

it('should make ex from node', ()=> {
  expandedBools.forEach(pairs=>{
    console.log(pairs);
    pairs.forEach(ex=>
     expect(typeof(toTeX(ex))).toBe('string')
    );
  });
});

it('should check udb', ()=>{
  const opts = {
    ...ops,
    parser: makeEx,
  }
  ubd.forEach(pair=>{
    //pair.map(i=>makeEx(i))
    expect(
      pair.map(e=>
        toVector(toArrays(makeEx(e), true), ['A', 'B', 'C'], opts).join()
      ).reduce((a,b)=>a===b)
    ).toBe(true)
  });
});

it('sandbox', ()=> {
  const ex = makeEx(schemas[0]);
  console.log(ex.content);
});
