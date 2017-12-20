import React from 'react';
import MathJax from '../../vendor/react-mathjax/src';
import classes from './ToDo.css';

const toDo = props => (
  <div className={classes.ToDo}>
    <h4>
      <span>{props.header}</span>
      {props.texPostfix ?
        <MathJax.Node inline>{props.texPostfix}</MathJax.Node>
          : null}
      {props.textPostfix ? <span>{props.textPostfix}</span>: null}
    </h4>
    <MathJax.Node>
      {props.tex}
    </MathJax.Node>
  </div>
);

export default toDo;
