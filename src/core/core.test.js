import {example} from './example';

it('showld correctly prepare text from exporession', ()=>{
  console.log(example.text());
  console.log(example.definition().text());
  console.log(example.definition().left.definition().text());
  console.log(example.left.definition().text());
  console.log(example.left.definition().definition().text());
  console.log(example.left.definition().definition().left.definition().text());
  console.log(example.leftPart('A', 'B'));
})

it('should show me available variables', ()=>{
  expect([...example.variables()].length).toBe(3);
  expect([...example.availableVariables()].length).toBe(23);
})

it('should transform expression', ()=>{
  expect(example.transform().text()).toBe(example.definition().text());
  const left = example.transform(['left']);
  const right = example.transform(['right']);
  expect(left.left.text()).toBe(example.left.definition().text());
  expect(left.right.text()).toBe(example.right.text());
  expect(right.right.text()).toBe(example.right.definition().text());
  expect(right.left.text()).toBe(example.left.text());
})
