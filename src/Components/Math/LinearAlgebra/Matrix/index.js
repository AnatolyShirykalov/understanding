import React from 'react';
import classes from './index.css';
import MathJax from '~/vendor/react-mathjax/src';

const Matrix = ({matrix}) => (
  <MathJax.Context>
    <div className={classes.Matrix}>
      <MathJax.Node>
      {`\\begin{pmatrix}
        ${matrix.map(line=>line.join('&')).join('\\\\')}
        \\end{pmatrix}`}
      </MathJax.Node>:
    </div>
  </MathJax.Context>
);

export default Matrix;
