import React from 'react';
import Matrix from '../Matrix';
import classes from './index.css';

const matrixPair = props => (
  <div className={classes.MatrixPair}>
    <span className={classes.Matrix}>
      <Matrix matrix={props.matrices[0]} />
    </span>
    <span className={classes.Mapsto}>
      {"\u27fc"}
    </span>
    <span className={classes.Matrix}>
      <Matrix matrix={props.matrices[1]} />
    </span>
  </div>
);

export default matrixPair;
