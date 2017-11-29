import React from 'react';
import Diff from './Diff';
const diffs = props => (
  <div>
    {props.expression ?
        <Diff /> :
        examples.map(expression=>(
        ))
    }
  </div>
);
