import React from 'react';
import classes from './Demo.css';
import Task from './Calculus/Diff/Example';


const demo = props => (
  <div className={classes.Demo}>
    <Task expression={'log(tan(x))'}/>
  </div>
)

export default demo;
