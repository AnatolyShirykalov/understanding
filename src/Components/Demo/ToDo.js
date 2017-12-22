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
    {Array.isArray(props.tex) ? <div>{props.tex.map((tex, key)=>(
      <span className={classes.TeX} key={key}>
        <MathJax.Node inline>
          {tex}
        </MathJax.Node>
      </span>
      )) }</div>:
    <MathJax.Node>
      {props.tex}
    </MathJax.Node>}
  </div>
);

export default toDo;
