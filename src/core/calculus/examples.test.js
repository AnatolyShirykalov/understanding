import examples from './examples';
import nerdamer from 'nerdamer';
import 'nerdamer/all';

it ('should differentiate all examples', () => {
  for(let example in examples) {
    expect(!nerdamer.diff(example).text()).toBe(false);
  }
})
