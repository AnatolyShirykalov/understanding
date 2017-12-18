import React from 'react';
import MathJax from '../../../vendor/react-mathjax/src';
import classes from './Step.css';

const step = props => (
  <div className={classes.Step}>
    <h4>{props.title}</h4>
    <MathJax.Node>
      {props.formula}
    </MathJax.Node>
    <div>{props.answer ? props.answer.map((a,k)=><span key={k}>{a}</span>): null}</div>
    {props.done ? <span>Сделано</span> : <button onClick={props.onClick}>Считать</button>}
  </div>
);

export default step;
