import examples, {generate} from './examples';
import nerdamer from 'nerdamer';
import 'nerdamer/all';

it ('should differentiate all examples', () => {
  for(let example in examples) {
    expect(!nerdamer.diff(example).text()).toBe(false);
  }
})

it('should generate', () => {
  for (let i = 0; i< 2000; i++) {
    expect(generate() === 'undefined').toBe(false);
    expect(!nerdamer(generate()).text()).toBe(false);
  }
})

it('should generate with depth', () => {
  console.log('depth4:', generate(4));
})
