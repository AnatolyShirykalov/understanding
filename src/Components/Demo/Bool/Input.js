import React from 'react';

const boolInput = props => (
  <input
    type="number"
    min="0"
    max="1"
    onChange={props.onChange}
    value={props.value}
  />
);

export default boolInput;
