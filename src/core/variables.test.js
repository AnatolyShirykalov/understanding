import {sets, elements} from './variables';

it('sets should be only capital letters', ()=>{
  sets.forEach(v=> expect(v.match(/[A-Z]/)).not.toBeFalsy());
  elements.forEach(v=> expect(v.match(/[a-z]/)).not.toBeFalsy());
})
