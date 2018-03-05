import React from 'react';
import classes from './index.css';

const matrixNew = props => (
  <div>
    <button onClick={props.gen} className={classes.NewBtn}>Сгенерировать другую</button>
  </div>
);

export default matrixNew;
