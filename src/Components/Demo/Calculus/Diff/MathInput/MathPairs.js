import React from 'react';
import MathInput from './MathInput';
import MathPreview from './MathPreview';

const mathPairs = props => props.keys.map(key => (
  <div key={key}>
    <MathInput label={key} inputId={key}/>
    <MathPreview inputId={key}/>
  </div>
));

export default mathPairs;
