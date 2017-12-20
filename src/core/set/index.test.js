import {schemas, makeEx, toTeX, definition} from './';



it('should understard schema', () => {
  schemas.forEach(schema => console.log(toTeX(schema)));
});

it('should understand definitions', () => {
  schemas.slice(0,2).forEach(schema=>{
    const ex = ['x', 'IN', schema];
    console.log(toTeX(definition(ex)));
  });
});

it('sandbox', ()=> {
  const ex = makeEx(schemas[0]);
  console.log(ex.content);
});
