import React from 'react';
import MathJax from '../../vendor/react-mathjax/src';
import classes from './ToDo.css';

const toDo = props => (
  <div className={classes.ToDo}>
    <h4>{props.header}</h4>
    <MathJax.Node>
      {props.tex}
    </MathJax.Node>
  </div>
);

export default toDo;
