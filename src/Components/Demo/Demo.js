import React from 'react';
import classes from './Demo.css';
import MathJax from '../../vendor/react-mathjax/src';

const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;

const demo = props => (
  <div className={classes.Demo}>
    <h2>Демо</h2>
    <MathJax.Context>
      <div>
          This is an inline math formula: <MathJax.Node inline>{'a = b'}</MathJax.Node>

          And a block one:

          <MathJax.Node>{tex}</MathJax.Node>
      </div>
    </MathJax.Context>
  </div>
)

export default demo;
