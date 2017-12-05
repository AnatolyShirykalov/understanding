import examples, {chain, inverse, common, INV} from './examples';
import nerdamer from 'nerdamer';
import 'nerdamer/all';

it ('should differentiate all examples', () => {
  for(let example in examples) {
    expect(!nerdamer.diff(examples[example]).text()).toBe(false);
  }
  for(let inv in INV) {
    expect(nerdamer(INV[inv])).not.toBe(null);
  }
})

it('should generate', () => {
  for (let i = 0; i< 2000; i++) {
    expect(chain() === 'undefined').toBe(false);
    expect(!nerdamer(chain()).text()).toBe(false);
  }
})

it('should generate with depth', () => {
  //console.log('depth4:', chain(4));
  expect(!!inverse(5)).not.toBe(false);
  //console.log(nerdamer(inverse(5)).text());
  //console.log(nerdamer(common(5)).text());
})
