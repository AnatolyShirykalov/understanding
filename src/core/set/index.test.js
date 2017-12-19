import {schemas, makeEx, toTeX} from './';



it('should understard schema', () => {
  schemas.forEach(schema => console.log(toTeX(makeEx(schema))));
});

it('sandbox', ()=> {
  const ex = makeEx(schemas[0]);
  console.log(ex.content);
});
