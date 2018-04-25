import React from 'react';
import classes from './Step.css';
import LaTeX from '~/Components/UI/LaTeX';

const step = props => (
  <div className={classes.Step}>
    <h4>{props.title}</h4>
    <LaTeX>
      {props.formula}
    </LaTeX>
    <div>{props.answer ? props.answer.map((a,k)=><span key={k}>{a}</span>): null}</div>
    {props.done ? <i className={classes.Done}></i> : <button onClick={props.onClick}>Считать</button>}
  </div>
);

export default step;
