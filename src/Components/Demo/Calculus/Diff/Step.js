import React from 'react';
import classes from './Example.css';
import MathPairs from './MathInput/MathPairs';
const step = props => (
  <div className={classes.Step}>
    <h4>{props.title}</h4>
    <MathPairs keys={props.keys} />
    {props.children}
  </div>
);

export default step;
